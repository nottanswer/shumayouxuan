// server.js
const express = require('express');
const mysql = require('mysql2/promise');
const cors = require('cors');
const path = require('path');

const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const dbConfig = {
    host: 'localhost',
    user: 'root',
    password: '770211',
    database: 'shop1',
    connectionLimit: 10, //连接池大小
    waitForConnections: true,
    queueLimit: 0
};

// 使用连接池以提高性能和稳定性
const pool = mysql.createPool(dbConfig);

// 测试数据库连接
pool.getConnection()
    .then(conn => {
        console.log('成功连接到 MySQL 数据库 !');
        conn.release(); // 释放连接回池中
    })
    .catch(err => {
        console.error('连接 MySQL 数据库失败 (通过连接池):', err);
    });

app.use('/images', express.static(path.join(__dirname, 'public/images')));

// --- 辅助函数：提取品牌名 ---
function extractBrandName(productName) {
    if (!productName || typeof productName !== 'string') {
        return null;
    }

    const parts = productName.trim().split(' ');
    if (parts.length > 0) {
        // 检查是否是已知的品牌
        const knownMultiWordBrands = ['苹果', '三星', '华为', '小米', 'OPPO', '联想', '华硕', '戴尔', '索尼', 'Bose', '森海塞尔', '罗技', '雷蛇', '斐尔可（FILCO）', '阿米洛（Varmilo）', 'Keychron', '微软', '任天堂', '八位堂', '雷柏'];
        let potentialBrand = parts[0];
        if (parts.length > 1) {
            const twoWords = `${parts[0]} ${parts[1]}`;
            if (knownMultiWordBrands.some(b => productName.startsWith(b))) {
                const matchedBrand = knownMultiWordBrands.find(b => productName.startsWith(b));
                if (matchedBrand) return matchedBrand;
            }
        }
        // 简单的单次品牌提取
        if (knownMultiWordBrands.includes(potentialBrand)) {
            return potentialBrand;
        }
        // 如果parts[0]中包含中文括号，尝试提取括号前的内容
        if (potentialBrand.includes('（')) {
            return potentialBrand.substring(0, potentialBrand.indexOf('（'));
        }
        return potentialBrand;
    }
    return null;
}

// 检查视图是否存在并创建
async function ensureViewExists(connection) {
    try {
        // 检查视图是否存在
        const [viewExists] = await connection.query(
            `SELECT COUNT(*) AS exist
             FROM information_schema.tables 
             WHERE table_schema = '${dbConfig.database}' 
             AND table_name = 'v_shop_products_display'`
        );

        if (viewExists[0].exist === 0) {
            console.log('视图 v_shop_products_display 不存在，尝试创建...');
            await connection.query(`
                CREATE VIEW v_shop_products_display AS
                SELECT 
                    p.id,
                    p.name,
                    p.price,
                    p.stock,
                    p.image_url,
                    c.category_name AS category,
                    p.description AS note
                FROM products p
                JOIN categories c ON p.category_id = c.category_id
            `);
            console.log('视图创建成功');
        }
    } catch (error) {
        console.error('创建视图失败，将使用基础表查询:', error);
    }
}

// --- API 路由 ---

// GET /api/products - 获取所有产品 (使用视图)
app.get('/api/products', async (req, res) => {
    let connection;
    try {
        connection = await pool.getConnection();

        // 确保视图存在
        await ensureViewExists(connection);

        // 查询视图
        const [rows] = await connection.execute(
            'SELECT id, name, price, stock, image_url, category, note FROM v_shop_products_display ORDER BY id DESC'
        );

        res.json(rows);
    } catch (error) {
        console.error('获取产品列表失败:', error);
        res.status(500).json({ message: '服务器错误，获取产品列表失败' });
    } finally {
        if (connection) connection.release();
    }
});

// GET /api/products/:id - 获取单个产品 (使用视图)
app.get('/api/products/:id', async (req, res) => {
    const productId = req.params.id;
    let connection;
    try {
        connection = await pool.getConnection();

        // 确保视图存在
        await ensureViewExists(connection);

        const [rows] = await connection.execute(
            'SELECT id, name, price, stock, image_url, category, note FROM v_shop_products_display WHERE id = ?',
            [productId]
        );

        if (rows.length > 0) {
            res.json(rows[0]);
        } else {
            res.status(404).json({ message: '产品未找到' });
        }
    } catch (error) {
        console.error(`获取产品ID ${productId} 失败:`, error);
        res.status(500).json({ message: '服务器错误，获取产品详情失败' });
    } finally {
        if (connection) connection.release();
    }
});

// POST /api/products - 添加新产品
app.post('/api/products', async (req, res) => {
    // 前端应发送 category_name (字符串) 而不是 category_id
    const { name, price, stock, image_url, category, description } = req.body;

    if (!name || price === undefined || price === null || !category) {
        return res.status(400).json({ message: '产品名称、价格和分类是必填项' });
    }
    if (isNaN(parseFloat(price)) || !isFinite(price)) {
        return res.status(400).json({ message: '价格必须是有效的数字' });
    }
    const stockValue = stock === undefined || stock === null || isNaN(parseInt(stock)) ? 0 : parseInt(stock);

    const connection = await pool.getConnection();
    try {
        await connection.beginTransaction(); // 开始事务

        // 1. 处理品牌
        let brandId;
        const extractedBrandName = extractBrandName(name); // 从完整产品名中提取品牌
        if (!extractedBrandName) {
            await connection.rollback();
            return res.status(400).json({ message: '无法从产品名称中识别品牌' });
        }

        const [brandRows] = await connection.execute('SELECT brand_id FROM brands WHERE brand_name = ?', [extractedBrandName]);
        if (brandRows.length > 0) {
            brandId = brandRows[0].brand_id;
        } else {
            // 如果品牌不存在，创建新品牌
            const [newBrandResult] = await connection.execute('INSERT INTO brands (brand_name) VALUES (?)', [extractedBrandName]);
            brandId = newBrandResult.insertId;
            if (!brandId) throw new Error('创建新品牌失败');
        }

        // 2. 处理分类 (根据分类名称获取 category_id)
        let categoryId;
        const [categoryRows] = await connection.execute('SELECT category_id FROM categories WHERE category_name = ?', [category]);
        if (categoryRows.length > 0) {
            categoryId = categoryRows[0].category_id;
        } else {
            //理论上分类应该是固定的，如果查不到说明前端传了无效分类名
            await connection.rollback();
            return res.status(400).json({ message: `无效的分类名称: ${category}` });
        }

        // 3. 插入产品
        const productSql = 'INSERT INTO products (name, price, stock, image_url, category_id, brand_id, description) VALUES (?, ?, ?, ?, ?, ?, ?)';
        const [productResult] = await connection.execute(productSql, [
            name, // 完整的产品名称
            parseFloat(price),
            stockValue,
            image_url || null,
            categoryId, // 使用获取到的 category_id
            brandId,    // 使用获取到的 brand_id
            description || null
        ]);

        await connection.commit(); // 提交事务
        res.status(201).json({ message: '产品添加成功', productId: productResult.insertId });

    } catch (error) {
        if (connection) await connection.rollback(); // 回滚事务
        console.error('添加产品失败:', error);
        res.status(500).json({ message: '服务器错误，添加产品失败: ' + error.message });
    } finally {
        if (connection) connection.release();
    }
});

// PUT /api/products/:id - 更新产品
app.put('/api/products/:id', async (req, res) => {
    const productId = req.params.id;
    const { name, price, stock, image_url, category, description } = req.body; // category 是分类名称

    if (!name || price === undefined || price === null || !category) {
        return res.status(400).json({ message: '产品名称、价格和分类是必填项' });
    }
    if (isNaN(parseFloat(price)) || !isFinite(price)) {
        return res.status(400).json({ message: '价格必须是有效的数字' });
    }
    const stockValue = stock === undefined || stock === null || isNaN(parseInt(stock)) ? 0 : parseInt(stock);

    const connection = await pool.getConnection();
    try {
        await connection.beginTransaction();

        // 检查产品是否存在
        const [existingProduct] = await connection.execute('SELECT id FROM products WHERE id = ?', [productId]);
        if (existingProduct.length === 0) {
            await connection.rollback();
            return res.status(404).json({ message: '要更新的产品未找到' });
        }

        // 处理品牌 (同添加逻辑)
        let brandId;
        const extractedBrandName = extractBrandName(name);
        if (!extractedBrandName) {
            await connection.rollback();
            return res.status(400).json({ message: '无法从产品名称中识别品牌' });
        }
        const [brandRows] = await connection.execute('SELECT brand_id FROM brands WHERE brand_name = ?', [extractedBrandName]);
        if (brandRows.length > 0) {
            brandId = brandRows[0].brand_id;
        } else {
            const [newBrandResult] = await connection.execute('INSERT INTO brands (brand_name) VALUES (?)', [extractedBrandName]);
            brandId = newBrandResult.insertId;
            if (!brandId) throw new Error('创建/获取品牌失败');
        }

        // 处理分类 (同添加逻辑)
        let categoryId;
        const [categoryRows] = await connection.execute('SELECT category_id FROM categories WHERE category_name = ?', [category]);
        if (categoryRows.length > 0) {
            categoryId = categoryRows[0].category_id;
        } else {
            await connection.rollback();
            return res.status(400).json({ message: `无效的分类名称: ${category}` });
        }

        // 更新产品
        const sql = `UPDATE products SET 
                        name = ?, 
                        price = ?, 
                        stock = ?, 
                        image_url = ?, 
                        category_id = ?, 
                        brand_id = ?, 
                        description = ?, 
                        updated_at = CURRENT_TIMESTAMP 
                     WHERE id = ?`;
        await connection.execute(sql, [
            name,
            parseFloat(price),
            stockValue,
            image_url || null,
            categoryId,
            brandId,
            description || null,
            productId
        ]);

        await connection.commit();
        res.json({ message: '产品更新成功', productId: productId });

    } catch (error) {
        if (connection) await connection.rollback();
        console.error(`更新产品ID ${productId} 失败:`, error);
        res.status(500).json({ message: '服务器错误，更新产品失败: ' + error.message });
    } finally {
        if (connection) connection.release();
    }
});

// DELETE /api/products/:id - 删除产品
app.delete('/api/products/:id', async (req, res) => {
    const productId = req.params.id;
    const connection = await pool.getConnection();
    try {
        const [result] = await connection.execute('DELETE FROM products WHERE id = ?', [productId]);
        if (result.affectedRows > 0) {
            res.json({ message: '产品删除成功' });
        } else {
            res.status(404).json({ message: '产品未找到，或已被删除' });
        }
    } catch (error) {
        console.error(`删除产品ID ${productId} 失败:`, error);
        res.status(500).json({ message: '服务器错误，删除产品失败' });
    } finally {
        if (connection) connection.release();
    }
});

// POST /api/update-stock - 更新库存
app.post('/api/update-stock', async (req, res) => {
    const { pid, quantity } = req.body;

    // 验证参数
    if (!pid || quantity === undefined || quantity <= 0) {
        return res.status(400).json({
            success: false,
            message: '缺少必要参数或参数无效'
        });
    }

    let connection;
    try {
        connection = await pool.getConnection();
        await connection.beginTransaction();

        // 1. 获取当前库存（加锁防止并发问题）
        const [product] = await connection.query(
            'SELECT stock FROM products WHERE id = ? FOR UPDATE',
            [pid]
        );

        if (product.length === 0) {
            return res.status(404).json({
                success: false,
                message: '商品不存在'
            });
        }

        const currentStock = product[0].stock;

        // 2. 检查库存是否充足
        if (currentStock < quantity) {
            return res.status(400).json({
                success: false,
                message: `库存不足，剩余 ${currentStock} 件`
            });
        }

        // 3. 更新库存
        await connection.query(
            'UPDATE products SET stock = stock - ? WHERE id = ?',
            [quantity, pid]
        );

        // 4. 记录库存变更历史（可选）
        try {
            await connection.query(
                `INSERT INTO inventory_history 
                 (product_id, old_quantity, new_quantity, change_type) 
                 VALUES (?, ?, ?, ?)`,
                [pid, currentStock, currentStock - quantity, 'order_payment']
            );
        } catch (historyError) {
            console.warn('库存历史记录失败（不影响主要操作）:', historyError);
        }

        await connection.commit();

        res.json({
            success: true,
            message: '库存更新成功',
            newStock: currentStock - quantity
        });

    } catch (error) {
        if (connection) await connection.rollback();
        console.error('库存更新失败:', error);
        res.status(500).json({
            success: false,
            message: '服务器内部错误: ' + error.message
        });
    } finally {
        if (connection) connection.release();
    }
});

app.listen(port, () => {
    console.log(`后端服务器运行在 http://localhost:${port}`);
});

process.on('SIGINT', async () => {
    console.log('接收到 SIGINT 信号，准备关闭服务器和数据库连接池...');
    await pool.end();
    console.log('数据库连接池已关闭。');
    process.exit(0);
});

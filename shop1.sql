-- --- 1. 创建 categories (种类) 表 ---
CREATE TABLE categories (
category_id INT AUTO_INCREMENT PRIMARY KEY COMMENT '种类ID',
category_name VARCHAR(100) NOT NULL UNIQUE COMMENT '种类名称 (手机, 电脑, 耳机, 鼠标, 键盘, 手柄)',
created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='商品种类表';
-- --- 2. 创建 brands (品牌) 表 ---
CREATE TABLE brands (
brand_id INT AUTO_INCREMENT PRIMARY KEY COMMENT '品牌ID',
brand_name VARCHAR(100) NOT NULL UNIQUE COMMENT '品牌名称',
created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='商品品牌表';
-- --- 3. 创建 products (产品) 表 ---
CREATE TABLE products (
id INT AUTO_INCREMENT PRIMARY KEY COMMENT '商品ID (对应pid)',
name VARCHAR(255) NOT NULL UNIQUE COMMENT '商品名称 (包含品牌和型号, 对应pname)',
price DECIMAL(10, 2) NOT NULL COMMENT '商品价格',
stock INT DEFAULT 0 COMMENT '库存数量 (对应num)',
image_url VARCHAR(255) COMMENT '商品图片链接 (对应pic)',
category_id INT NOT NULL COMMENT '外键，关联种类表的category_id',
brand_id INT NOT NULL COMMENT '外键，关联品牌表的brand_id',
description TEXT COMMENT '商品描述 (对应note)',
created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
CONSTRAINT fk_product_category_shop FOREIGN KEY (category_id) REFERENCES categories (category_id) ON DELETE RESTRICT ON UPDATE CASCADE,
CONSTRAINT fk_product_brand_shop FOREIGN KEY (brand_id) REFERENCES brands (brand_id) ON DELETE RESTRICT ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='商品信息表';
-- --- 4. 插入种类数据到 categories 表 (固定6类) ---
INSERT INTO categories (category_id, category_name) VALUES
(1, '手机'),
(2, '电脑'),
(3, '耳机'),
(4, '鼠标'),
(5, '键盘'),
(6, '手柄');
-- --- 5. 插入品牌数据到 brands 表 ---
INSERT INTO brands (brand_id, brand_name) VALUES
(1, '苹果'),
(2, '三星'),
(3, '华为'),
(4, '小米'),
(5, 'OPPO'),
(6, '联想'),
(7, '华硕'),
(8, '戴尔'),
(9, '索尼'),
(10, 'Bose'),
(11, '森海塞尔'),
(12, '罗技'),
(13, '雷蛇'),
(14, '斐尔可（FILCO）'),
(15, '阿米洛（Varmilo）'),
(16, 'Keychron'),
(17, '微软'),
(18, '任天堂'),
(19, '八位堂'),
(20, '雷柏');
-- --- 6. 插入产品数据到 products 表 ---
INSERT INTO products (name, price, stock, image_url, category_id, brand_id, description) VALUES
('苹果 iPhone 15 Pro Max', 9999.00, 10, '/images/iphone-15-pro-max - 副本.png', 1, 1, '处理器: Apple A17 Pro（3nm 制程）\n屏幕: 6.7 英寸 Super Retina XDR OLED，120Hz ProMotion刷新率，2556×1179 分辨率\n摄像头:主摄：4800 万像素（f/1.78，传感器位移防抖）,超广角：1200 万像素（f/2.2）,长焦：1200 万像素（5 倍光学变焦）\n电池: 4422mAh，支持 27W 有线快充、15W MagSafe 无线充\n存储: 256GB/512GB/1TB（无扩展）\n系统: iOS 17\n其他: 钛金属边框、Action 按键、USB-C 接口、IP68 防水'),
('三星 Galaxy S24 Ultra', 9699.00, 21, '/images/三星 Galaxy S24 Ultra.avif', 1, 2, '处理器: 骁龙 8 Gen 3（4nm）\n屏幕: 6.8 英寸 Dynamic AMOLED 2X，120Hz 刷新率，3088×1440 分辨率，峰值亮度 2500nit\n摄像头:主摄：200MP（f/1.7，光学防抖,）超广角：12MP（f/2.2）,长焦：10MP（3 倍光变） + 50MP（5 倍光变）\n电池: 5000mAh，45W 有线快充，15W 无线充\n存储: 12GB+256GB/512GB/1TB（支持 microSD 扩展）\n系统: One UI 6（基于 Android 14）\n其他: S Pen 手写笔、钛金属机身、IP68、卫星通信'),
('华为 Mate 60 Pro', 6999.00, 53, '/images/华为 Mate 60 Pro.jpg', 1, 3, '处理器: 麒麟 9000s（支持 5G，7nm 制程）\n屏幕: 6.82 英寸 OLED 曲面屏，120Hz 刷新率，2720×1260 分辨率\n摄像头:主摄：5000 万像素（f/1.4-f/4.0 可变光圈）,超广角：1200 万像素（f/2.2）,长焦：4800 万像素（3.5 倍光变）\n电池: 5000mAh，88W 有线快充，50W 无线充\n存储: 12GB+256GB/512GB/1TB（无扩展）\n系统: HarmonyOS 4.0\n其他: 北斗卫星消息、IP68、第二代昆仑玻璃'),
('小米 14 Ultra', 6499.00, 67, '/images/小米 14 Ultra.jpg', 1, 4, '处理器: 骁龙 8 Gen 3\n屏幕: 6.73 英寸 AMOLED 2K+，120Hz LTPO，3200×1440 分辨率\n摄像头:主摄：5000 万像素（1 英寸 IMX989，f/1.6-f/4.0 可变光圈）,超广角：5000 万像素（f/1.8）, 长焦：5000 万像素（3.2 倍光变） + 5000 万像素（5 倍光变）\n电池: 5300mAh，90W 有线快充，80W 无线充\n存储: 12GB/16GB+256GB/512GB/1TB\n系统: HyperOS（基于 Android 14）\n其他: 双卫星通信、纳米素皮机身、IP68'),
('OPPO Find X7 Ultra', 5999.00, 20, '/images/OPPO Find X7 Ultra - 副本.jpg', 1, 5, '处理器: 骁龙 8 Gen 3\n屏幕: 6.82 英寸 2K AMOLED，120Hz LTPO，3168×1440 分辨率\n摄像头:主摄：5000 万像素（LYT-900，1 英寸，f/1.8）, 超广角：5000 万像素（f/2.2）,长焦：5000 万像素（3 倍光变） + 5000 万像素（6 倍光变）\n电池: 5000mAh，100W 有线快充，50W 无线充\n存储: 12GB/16GB+256GB/512GB/1TB\n系统: ColorOS 14（基于 Android 14）\n其他: 哈苏影像调校、卫星通信IP68'),
('苹果 MacBook Pro 16英寸 (M2 Max)', 24999.00, 15, '/images/苹果 MacBook Pro 16.jpg', 2, 1, '处理器: Apple M2 Max（12核CPU + 38核GPU，4nm制程）\n内存: 32GB/64GB 统一内存\n存储: 1TB/2TB/4TB/8TB SSD\n屏幕: 16.2英寸 Liquid Retina XDR（3456×2234分辨率，120Hz ProMotion，1000nit持续亮度，1600nit峰值）\n续航: 22小时视频播放，100W快充\n接口: 3×雷电4 (USB-C) + HDMI + SDXC卡槽 + MagSafe 3\n系统: macOS Ventura\n重量: 2.15kg\n特点: Mini-LED屏幕、六扬声器、无风扇静音设计、专业级创作性能\n适用人群: 视频剪辑师、设计师、程序员'),
('华为 MateBook X Pro 2023', 9999.00, 13, '/images/华为 MateBook X Pro 2023 - 副本.jpg', 2, 3, '处理器: 第13代酷睿i7-1360P（12核16线程）\n内存: 16GB/32GB LPDDR5\n存储: 1TB/2TB PCIe 4.0 SSD\n屏幕: 14.2英寸 3.1K触控屏（3120×2080，90Hz，100% P3色域）\n显卡: Intel Iris Xe 核显;续航: 12小时办公，支持65W快充（1小时充80%）\n接口: 2×雷电4 (USB-C) + 1×USB-A 3.2\n系统: Windows 11 + 华为多屏协同\n重量: 1.38kg\n特点: 超薄金属机身、压感触控板、超级终端互联（手机/平板一碰传）\n适用人群: 商务人士、轻办公用户'),
('联想 联想拯救者 Y9000P 2023', 19999.00, 16, '/images/联想拯救者 Y9000P 2023 - 副本.jpg', 2, 6, '处理器: 英特尔酷睿i9-13900HX（24核32线程）\n内存: 16GB/32GB DDR5 5600MHz（可扩展至64GB）\n存储: 1TB PCIe 4.0 SSD（双M.2插槽）\n屏幕: 16英寸 2.5K IPS（2560×1600，240Hz刷新率，100% sRGB）\n显卡: NVIDIA RTX 4090 Laptop（16GB GDDR6）\n散热: 双风扇+VC均热板+液态金属导热\n续航: 80Wh电池（支持140W PD快充）\n接口: 2×雷电4 + 3×USB-A 3.2 + HDMI 2.1 + RJ45网口\n系统: Windows 11;重量: 2.53kg\n特点: 超频模式、RGB背光键盘、独显直连切换\n适用人群: 游戏玩家、3D建模/渲染工作者'),
('华硕 ROG 幻16 Air', 14999.00, 17, '/images/华硕 ROG 幻16 Air - 副本.png', 2, 7, '处理器: AMD Ryzen 9 7940HS（8核16线程，Zen4架构）\n内存: 32GB LPDDR5X（板载不可扩展）\n存储: 2TB PCIe 5.0 SSD\n屏幕: 16英寸 2.8K OLED（2880×1800，120Hz，100% DCI-P3，HDR True Black 600认证）\n显卡: NVIDIA RTX 4070 Laptop（8GB GDDR6）\n续航: 90Wh电池（支持100W PD充电）\n接口: 2×USB4（Type-C）+ 2×USB-A 3.2 + HDMI 2.1\n系统: Windows 11\n重量: 1.95kg\n特点: 超窄边框、潘通色彩认证、180°开合设计\n适用人群: 内容创作者、兼顾便携与性能的用户'),
('戴尔 XPS 13 Plus', 12999.00, 25, '/images/戴尔 XPS 13 Plus - 副本.jpg', 2, 8, '处理器: 第13代酷睿i7-1360P\n内存: 16GB/32GB LPDDR5\n存储: 512GB/1TB/2TB PCIe 4.0 SSD\n屏幕: 13.4英寸 4K触控屏（3840×2400，100% Adobe RGB，Dolby Vision）\n显卡: Intel Iris Xe 核显\n续航: 12小时（4K屏）/ 18小时（FHD+屏）\n接口: 2×雷电4（USB-C，无传统USB-A接口）\n系统: Windows 11\n重量: 1.26kg\n特点: 无边框键盘、隐藏式触控板、碳纤维掌托\n适用人群: 高端商务用户、追求极致轻薄的设计师'),
('苹果 AirPods Pro（第二代）', 1899.00, 46, '/images/苹果 AirPods Pro - 副本.jpg', 3, 1, '类型: 真无线降噪耳机\n降噪: 主动降噪（ANC）+ 自适应通透模式\n驱动单元: 定制高振幅动圈单元\n续航: 单次6小时（降噪开）/ 总续航30小时（含充电盒）\n防水等级: IPX4（抗汗抗水）\n其他功能:H2芯片（支持空间音频、头部追踪） MagSafe无线充电 自适应EQ调音\n适用场景: 苹果生态用户、通勤/日常降噪'),
('索尼 WH-1000XM5', 2599.00, 57, '/images/索尼 WH-1000XM5.png', 3, 9, '类型: 头戴式无线降噪耳机\n降噪: 双芯片驱动（V1 + QN1），AI环境声控制\n驱动单元: 30mm 碳纤维复合振膜\n续航: 30小时（降噪开，支持3分钟快充续航3小时）\n无线协议: LDAC、蓝牙5.2\n其他功能: 360临场音效（支持Hi-Res Audio）,多点连接（同时连两台设备）,触控面板+智能免摘对话\n适用场景: 长途旅行、音质/降噪双需求'),
('Bose QuietComfort消噪耳塞', 2299.00, 66, '/images/Bose QuietComfort - 副本.jpg', 3, 10, '类型: 真无线降噪耳机\n降噪: 自适应当降噪（CustomTune技术）\n驱动单元: 动态音质均衡技术\n续航: 单次6小时（降噪开）/ 总续航24小时（含充电盒）\n防水等级: IPX4\n其他功能: 鲨鱼鳍耳套（防脱落设计）支持无线充电,通透模式可调节等级\n适用场景: 运动爱好者、注重佩戴舒适性 '),
('森海塞尔 IE 900', 9999.00, 19, '/images/森海塞尔 IE 900.jpg', 3, 11, '类型: 入耳式Hi-Fi耳机\n驱动单元: 专有X3R超宽频换能器（单动圈三腔吸声系统）\n阻抗: 16Ω（易驱动）\n频响范围: 5Hz-48kHz（超宽频）\n线材: 可拆卸3.5mm/2.5mm/4.4mm镀银无氧铜线\n其他功能:航天级铝合金外壳 ,人体工学佩戴设计 ,原厂提供7种耳塞尺寸适配\n场景: 专业音乐人、发烧友级音质追求者'),
('华为 FreeBuds Pro 3', 1499.00, 98, '/images/华为 FreeBuds Pro 3 - 副本.jpg', 3, 3, '类型: 真无线降噪耳机\n降噪: 智能动态降噪2.0（最大降噪深度50dB）\n驱动单元: 双磁路动圈 + 超高频微平板单元\n续航: 单次7小时（降噪关）/ 总续航31小时（含充电盒）\n无线协议: 星闪连接（NearLink，低延迟+高抗干扰）\n其他功能:空间音频（头部追踪）双设备连接（鸿蒙/安卓/iOS通用）IP54防尘防水\n适用场景: 华为设备用户、多场景降噪需求'),
('罗技 G Pro X Superlight', 1299.00, 55, '/images/罗技 G Pro X Superlight - 副本.jpg', 4, 12, '传感器: HERO 25K（最高25,600 DPI，零延迟追踪）\n重量: 63g（超轻量化设计）\n连接方式: 2.4GHz无线 + Lightspeed低延迟技术\n续航: 70小时（关闭RGB），支持USB-C快充\n按键: 5个可编程按键（欧姆龙机械微动）\n材质: 哑光涂层 + PTFE脚贴\n特点: 对称式设计（左右手通用）、支持PowerPlay无线充电\n适用场景: FPS/MOBA电竞玩家、追求轻量化的专业用户'),
('雷蛇 毒蝰 V3 Pro', 1199.00, 30, '/images/雷蛇 毒蝰 V3 Pro.jpg', 4, 13, '传感器: Focus Pro 30K（30,000 DPI，智能追踪校准）\n重量: 54g（蜂窝镂空外壳）\n连接方式: 2.4GHz无线 + HyperSpeed技术\n续航: 90小时（无RGB）\n按键: 6个可编程按键（光学微动，0.2ms响应）\n材质: 防滑侧裙 + 超柔伞绳线（有线模式备用）\n特点: 非对称人体工学（右手专用）、4KHz轮询率（需单独接收器）\n适用场景: 职业电竞选手、高强度竞技玩家'),
('微软 Surface Precision', 799.00, 18, '/images/微软 Surface Precision.jpg', 4, 17, '传感器: 蓝影追踪（支持玻璃/金属表面）\n连接方式: 蓝牙 + 2.4GHz无线\n续航: 3个月（单节AA电池）\n按键: 6键自定义（含横向滚轮）\n材质: 金属滚轮 + 类肤涂层\n特点: 多设备切换（同时连接3台设备）、支持Surface Dial兼容\n适用场景: 多屏办公用户、设计师（精准滚轮操控'),
('罗技 MX Master 3S', 899.00, 76, '/images/罗技 MX Master 3S.jpg', 4, 12, '传感器: Darkfield 4000 DPI（任意表面追踪）\n连接方式: 蓝牙 + Bolt USB接收器\n续航: 70天（USB-C快充1分钟用3小时)\n按键: 7键自定义（电磁滚轮 + 拇指手势键）\n特点:无极滚轮（金属材质，支持自动切换）跨设备文件传输（Flow技术，Win/Mac多系统互通）\n适用场景: 程序员、视频剪辑师（高效多任务操作)'),
('雷柏 VT9 Pro', 299.00, 56, '/images/雷柏 VT9 Pro.webp', 4, 20, '传感器: 原相PAW3395（26,000 DPI）\n重量: 68g\n连接方式: 2.4GHz无线/蓝牙/有线三模\n续航: 160小时（关闭RGB）\n按键: 8键可编程（欧姆龙微动，5,000万次寿命）\n特点:支持4KHz回报率（需单独接收器）可更换磁吸侧键（左手/右手模式）\n适用场景: 预算有限的游戏玩家、多平台用户'),
('斐尔可（FILCO）圣手三代 104键', 1099.00, 15, '/images/斐尔可（FILCO）圣手三代 104键.jpg', 5, 14, '轴体可选: 樱桃MX红轴/茶轴/青轴键帽\n材质: PBT双色注塑（耐磨抗油光）\n连接方式: 有线（USB-C接口）\n布局: 标准104键（全尺寸）\n特点:钢板加固结构（敲击稳定）全键无冲设计o经典窄边框设计（简约风格）\n适用场景: 程序员、文字工作者（长时打字舒适）'),
('罗技 G Pro X TKL', 1299.00, 18, '/images/罗技 G Pro X TKL.jpg', 5, 12, '轴体可选: GL 矮轴（红轴/青轴，支持热插拔更换）\n连接方式: 有线（USB-C） + 2.4GHz无线（Lightspeed技术）\n布局: 87键紧凑型（TKL）\nRGB灯光: 每键独立可编程\n其他功能:可拆卸磁吸腕托 板载内存（保存5组配置文件）\n特点: 超低延迟（1ms响应），航空级铝合金框架\n适用场景: 电竞玩家、追求便携的极客用户'),
('阿米洛（Varmilo）静电容V2系列', 899.00, 29, '/images/jianpan.jpg', 5, 15, '轴体类型: 静电容轴（45g压力克数，类红轴手感）\n键帽材质: 五面热升华PBT（主题定制图案）\n连接方式: 有线（USB-C）+ 蓝牙5.0;布局: 108键（带独立多媒体按键）\n特点:全键无冲 + 防泼溅设计,内置吸音棉（减少空腔音）支持Mac/Windows双系统切换\n适用场景:设计师、文艺创作者（颜值与手感兼备）'),
('Keychron Q3 Pro Max', 799.00, 24, '/images/Keychron Q3 Pro Max - 副本.jpg', 5, 16, '轴体可选: 佳达隆G Pro 3.0（红/茶/黄轴） + 热插拔PCBl\n结构: Gasket Mount（硅胶垫片减震）\n材质: 全CNC铝合金外壳（2.5kg重量）\n连接方式: 三模（有线/蓝牙/2.4GHz）\nRGB灯光: 下灯位设计（支持VIA改键）\n其他功能:旋钮编码器（音量/亮度调节）支持QMK/VIA开源改键\n适用场景: 键盘发烧友、客制化DIY玩家'),
('雷蛇黑寡妇蜘蛛V4 75%', 1199.00, 36, '/images/lei.jpg', 5, 13, '轴体类型: 雷蛇第三代绿轴（段落感，1.2mm触发）\n连接方式: 有线（USB-C编织线）\n布局: 75%配列（84键，独立方向键）\n特色功能:双侧RGB灯带（支持雷云同步）,多功能数字旋钮（游戏快捷操作）,磁吸人造皮革腕托\n其他参数: 8,000Hz轮询率（超低延迟）\n适用场景: MOBA/MMO网游玩家（快捷操作优化）'),
('微软 Xbox Elite 无线手柄二代', 1399.00, 46, '/images/微软 Xbox Elite 无线手柄二代.jpg', 6, 17, '兼容平台: PC、Xbox Series X/S、Xbox One\n连接方式: 蓝牙 + 2.4GHz无线 + USB-C有线\n电池续航: 40小时（可更换电池）\n按键自定义:4个背键（磁吸设计）,3组摇杆（可更换高度/形状）,2组十字键（磁吸圆盘/8方向）\n特色功能:摇杆灵敏度调节（0-100%线性）扳机键三段行程（可锁短行程） 支持配置文件快速切换\n适用场景: 竞技游戏玩家、专业级操控需求'),
('索尼 PlayStation DualSense', 599.00, 35, '/images/索尼 PlayStation DualSense.webp', 6, 9, '兼容平台: PS5、PC（需驱动支持）\n连接方式: USB-C有线 + 蓝牙\n电池续航: 约12小时\n特色功能:自适应扳机键（支持不同阻力反馈）触觉反馈（精准震动模拟不同场景） 内置麦克风 + 扬声器（支持语音通话）\n其他参数: 陀螺仪/加速度计（支持体感操作）\n适用场景: PS5玩家、沉浸式游戏体验追求者'),
('任天堂 Switch Pro', 459.00, 63, '/images/任天堂 Switch Pro 手柄.jpg', 6, 18, '兼容平台: Switch、PC（蓝牙/有线）\n连接方式: USB-C有线 + 蓝牙\n电池续航: 约40小时\n特色功能:HD震动（细腻场景反馈） 红外摄像头（仅支持部分游戏）支持NFC（Amiibo读取）\n其他参数: 对称式摇杆布局、类Xbox手柄握感\n适用场景: Switch玩家、PC/Steam游戏兼容用户'),
('雷蛇 Wolverine V2 Pro', 1599.00, 26, '/images/雷蛇 Wolverine V2 Pro.jpg', 6, 13, '兼容平台: PC、PS5/PS4（通过切换模式）\n连接方式: 2.4GHz无线 + USB-C有线\n电池续航: 约28小时\n按键自定义: 6个额外背键（可编程）,可更换摇杆帽（3种高度）,机械按键（0.65mm超短触发）\n特色功能:3组配置文件快速切换oRGB灯效（雷云同步）,扳机锁（短键程射击模式）\n适用场景: FPS电竞选手、高精度操作需求'),
('八位堂 8BitDo Pro 2', 899.00, 26, '/images/八位堂 8BitDo Pro 2 - 副本.jpg', 6, 19, '兼容平台: Switch、PC、Android、iOS、Steam\n连接方式: 蓝牙/2.4GHz无线 + USB-C有线\n电池续航: 约20小时\n特色功能:双背键（可自定义）,支持宏编程（通过手机App）,复古十字键设计（街机游戏优化）\n其他参数: 对称式布局、握持感舒适适用场景: 多平台用户、怀旧游戏玩家');
-- --- 7. 为API查询创建视图 ---
CREATE OR REPLACE VIEW v_shop_products_display AS
SELECT
p.id,
p.name,
p.price,
p.stock,
p.image_url,
cat.category_name AS category,
p.description AS note,
p.brand_id,
b.brand_name,
p.category_id,
p.created_at,
p.updated_at
FROM products p
JOIN brands b ON p.brand_id = b.brand_id
JOIN categories cat ON p.category_id = cat.category_id;

-- --- 数据库结构定义完毕 ---
SELECT*
FROM products;


-- --- 一：创建角色 (MySQL 8.0+) ---
-- 这些角色定义了权限的集合。
CREATE ROLE IF NOT EXISTS 'db_admin_role';   -- 角色名加 _role 后缀以区分用户
CREATE ROLE IF NOT EXISTS 'developer_role';
CREATE ROLE IF NOT EXISTS 'app_api_role';    -- 专门为后端 API 设计的角色

-- --- 二：为角色分配权限 ---

-- 1. 'db_admin_role' (数据库超级管理员角色)
-- 对 'shop1' 数据库拥有所有权限，并能创建新用户和角色。
GRANT ALL PRIVILEGES ON `shop1`.* TO 'db_admin_role' WITH GRANT OPTION;
GRANT CREATE USER, CREATE ROLE, DROP ROLE, RELOAD ON *.* TO 'db_admin_role'; -- 全局权限

-- 2. 'developer_role' (开发人员角色)
-- 对 'shop1' 数据库中的 'products' ,'brands'表拥有完全的增删改查权限，对`categories`有查权限
GRANT SELECT, INSERT, UPDATE, DELETE ON `shop1`.`products` TO 'developer_role';
GRANT SELECT ON `shop1`.`categories` TO 'developer_role';
GRANT SELECT ON `shop1`.`brands` TO 'developer_role';
GRANT SELECT ON `shop1`.`v_shop_products_display` TO 'developer_role';
GRANT INSERT, UPDATE, DELETE ON `shop1`.`brands` TO 'developer_role';
-- 如果开发人员需要创建外键
-- GRANT REFERENCES ON `shop`.`products` TO 'developer_role';

-- --- 三：创建用户并将其分配给角色 ---

-- 1. 创建数据库管理员用户
CREATE USER IF NOT EXISTS 'shop_admin'@'localhost' IDENTIFIED BY 'AdminStrongPassw0rd!'; -- 使用强密码
GRANT 'db_admin_role' TO 'shop_admin'@'localhost';
ALTER USER 'shop_admin'@'localhost' DEFAULT ROLE 'db_admin_role';

-- 2. 创建开发人员用户
CREATE USER IF NOT EXISTS 'dev_user'@'localhost' IDENTIFIED BY 'DevSecurePass123!'; -- 使用强密码
GRANT 'developer_role' TO 'dev_user'@'localhost';
ALTER USER 'dev_user'@'localhost' DEFAULT ROLE 'developer_role';

-- --- 四：刷新权限 ---
-- 执行完所有 GRANT 和 REVOKE 命令后，刷新权限使更改立即生效。
FLUSH PRIVILEGES;

-- 创建库存变更历史表
CREATE TABLE inventory_history (
  history_id INT AUTO_INCREMENT PRIMARY KEY,
  product_id INT NOT NULL,
  old_quantity INT NOT NULL,
  new_quantity INT NOT NULL,
  change_type VARCHAR(50) COMMENT '变更类型(order_payment, manual_adjust, etc)',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE CASCADE
) ENGINE=InnoDB COMMENT='库存变更历史表';
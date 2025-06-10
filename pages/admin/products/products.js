// pages/admin/products/products.js

// 1. 获取全局 app 实例，以便访问在 app.js 中定义的 globalData
const app = getApp();

// 2. 从全局数据中获取 API 基础 URL
const API_BASE_URL = app.globalData.apiBaseUrl;

Page({
    data: {
        productList: [],        // 用于存储从后端获取的产品列表
        filteredProductList: [],// 用于显示搜索/筛选后的产品列表
        isLoading: false,       // 控制加载状态的显示
        errorMsg: '',           // 用于显示错误信息

        // 用于添加或编辑产品的表单数据模型
        productForm: {
            id: null,           // 编辑，会有产品ID；添加，则为null
            name: '',           // 产品名称
            price: '',          // 产品价格 (字符串类型，提交时转为数字)
            stock: '',          // 产品库存 (字符串类型，提交时转为数字)
            image_url: '',      // 产品图片URL或文件名
            category: '',       // 产品分类
            description: ''     // 产品描述
        },
        isFormVisible: false,   // 控制添加/编辑表单的显示与隐藏
        formTitle: '添加新产品' ,// 表单的标题
        // --- imageBaseUrl 到 data 中 ---
        imageBaseUrlForWxml: '' ,// 初始化为空字符串
        searchKeyword: '',      // 存储搜索框的输入内容
    },

    onLoad: function (options) {
      console.log('--- Admin Products Page: onLoad event triggered ---');

      // 在 onLoad 中获取 app 实例和 globalData
      const app = getApp(); 
      const appInstance = getApp(); // 修改变量名以避免与全局 app 冲突
      if (!app || !app.globalData) {
          console.error('CRITICAL: Failed to get app instance or app.globalData in onLoad!');
          wx.showModal({ title: '严重错误', content: '无法获取全局应用数据，请重启小程序或联系开发者。', showCancel: false });
          this.setData({ errorMsg: '无法加载全局配置', isLoading: false });
          return;
      }

      console.log('Admin Products Page: Value of app.globalData.apiBaseUrl is:', app.globalData.apiBaseUrl);
      console.log('Admin Products Page: Value of app.globalData.imageBaseUrl is:', app.globalData.imageBaseUrl); 

      if (typeof app.globalData.imageBaseUrl === 'undefined') {
          console.error('CRITICAL ERROR in admin/products.js: app.globalData.imageBaseUrl IS UNDEFINED!');
          wx.showModal({
              title: '配置读取错误',
              content: 'imageBaseUrl 在 admin/products.js 中未定义，图片无法加载！请检查 app.js 的 globalData 设置。',
              showCancel: false
          });
          this.setData({ errorMsg: 'imageBaseUrl 配置错误', isLoading: false });
          return;
      }
      if (typeof app.globalData.apiBaseUrl === 'undefined') {
          console.error('CRITICAL ERROR in admin/products.js: app.globalData.apiBaseUrl IS UNDEFINED!');
          wx.showModal({
              title: '配置读取错误',
              content: 'apiBaseUrl 在 admin/products.js 中未定义，无法请求数据！请检查 app.js 的 globalData 设置。',
              showCancel: false
          });
          this.setData({ errorMsg: 'apiBaseUrl 配置错误', isLoading: false });
          return;
      }

      this.API_BASE_URL = app.globalData.apiBaseUrl; 
      console.log('Admin Products Page: imageBaseUrl seems OK:', app.globalData.imageBaseUrl);
      console.log('Admin Products Page: apiBaseUrl seems OK:', this.API_BASE_URL);
      this.setData({ // 在 onLoad 中设置 imageBaseUrlForWxml
        imageBaseUrlForWxml: appInstance.globalData.imageBaseUrl || ''
      });
      this.fetchProducts();
  },
    
     
  fetchProducts: function (searchKeyword = '') { // 可以接收一个可选的搜索关键词参数
    const appInstance = getApp();
    if (!appInstance || !appInstance.globalData || !appInstance.globalData.apiBaseUrl) {
        console.error("fetchProducts: apiBaseUrl is not available.");
        this.setData({ errorMsg: 'API配置错误，无法加载产品', isLoading: false });
        return;
    }
    this.setData({ isLoading: true, errorMsg: '' });

    let requestUrl = `${appInstance.globalData.apiBaseUrl}/products`;

    wx.request({
        url: requestUrl,
        method: 'GET',
        success: (res) => {
          
            if (res.statusCode === 200 && Array.isArray(res.data)) {
                this.setData({
                    productList: res.data,
                    // filteredProductList: res.data // 初始时，筛选列表等于完整列表
                });
                this.filterProducts(); // 获取数据后立即执行一次筛选，以应对初始 searchKeyword
            } else {
                this.setData({
                    errorMsg: '加载产品列表失败: ' + (res.data.message || `状态码 ${res.statusCode}`),
                    productList: [],
                    filteredProductList: []
                });
                console.error("后台管理 - 获取产品列表失败:", res);
            }
        },
        fail: (err) => {
            this.setData({
                errorMsg: '网络错误，无法连接到后端服务。',
                productList: [],
                filteredProductList: []
            });
            console.error("后台管理 - 获取产品列表网络请求失败:", err);
        },
        complete: () => {
            this.setData({ isLoading: false });
        }
    });
},

    // --- ：处理搜索框输入事件 ---
    onSearchInput: function(e) {
      this.setData({
          searchKeyword: e.detail.value
      });
      // 实时搜索：每次输入都执行筛选
      this.filterProducts();
  },

  // --- 执行前端筛选产品的方法 ---
  filterProducts: function() {
      const keyword = this.data.searchKeyword.toLowerCase().trim();
      if (!keyword) { // 如果关键词为空，显示所有产品
          this.setData({
              filteredProductList: this.data.productList
          });
          return;
      }

      const filteredList = this.data.productList.filter(product => {
          // 根据产品名称进行不区分大小写的模糊匹配
          return product.name && product.name.toLowerCase().includes(keyword);
      });
      this.setData({
          filteredProductList: filteredList
      });
  },

  // --- 清除搜索关键词
  clearSearch: function() {
      this.setData({
          searchKeyword: '',
          filteredProductList: this.data.productList // 恢复显示所有产品
      });
  },


    onImageLoadError: function(e) {
      console.error('--- Admin Products Page: onImageLoadError event triggered ---');
      console.error('Event Detail:', e.detail);
      let failedSrc = 'Unknown';
      if (e.currentTarget && e.currentTarget.dataset && e.currentTarget.dataset.src) {
          failedSrc = e.currentTarget.dataset.src;
      } else if (e.target && e.target.dataset && e.target.dataset.src) {
          failedSrc = e.target.dataset.src;
      } else if (e.detail && e.detail.errMsg && e.detail.errMsg.includes('src:')) {
          try {
              const match = e.detail.errMsg.match(/src:\s*([^\s]+)/);
              if (match && match[1]) {
                  failedSrc = match[1];
              }
          } catch (err) { /* ignore parsing error */ }
      }
      console.error('Failed Image SRC (Best Guess):', failedSrc);
      const index = e.currentTarget.dataset.index;
      if (this.data.productList && this.data.productList[index]) {
        console.error('Corresponding Product Data:', this.data.productList[index]);
      } else {
        console.warn('Could not find product data for failed image at index:', index);
      }
  },



    /**
     * 表单输入框内容改变时的处理函数
     * 使用 dataset 获取输入框对应的字段名，动态更新 productForm 中的数据
    */
    onFormInput: function (e) {
        const field = e.currentTarget.dataset.field; // 获取 WXML 中 data-field 的值
        this.setData({
            [`productForm.${field}`]: e.detail.value // 动态设置 productForm 中对应字段的值
        });
    },

    /**
     * 显示添加新产品的表单
     */
    showAddForm: function () {
        this.setData({
            isFormVisible: true,
            formTitle: '添加新产品',
            productForm: { // 重置表单内容为空
                id: null,
                name: '',
                price: '',
                stock: '',
                image_url: '',
                category: '',
                description: ''
            }
        });
    },

    /**
     * 显示编辑产品的表单，并填充现有产品数据
     * 从 WXML 的 data-product 中获取被点击的产品对象
     */
    showEditForm: function (e) {
        const product = e.currentTarget.dataset.product; // 获取被点击的产品数据
        this.setData({
            isFormVisible: true,
            formTitle: `编辑产品 - ${product.name}`, // 设置表单标题
            productForm: { // 将产品数据填充到表单
                id: product.id,
                name: product.name || '',
                price: product.price !== null ? String(product.price) : '', // 数字转字符串
                stock: product.stock !== null ? String(product.stock) : '', // 数字转字符串
                image_url: product.image_url || '',
                category: product.category || '',
                description: product.note || ''
            }
        });
    },

    /**
     * 隐藏添加/编辑表单
     */
    hideForm: function () {
        this.setData({ isFormVisible: false });
    },

    /**
     * 提交表单（用于添加或更新产品）
     * 根据 productForm.id 是否存在来判断是执行添加 (POST) 还是更新 (PUT) 操作
     */
    submitForm: function () {
      const app = getApp(); 
      if (!app || !app.globalData || !app.globalData.apiBaseUrl) {
        console.error("submitForm: apiBaseUrl is not available.");
        wx.showToast({ title: 'API配置错误', icon: 'none' });
        return;
      }
      const form = this.data.productForm;

        // 前端校验
        if (!form.name || !form.price) {
            wx.showToast({ title: '产品名称和价格不能为空', icon: 'none' });
            return;
        }
        if (isNaN(parseFloat(form.price))) {
            wx.showToast({ title: '价格必须是有效的数字', icon: 'none' });
            return;
        }

        // 准备要发送到后端的数据
        const requestData = {
            name: form.name,
            price: parseFloat(form.price), // 转换为数字
            stock: form.stock ? parseInt(form.stock) : 0, // 转换为空或0
            image_url: form.image_url,
            category: form.category,
            description: form.description
        };

        // let url = `${API_BASE_URL}/products`;
        let url = `${app.globalData.apiBaseUrl}/products`; // 使用 app.globalData
        let method = 'POST'; // 默认为添加操作

        if (form.id) { // 如果 form.id 存在，说明是编辑操作
            // url = `${API_BASE_URL}/products/${form.id}`; // 更新操作的URL包含产品ID
            url = `${app.globalData.apiBaseUrl}/products/${form.id}`; // 使用 app.globalData
            method = 'PUT'; // 更新操作使用 PUT 方法
        }

        this.setData({ isLoading: true }); // 开始加载
        wx.request({
            url: url,
            method: method,
            data: requestData, // 发送的数据
            header: {
                'content-type': 'application/json' // 告知后端发送的是JSON数据
            },
            success: (res) => {
                if (res.statusCode === 201 || res.statusCode === 200) { // 201: Created (添加成功), 200: OK (更新成功)
                    wx.showToast({ title: form.id ? '产品更新成功' : '产品添加成功' });
                    this.hideForm(); // 关闭表单
                    this.fetchProducts(); // 重新加载产品列表以显示最新数据
                } else {
                    wx.showToast({ title: (form.id ? '更新' : '添加') + '失败: ' + (res.data.message || '服务器内部错误'), icon: 'none' });
                    console.error(`后台管理 - ${form.id ? '更新' : '添加'}产品失败:`, res);
                }
            },
            fail: (err) => {
                wx.showToast({ title: '网络请求失败，请检查网络连接', icon: 'none' });
                console.error(`后台管理 - ${form.id ? '更新' : '添加'}产品网络请求失败:`, err);
            },
            complete: () => {
                this.setData({ isLoading: false }); // 结束加载
            }
        });
    },

    /**
     * 删除产品的方法
     * 从 WXML 的 data-id 和 data-name 中获取产品信息
     * 调用后端的 DELETE /api/products/:id 接口
     */
    deleteProduct: function (e) {
        const productId = e.currentTarget.dataset.id;
        const productName = e.currentTarget.dataset.name;

        wx.showModal({ // 显示确认对话框
            title: '确认删除',
            content: `确定要删除产品 "${productName}" (ID: ${productId}) 吗？此操作不可恢复。`,
            confirmColor: '#e64340', // 删除按钮红色
            success: (res) => {
                if (res.confirm) { // 用户点击了确定
                    this.setData({ isLoading: true });
                    wx.request({
                        url: `${API_BASE_URL}/products/${productId}`, // 删除操作的URL包含产品ID
                        method: 'DELETE',
                        success: (delRes) => {
                            if (delRes.statusCode === 200) {
                                wx.showToast({ title: '产品删除成功' });
                                this.fetchProducts(); // 重新加载产品列表
                            } else {
                                wx.showToast({ title: '删除失败: ' + (delRes.data.message || '服务器错误'), icon: 'none' });
                                console.error("后台管理 - 删除产品失败:", delRes);
                            }
                        },
                        fail: (err) => {
                            wx.showToast({ title: '网络请求失败', icon: 'none' });
                            console.error("后台管理 - 删除产品网络请求失败:", err);
                        },
                        complete: () => {
                            this.setData({ isLoading: false });
                        }
                    });
                }
            }
        });
    },

    /**
     * 下拉刷新页面的处理函数
     */
    onPullDownRefresh: function () {
        this.setData({ // 重置表单和错误信息
            isFormVisible: false,
            errorMsg: ''
        }, () => {
            this.fetchProducts(); // 重新获取产品列表
        });
        wx.stopPullDownRefresh(); // 停止下拉刷新的动画
    }
});
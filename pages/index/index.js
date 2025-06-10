// index.js
const app = getApp();
const API_BASE_URL = app.globalData.apiBaseUrl;
Page({
  data: {
    bannerlist:[
      '/images/banner.png',
      '/images/ban2.png',
      '/images/ban3.png',
      '/images/ban4.png',
      '/images/ban5.png',
      '/images/ban6.png',
      '/images/ban7.png' ,
      '/images/banner2.png' 
    ],

    cataloglist:[
      {'type':'shouji','icon':'/images/shouji.png','text':'手机'},
      {'type':'pingban','icon':'/images/bijiben.png','text':'电脑'},
      {'type':'erji','icon':'/images/erji.png','text':'耳机'},
     
    ],
    cataloglist2:[
      {'type':'shubiao','icon':'/images/shubiao.jpg','text':'鼠标'},
    {'type':'jianpan','icon':'/images/jianpan.jpg','text':'键盘'},
      {'type':'shoubing','icon':'/images/shoub.jpg','text':'手柄'},
    ],
    productlist: [], // 初始化为空
    findlist: [],    // 初始化为空
    searchValue: '',
    currentCatalogName: '',
    isLoading: true, // 新增
    errorMsg: ''     // 新增
  },
  onLoad: function() {
    this.fetchProductsFromAPI(); 
  },
  fetchProductsFromAPI: function() {
    console.log('--- fetchProductsFromAPI CALLED ---'); // <--- 新增日志
    this.setData({ isLoading: true, errorMsg: '' });
    const currentApp = getApp(); // 再次获取，确保是最新的
    const IMAGE_BASE_URL = currentApp.globalData.imageBaseUrl;
    const API_BASE_URL = currentApp.globalData.apiBaseUrl; // 确保也从 app.globalData 获取
    if (!IMAGE_BASE_URL) {
        console.error("错误：app.globalData.imageBaseUrl 未定义！请检查 app.js。");
        this.setData({ isLoading: false, errorMsg: '配置错误，无法加载图片' });
        return;
    }
    if (!API_BASE_URL) { // 同时检查 API_BASE_URL
        console.error("错误：app.globalData.apiBaseUrl 未定义！请检查 app.js。");
        this.setData({ isLoading: false, errorMsg: 'API配置错误，无法加载数据' });
        return;
    }

    wx.request({
      url: `${API_BASE_URL}/products`, // <--- 正确的 API 地址
      method: 'GET',
      success: (res) => {
        console.log('--- wx.request SUCCESS ---');
        console.log('API Response:', res); 
        if (res.statusCode === 200 && Array.isArray(res.data)) {
          const formattedProductList = res.data.map(item => ({
            pid: item.id,
            pname: item.name,       // 来自视图 v_shop_products_display.name
            price: item.price,
            num: item.stock,        // 来自视图 v_shop_products_display.stock
            pic: `${IMAGE_BASE_URL}${item.image_url}`, // 来自视图 v_shop_products_display.image_url
            catalog: item.category, // 来自视图 v_shop_products_display.category (即 category_name)
            note: item.note         // 来自视图 v_shop_products_display.note (即 products.description)
          }));
          console.log('Formatted Product List:', formattedProductList); // 打印格式化后的列表
          this.setData({
            productlist: formattedProductList,
            findlist: formattedProductList,
            currentCatalogName: ''
          });
          try {
            wx.setStorageSync('allProductList', formattedProductList);
            console.log('--- allProductList SET TO STORAGE ---');
            console.log('Number of products stored:', formattedProductList.length);
          } catch (e) {
            console.error("Failed to set product list to storage", e);
          }

        } else {
          this.setData({ errorMsg: '加载产品数据失败: ' + (res.data.message || `状态码 ${res.statusCode}`) });
        }
      },
      fail: (err) => {
        console.log('--- wx.request FAIL ---'); 
        console.error('API Request Failed:', err); // 打印网络错误详情
        this.setData({ errorMsg: '网络错误，无法获取产品数据' });
      },
      complete: () => {
        this.setData({ isLoading: false });
      }
    });
  },
  onProductImageError: function(e) {
    console.error('产品图片加载失败:', e.detail.errMsg, '对应产品索引:', e.currentTarget.dataset.index);
  },    

    // 搜索框输入事件 - 只更新 searchValue
    onSearchInput: function(e) {
      this.setData({
        searchValue: e.detail.value
      });
    },
  
    
    // 清除搜索内容
    onClearSearch: function() {
      const currentCatalog = this.data.currentCatalogName;
      let productsToShow = this.data.productlist; // 默认显示所有商品
      if (currentCatalog) { // 如果有当前分类，则筛选
        productsToShow = this.data.productlist.filter(pd => pd.catalog === currentCatalog);
      }
      this.setData({
        searchValue: '',
        findlist: productsToShow // 恢复到当前分类或所有商品
      });
    },
  
    // 点击页面搜索按钮的事件
    onSearchButtonClick: function() {
      const keyword = this.data.searchValue;
      if (keyword && keyword.trim() !== '') {
        wx.navigateTo({
          url: `/pages/searchResult/searchResult?keyword=${encodeURIComponent(keyword.trim())}`
        });
      } else {
        wx.showToast({
          title: '请输入搜索关键词',
          icon: 'none'
        });
      }
    },  

  doCatalogClick:function(e)
 {
   
   let that=this;
   console.log('catalog',e.currentTarget.dataset.text)
   let cname=e.currentTarget.dataset.text;
   let plist=that.data.productlist;
   let findpdlist=plist.filter((pd,index,plist)=>pd.catalog==cname);
   console.log('findlist',findpdlist);
   that.setData(
     {
       findlist:findpdlist,
       searchValue: '', // 点击分类时清空搜索框内容，但首页列表不受搜索词影响了
       currentCatalogName: cname // 记录当前分类
     }
   );

 },


  // index.js 修改部分
doshowDetail: function(e) {
  let that = this;
  let pd = e.currentTarget.dataset.product;
  
  // 保存到浏览历史
  let history = wx.getStorageSync('viewHistory') || [];
  // 去重处理
  history = history.filter(item => item.pid !== pd.pid);
  // 添加到数组开头并限制最多20条
  history.unshift(pd);
  if (history.length > 20) history.pop();
  wx.setStorageSync('viewHistory', history);

  // 跳转详情页
  let pdStr = encodeURIComponent(JSON.stringify(pd));
  wx.navigateTo({
    url: '/pages/detail/detail?product=' + pdStr,
  })
},
})






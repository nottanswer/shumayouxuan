//pages/my1/my.js
Page({
  data:{
    userInfo: {}
  },
  loadUserInfo() {
    const userInfo = wx.getStorageSync('userInfo') || {};
    this.setData({
      userInfo:{
        ...userInfo,
        registerTime:userInfo.registerTime || '未知时间'
      }
    });
  },
  onShow() {
    this.loadUserInfo();
  },
  data: {
    orderTypes: [
      { type: 'shipping', name: '待发货', icon: '/images/图标/待发货.png', url: '/pages/order/order'},
      { type: 'receiving', name: '待收货', icon: '/images/图标/待收货.png', url: '/pages/shouhuo/shouhuo' },
      { type: 'review', name: '待评价', icon: '/images/图标/待评价.png', url: '/pages/pingjia/pingjia' },
      { type: 'aftersale', name: '退货售后', icon: '/images/图标/售后退换.png', url: '/pages/tuihuo/tuihuo' }
    ],
    functions: [
      { id: 1, name: '我的收藏', icon: '/images/图标/收藏.png', url: '/pages/love/love' },
      { id: 2, name: '浏览历史', icon: '/images/图标/浏览历史.png', url: '/pages/liulanlishi/liulanlishi' },
      { id: 3, name: '客服中心', icon: '/images/图标/客服中心.png', url: '/pages/kefu/kefu' },
      { id: 4, name: '关于我们', icon: '/images/图标/关于我们.png', url: '/pages/guanyu/guanyu' }
      // { id: 5, name: '后台管理', icon: '/images/图标/后台管理.png', url: '/pages/admin/products/products' } 
    ]
  },
  goToIndex(){
    wx.navigateTo({
      url: '/pages/login/login'
    });
  },

  goToAdminProducts: function() {
    wx.navigateTo({
      url: '/pages/houtaiguanli/houtaiguanli'
    });
  },


  navigateTo(e) {
    const url = e.currentTarget.dataset.url;
    if (url) {
      wx.navigateTo({ 
        url: url 
      });
    } else {
      wx.showToast({ 
        title: '功能开发中', 
        icon: 'none' 
      });
    }
  }
 
});
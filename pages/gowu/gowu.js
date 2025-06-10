// 修改后的 cart.js
Page({
  data: {
    cartlist: [],
    dinglist: []  // 恢复订单列表
  },

  onLoad(options) {
    this.loadCartData();
  },

  loadCartData() {
    const cartlist = wx.getStorageSync('cartlist') || [];
    const dinglist = wx.getStorageSync('dinglist') || [];
    this.setData({ cartlist, dinglist });
  },

  // 删除购物车商品
  docartdelclick(e) {
    const pid = e.currentTarget.dataset.pid;
    const newCartList = this.data.cartlist.filter(item => item.pid !== pid);
    
    wx.setStorageSync('cartlist', newCartList);
    this.setData({ cartlist: newCartList });
    wx.showToast({ title: '移除成功', duration: 2000 });
  },

  
 // 立即支付按钮事件处理 - 修复版本
// 立即支付按钮事件处理 - 修复版本
addToOrder: function(e) {
  const product = e.currentTarget.dataset.pd;
  const pid = product.pid;
  
  wx.showLoading({ title: '处理中...' });
  
  wx.request({
    url: 'http://localhost:3000/api/update-stock',
    method: 'POST',
    data: { pid, quantity: 1 },
    success: (res) => {
      // 统一处理加载状态隐藏
      wx.hideLoading();
      
      if (res.data.success) {
        wx.showToast({ title: '支付成功!', icon: 'success' });
        
        // 1. 从购物车移除
        const newCart = this.data.cartlist.filter(item => item.pid !== pid);
        this.setData({ cartlist: newCart });
        wx.setStorageSync('cartlist', newCart); // 修复存储键名
        
        // 2. 添加到订单列表（新增）
        const newOrder = {
          ...product,
          orderTime: new Date().toLocaleString(),
          status: '已完成'
        };
        const newDingList = [...this.data.dinglist, newOrder];
        this.setData({ dinglist: newDingList });
        wx.setStorageSync('dinglist', newDingList);
        
      } else {
        wx.showToast({
          title: res.data.message || '支付失败',
          icon: 'none'
        });
      }
    },
    fail: (error) => {
      // 确保网络错误时也隐藏加载
      wx.hideLoading();
      wx.showToast({
        title: '网络错误',
        icon: 'none'
      });
    }
  });
}
})
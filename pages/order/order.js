// order.js
Page({
  data: {
    dinglist: []
  },

  onLoad() {
    this.loadOrderData();
  },

  loadOrderData() {
    const dinglist = wx.getStorageSync('dinglist') || [];
    this.setData({ dinglist });
  },

  // 移出订单
  removeFromOrder(e) {
    const pid = e.currentTarget.dataset.pid;
    const newDingList = this.data.dinglist.filter(item => item.pid !== pid);
    
    wx.setStorageSync('dinglist', newDingList);
    this.setData({ dinglist: newDingList });
    wx.showToast({ title: '已移出订单', duration: 2000 });
  }
});
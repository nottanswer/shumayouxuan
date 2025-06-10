// pages/history/history.js
Page({
  data: {
    historyList: []
  },

  onShow() {
    this.loadHistory();
  },

  loadHistory() {
    let history = wx.getStorageSync('viewHistory') || [];
    // 添加格式化时间
    history = history.map(item => {
      return {
        ...item,
        viewTime: this.formatTime(new Date())
      }
    });
    this.setData({ historyList: history });
  },

  formatTime(date) {
    const year = date.getFullYear()
    const month = (date.getMonth() + 1).toString().padStart(2, '0')
    const day = date.getDate().toString().padStart(2, '0')
    const hour = date.getHours().toString().padStart(2, '0')
    const minute = date.getMinutes().toString().padStart(2, '0')
    return `${year}-${month}-${day} ${hour}:${minute}`
  },

  clearHistory() {
    wx.showModal({
      title: '提示',
      content: '确定要清空所有浏览记录吗？',
      success: (res) => {
        if (res.confirm) {
          wx.removeStorageSync('viewHistory');
          this.setData({ historyList: [] });
        }
      }
    })
  },

  viewAgain(e) {
    const pd = e.currentTarget.dataset.pd;
    const pdStr = encodeURIComponent(JSON.stringify(pd));
    wx.navigateTo({
      url: `/pages/detail/detail?product=${pdStr}`,
    })
  }
})
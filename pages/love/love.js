// pages/shouc/shouc.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
      lovelist:[],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
     let that=this;

     let lvlist=wx.getStorageSync('lovelist');
     this.setData({
       lovelist:lvlist
     });
  },

  lovedelclick:function(e)
  {
    let that=this;
    console.log('dol',e) 
    let pid=e.currentTarget.dataset.pid;
    console.log('pid',pid)
   
    let index=that.data.lovelist.findIndex(pd=>pd.pid==pid);

    that.data.lovelist.splice(index,1);

    wx.setStorageSync('lovelist',that.data.lovelist)
    wx.showToast({
      title: '移除',
      duration:2000
    })
    this.setData
    
    ({
      lovelist:that.data.lovelist
    })
     
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {

  }
})
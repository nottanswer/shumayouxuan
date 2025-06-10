// pages/detail/detail.js
Page({
  /**
     * 页面的初始数据
   */
  data: {
    product: null,
    lovelist: [],//收藏的商品列表数组
    cartlist: [],//购物车的商品数组
    isFavorited: false,
    isInCart: false,
  },
    /**
    * 生命周期函数--监听页面加载
    */
  onLoad(options) {
    let that = this;
    //接受index页面传递的参数值
    let pd=options.product;
        console.log('detail--pd--->',pd)
        //将url参数转为json字符串
        pd=decodeURIComponent(pd);
        console.log('detail--pd字符串-转换后-->',pd)
        //将json字符串转为json对象
        pd=JSON.parse(pd);
        console.log('detail--pd对象-转换后-->',pd)


    this.setData({
      product: pd 
    })
    //========结束接收参数的值======
    //从本地存储中获取收藏的商品列表数组
    let lvlist=wx.getStorageSync('lovelist');
    this.setData({
      lovelist:lvlist
    });
    if(that.data.lovelist==null||that.data.lovelist.length==0){
      this.setData({
        lovelist:[]
      });
    }
    console.log('detail---lovelist--->',that.data.lovelist)
    //================================================
    //从本地存储中获取购物的商品列表数组
    let gouwulist=wx.getStorageSync('cartlist');
    this.setData({
      cartlist:gouwulist
    });
    if(that.data.cartlist==null||that.data.cartlist.length==0){
      this.setData({
         cartlist:[]
      });
    }
    console.log('detail---cartlist--->',that.data.cartlist)
    //================================================


    // --- 初始化 isFavorited 和 isInCart 状态 ---
    let currentProductPid = pd.pid;
    let isFav = false;
    for (let i = 0; i < that.data.lovelist.length; i++) {
      if (that.data.lovelist[i] && that.data.lovelist[i].pid === currentProductPid) {
        isFav = true;
        break;
      }
    }
    this.setData({ isFavorited: isFav });

    let isIn = false;
    for (let i = 0; i < that.data.cartlist.length; i++) {
      if (that.data.cartlist[i] && that.data.cartlist[i].pid === currentProductPid) {
        isIn = true;
        break;
      }
    }
    this.setData({ isInCart: isIn });
  },

  // 收藏/取消收藏按钮的事件方法
  doloveclick: function(e) {
    let that = this;
    console.log('doloveclick--->e-->',e)
    let pd_clicked = e.currentTarget.dataset.pd; 

    let currentLovelist = that.data.lovelist; // 直接获取data中的数组引用
    let isUserFavorited = that.data.isFavorited;
    let message = '';

    if (isUserFavorited) { // 当前是已收藏状态，执行取消收藏
      let indexToRemove = -1;
      for (let i = 0; i < currentLovelist.length; i++) {
        if (currentLovelist[i] && currentLovelist[i].pid === pd_clicked.pid) {
          indexToRemove = i;
          break;
        }
      }
      if (indexToRemove > -1) {
        currentLovelist.splice(indexToRemove, 1); //直接从数组中删除
      }
      isUserFavorited = false;
      message = '已取消收藏';
    } else { // 当前是未收藏状态，执行收藏
      // 检查是否已存在（尽管 isUserFavorited 应该是准的，但多一步检查更稳妥）
      let alreadyExists = false;
      for (let i = 0; i < currentLovelist.length; i++) {
          if (currentLovelist[i] && currentLovelist[i].pid === pd_clicked.pid) {
              alreadyExists = true;
              break;
          }
      }
      if (!alreadyExists) {
          currentLovelist.push(pd_clicked); 
      } else {
          console.warn("尝试收藏，但商品已在lovelist中:", pd_clicked.pid);
      }
      isUserFavorited = true;
      message = '收藏成功!';
    }

    // !!! 关键：必须通过 setData 更新 lovelist 和 isFavorited 状态以触发视图更新 !!!
    that.setData({
      lovelist: currentLovelist,
      isFavorited: isUserFavorited
    });

    wx.setStorageSync('lovelist', currentLovelist); // 保存到本地存储
    wx.showToast({
      title: message,
      icon: 'success', 
      duration: 2000
    });
  },

  // 添加到购物车的事件方法
  docartclick: function(e) {
    let that = this;
    let pd_clicked = e.currentTarget.dataset.pd;

    // 新功能：判断是否已在购物车中
    if (that.data.isInCart) {
      wx.showToast({
        title: '商品已在购物车中',
        icon: 'none',
        duration: 2000
      });
      return;
    }

    let currentCartlist = that.data.cartlist; // 直接获取data中的数组引用

    // 再次检查以确保（虽然 isInCart 应该已经判断了）
    let alreadyExistsInCart = false;
    for (let i = 0; i < currentCartlist.length; i++) {
        if (currentCartlist[i] && currentCartlist[i].pid === pd_clicked.pid) {
            alreadyExistsInCart = true;
            break;
        }
    }

    if (!alreadyExistsInCart) {
        currentCartlist.push(pd_clicked); // 直接 push
    } else {
        console.warn("尝试加入购物车，但商品已在cartlist中:", pd_clicked.pid);
    }


    // !!! 关键：必须通过 setData 更新 cartlist 和 isInCart 状态以触发视图更新 !!!
    that.setData({
      cartlist: currentCartlist,
      isInCart: true // 添加成功后，状态变为已在购物车
    });

    wx.setStorageSync('cartlist', currentCartlist); // 保存到本地存储
    wx.showToast({
      title: '添加购物车成功!',
      icon: 'success', 
      duration: 2000
    });
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
  
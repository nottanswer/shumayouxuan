
// pages/my/my.js
Page({
  data: {
    orderTypes: [
      { 
        name: '待付款', 
        icon: '/images/gouwu.png',
        path: '/pages/order/order?status=1' // 1表示待付款
      },
      { 
        name: '待发货', 
        icon: '/images/gouwu.png',
        path: '/pages/order/order?status=2' // 2表示待发货
      },
      { 
        name: '待收货', 
        icon: '/images/gouwu.png', 
        path: '/pages/shouhuo/shouhuo' // 直接跳转待收货页
      },
      { 
        name: '待评价', 
        icon: '/images/star_grey.png',
        path: '/pages/pingjia/pingjia' // 直接跳转评价页
      },
      { 
        name: '退换/售后', 
        icon: '/images/gouwuc.png',
        path: '/pages/tuihuo/tuihuo' // 跳转退货售后页
      }
    ],
    // 其他数据保持不变...
  },

  // 点击订单类型图标
  onOrderTypeClick: function(e) {
    const index = e.currentTarget.dataset.index;
    const path = this.data.orderTypes[index].path;
    
    if (path) {
      wx.navigateTo({
        url: path,
        success: () => {
          // 添加点击动画效果
          this.setData({
            [`orderTypes[${index}].animate`]: true
          });
          setTimeout(() => {
            this.setData({
              [`orderTypes[${index}].animate`]: false
            });
          }, 300);
        }
      });
    } else {
      wx.showToast({
        title: '功能开发中',
        icon: 'none'
      });
    }
  },

  // 其他方法保持不变...
})
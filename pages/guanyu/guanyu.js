// pages/about-us/about-us.js
Page({
  data: {
    teamMembers: [
      {
        id: 1,
        name: '张经理',
        position: '创始人/CEO',
        avatar: '/images/team1.jpg'
      },
      {
        id: 2,
        name: '李总监',
        position: '产品总监',
        avatar: '/images/team2.jpg'
      },
      {
        id: 3,
        name: '王经理',
        position: '技术总监',
        avatar: '/images/team3.jpg'
      },
      {
        id: 4,
        name: '赵主管',
        position: '运营主管',
        avatar: '/images/team4.jpg'
      }
    ]
  },

  onLoad: function(options) {
    // 页面加载时获取数据
    this.getCompanyInfo();
  }

  
})
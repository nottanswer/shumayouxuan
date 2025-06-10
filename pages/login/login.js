// index.js
Page({
  data: {
    uname: '',
    passwd: '',
    gender: '',
    address: '',
    sex:'',
  },
  backToLogin(){
  wx.navigateTo({
    delta:1
  });
},
   // 性别选择器变化事件
   bindGenderChange: function(e) {
    const selectedValue = e.detail.value;
    console.log('selectedValue-->',selectedValue)
    this.setData({
      gender: selectedValue
    });
    if(selectedValue==0){
      console.log('男');
      this.setData({
        sex:'男'
      });
    }else{
      console.log('女');
      this.setData({
        sex:'女'
      })
    }
  },

  // 注册按钮点击事件
  doRegister: function() {
    // 验证表单数据
    if (!this.data.uname || !this.data.passwd|| !this.data.gender ||!this.data.address){
      wx.showToast({
        title: '请填写完整信息',
        icon:'none'
      });
      return;
    }
    wx.setStorageSync('userInfo', {
      uname:this.data.uname,
      passwd:this.data.passwd,
      gender:this.data.gender,
      address:this.data.address,
      sex:this.data.sex
    });
   wx.showToast({
     title: '登录成功',
     icon:'success',
     duration:1500,
     success:()=>{
       setTimeout(()=>{
         wx.switchTab({
           url: '/pages/my1/my1'
         });
       },1500);
     }
   }) ;
   wx.navigateTo({
     url: '/pages/my1/my1'
   });
  },
  goToLogin:function(){
    wx.navigateTo({
      url: '/pages/my1/my1'
    });
  }
});
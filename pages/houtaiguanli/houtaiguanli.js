
// pages/houtailogin/houtailogin.js
Page({
  /**
   * 页面的初始数据
   */
  data: {
    username: '',
    password: '',
    usernameError: '',
    passwordError: '',
    showPassword: false,
    rememberMe: false,
    isLoading: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // 检查是否有保存的登录信息
    const savedUsername = wx.getStorageSync('rememberedUsername');
    if (savedUsername) {
      this.setData({
        username: savedUsername,
        rememberMe: true
      });
    }
  },

  /**
   * 用户名输入事件
   */
  onUsernameInput: function (e) {
    this.setData({
      username: e.detail.value,
      usernameError: ''
    });
  },

  /**
   * 密码输入事件
   */
  onPasswordInput: function (e) {
    this.setData({
      password: e.detail.value,
      passwordError: ''
    });
  },



  /**
   * 登录处理
   */
  login: function () {
    // 重置错误信息
    this.setData({
      usernameError: '',
      passwordError: ''
    });

    const { username, password, rememberMe } = this.data;
    
    // 验证输入
    let isValid = true;
    
    if (!username.trim()) {
      this.setData({
        usernameError: '请输入管理员账号'
      });
      isValid = false;
    }
    
    if (!password.trim()) {
      this.setData({
        passwordError: '请输入密码'
      });
      isValid = false;
    } else if (password.length < 6) {
      this.setData({
        passwordError: '密码长度至少为6位'
      });
      isValid = false;
    }
    
    if (!isValid) return;
    
    // 显示加载状态
    this.setData({
      isLoading: true
    });
    
    // 模拟登录请求
    setTimeout(() => {
      // 验证账号密码（预设：admin/admin123）
      if ((username === '20232023' && password === '20232023')) {
        // 保存记住的用户名
        if (rememberMe) {
          wx.setStorageSync('rememberedUsername', username);
        } else {
          wx.removeStorageSync('rememberedUsername');
        }
        
        // 登录成功
        wx.showToast({
          title: '登录成功',
          icon: 'success',
          duration: 1500
        });
        
        // 跳转到首页或其他页面
        setTimeout(() => {
          wx.navigateTo({
            url: '/pages/admin/products/products'
          });
        }, 1500);
      } else {
        // 登录失败
        this.setData({
          passwordError: '您无权访问页面',
          isLoading: false
        });
      }
    }, 1500);
  }
})
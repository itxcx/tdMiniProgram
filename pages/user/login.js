Page({
  data: {
    isShowPwd: false,
    isLogining: false,
    username: '',
    pwd: '',
    pwdFocus: false
  },
  // 用户名输入绑定事件，获得用户名
  onUserNameInput: function(e) {
    this.setData({
      username: e.detail.value
    });
  },
  // 密码输入绑定事件，获得密码
  onPwdInput: function(e) {
    this.setData({
      pwd: e.detail.value
    });
  },
  // 是否显示密码
  onTogglePwdType: function(e) {
    // 设置数据
    this.setData({
      isShowPwd: !this.data.isShowPwd,
      pwdFocus: true
    });

  },
  
  // 登录
  onLogin: function() {
    let username = this.data.username;
    let pwd = this.data.pwd;

    // 用户名为空
    if('' === username) {
      wx.showToast({
        title: '请输入用户名'
      });

      return;
    }

    //密码为空 
    if('' === pwd) {
      wx.showToast({
        title: '请输入密码'
      });

      return;
    } else if(pwd.length < 6) {
      wx.showToast({
        title: '密码至少应包含6位字符'
      });
      
     return;
    }

    // 设置数据
    this.setData({
      isLogining: true
    });
    // TODO:请求登录接口
    // wx.request();
  },

  //跳转至注册页面
  goRegister: function() {
    wx.navigateTo({
      url: '../user/registe'
    })
  },

  //跳转至忘记密码页面 
  goResetPwd: function() {
    wx.navigateTo({
      url: '../user/forgetpwd'
    })
  },

  onLoad: function () {
    
  }
})

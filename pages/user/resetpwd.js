//logs.js
var util = require('../../utils/util.js')
Page({
  data: {
    pwd: '',
    rePwd: '',
    isRequesting: false
  },
  // 新密码输入绑定事件，获得新密码
  onPwdInput: function(e) {
    this.setData({
      pwd: e.detail.value
    });
  },
  // 确认密码输入绑定事件，获得确认密码
  onRePwdInput: function(e) {
    this.setData({
      rePwd: e.detail.value
    });
  },
  onSubmit: function () {
    let data = this.data;
    let pwd = data.pwd;
    let rePwd = data.rePwd;
    let isRequesting = data.isRequesting;
    // 数据加载中
    if(isRequesting) return;

    // 验证密码
    if('' === pwd) {
      wx.showToast({
        title: '请输入新密码'
      });
      return;
    } else if(pwd.length < 6) {
      wx.showToast({
        title: '密码至少应包含6位字符'
      });
      return;
    }

    if('' === rePwd) {
      wx.showToast({
        title: '请输入密码'
      });
      return;
    }

    //验证密码是否一致
    if(pwd !== rePwd) {
      wx.showToast({
        title: '两次输入的密码不一致'
      });
      return;
    } 

    // TODO:请求接口
    // wx.request();
    this.setData({
      isRequesting: true
    });
     
  }
})

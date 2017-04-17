//logs.js
var util = require('../../utils/util.js')
Page({
  data: {
    isShowPwd: false,
    isShowInviter: false,
    phone: '',
    pwd: '',
    inveter: '',
    leftTime: -1
  },
   // 获得手机号码
  onPhoneInput: function(e) {
    this.setData({
      phone: e.detail.value
    });
  },
  // 获得密码
  onPwdInput: function(e) {
    this.setData({
      pwd: e.detail.value
    });
  },
  // 获得邀请人号码
  onInviterInput: function(e) {
    this.setData({
      inveter: e.detail.value
    });
  },
  // 获得验证码
  onVerificationInput: function(e) {
    this.setData({
      verificationCode: e.detail.value
    });
  },

  onToggleShowPwd: function(e) {
    let isShowPwd = false;

    // 获取类型
    let type = e.currentTarget.dataset && e.currentTarget.dataset.type;

    // 点击显示密码
    if('off' === type) isShowPwd = true;

    // 设置数据
    this.setData({
      isShowPwd: isShowPwd
    });
  },
  // 发送验证码
  onSendVerificateCode: function() {
    let that = this;
    // 验证手机号码
    let phoneNum = this.data.phone;
    // TODO:格式有误的样式待修改
    if(!util.checkPhoneNum(phoneNum)) {
      wx.showToast({
        title: '手机号格式有误'
      });
      return;
    }

    // 设置倒计时
    let leftTime = 60;
    this.setData({
      leftTime: leftTime
    });

    let si = setInterval(function countdown() {
      leftTime--;
      that.setData({
        leftTime: leftTime
      });
      // 倒计时结束
      if(leftTime < 0) {
        clearInterval(si);
      }
    }, 1000);
  },
  // 是否显示邀请人
  onToggleInviter: function() {
    this.setData({
      isShowInviter: !this.data.isShowInviter
    });
  },

  // 是否显示邀请人
  onToggleInviter: function() {
    this.setData({
      isShowInviter: !this.data.isShowInviter
    });
  },
  // 跳转至协议页面
  goAgreement: function() {

  },
  // 跳转至登录页面
  goLogin: function() {
     wx.navigateTo({
      url: '../user/login'
    })
  }
})

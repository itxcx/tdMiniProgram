let util = require('../../utils/util.js')
Page({
  data: {
    phone: '',
    verificationCode: '',
    leftTime: -1,
  },
  // 手机号码输入绑定事件，获得手机号码
  onPhoneInput: function(e) {
    this.setData({
      phone: e.detail.value
    });
  },
  // 验证码输入绑定事件，获得验证码
  onVerificationInput: function(e) {
    this.setData({
      verificationCode: e.detail.value
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

  // 下一步
  onNext: function() {
    let phoneNum = this.data.phone;
    let verificationCode = this.data.verificationCode;

    // 验证手机号码
    if('' === phoneNum) {
      wx.showToast({
        title: '请输入手机号码'
      });
      return;
    } else if(!util.checkPhoneNum(phoneNum)) {
      wx.showToast({
        title: '手机号格式有误'
      });
      return;
    }

    //验证码为空 
    if('' === verificationCode) {
      wx.showToast({
        title: '请输入验证码'
      });

      return;
    } else if(verificationCode.length < 6) {
      wx.showToast({
        title: '请输入正确的验证码'
      });
      
     return;
    }

    // TODO:请求接口
    // wx.request();
     wx.navigateTo({
      url: '../user/resetpwd'
    })
  },

  onLoad: function () {
    
  }
})

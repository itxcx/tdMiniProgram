let util = require('../../utils/util.js');

// 获取数据成功之后回到首页
function onBackHome() {
  // 修改密码成功之后回到首页
  if (!getCurrentPages) {
    util.toolTip.showToolTip('您的微信版本较低，请升级微信版本后查看');
    return;
  }
  
  let pageLength = getCurrentPages().length;
  wx.navigateBack({
    delta: pageLength
  });

  // 隐藏显示toast/loading
  wx.hideLoading();
}

Page({
  data: {
    phone: '',
    verifyCode: '',
    pwd: '',
    rePwd: '',
    leftTime: -1,
    isSendingCode: false,
    isRequesting: false
  },

  // 获得手机号码
  onPhoneInput: function(e) {
    this.setData({
      phone: e.detail.value
    });
  },

  // 获得验证码
  onVerifyInput: function(e) {
    this.setData({
      verifyCode: e.detail.value
    });
  },

  // 发送验证码
  onSendVerifyCode: function() {
    let that = this;

    if (this.data.isSendingCode) return; //正在请求数据中

    // 验证手机号码
    let phoneNum = this.data.phone;

    if (!util.checkPhoneNum(phoneNum)) {
      util.toolTip.showToolTip('手机号格式有误');
      return;
    }

    wx.showLoading({
      title: '加载中',
      mask: true
    });

    // 设置数据
    this.setData({
      isSendingCode: true
    });

    let timestamp = parseInt(+new Date() / 1000);
    let apiToken = util.cryptoJS.MD5('tuandai_xcx' + timestamp);

    let param = {
      "phone": phoneNum,
      "type": 2
    };

    // 加密
    param = util.encrypt(JSON.stringify(param), timestamp);
    util.request({
      url: util.domain + '/user/send-verify-code.html',
      data: {
        t: timestamp,
        api_token: apiToken,
        param: param
      },
      success: function(res) {
        let data = res.data;
        // 解密
        data = util.decrypt(data.data, data.t);
        if (200 === data.code) {
          // 设置倒计时
          let leftTime = 60;
          that.setData({
            leftTime: leftTime
          });

          let si = setInterval(function countdown() {
            leftTime--;
            that.setData({
              leftTime: leftTime
            });

            // 倒计时结束
            if (leftTime < 0) {
              clearInterval(si);
            }
          }, 1000);

        } else {
          util.toolTip.showToolTip(data.message || '网络异常，请稍后再试');
        }
      },
      fail: function(err) {
        util.toolTip.showToolTip('网络异常，请稍后再试');
      },
      complete: function() {
        wx.hideLoading();

        that.setData({
          isSendingCode: false
        });
      }
    });
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
  onSubmit: function() {
    let that = this;
    let phoneNum = this.data.phone;
    let verifyCode = this.data.verifyCode;
    let pwd = that.data.pwd;
    let rePwd = that.data.rePwd;
    // 数据加载中
    if (that.data.isRequesting) return;

    // 验证手机号码
    if ('' === phoneNum) {
      util.toolTip.showToolTip('请输入手机号码');
      return;
    } else if (!util.checkPhoneNum(phoneNum)) {
      util.toolTip.showToolTip('手机号格式有误');
      return;
    }

    //验证验证码 
    if ('' === verifyCode) {
      util.toolTip.showToolTip('请输入验证码');
      return;
    } else if (verifyCode.length < 6) {
      util.toolTip.showToolTip('请输入正确的验证码');
      return;
    }

    // 验证密码
    if ('' === pwd) {
      util.toolTip.showToolTip('请输入新密码');
      return;
    } else if (pwd.length < 6) {
      util.toolTip.showToolTip('密码至少应包含6位字符');
      return;
    }

    if ('' === rePwd) {
      util.toolTip.showToolTip('请确认密码');
      return;
    }

    //验证密码是否一致
    if (pwd !== rePwd) {
      util.toolTip.showToolTip('两次输入的密码不一致');
      return;
    }

    wx.showLoading({
      title: '加载中',
      mask: true
    });

    this.setData({
      isRequesting: true
    });


    let resetObj = {
      "phone": phoneNum,
      "verifyCode": verifyCode,
      "password": pwd,
      "confirmPassword": rePwd
    };

    let timestamp = parseInt(+new Date() / 1000);
    let apiToken = util.cryptoJS.MD5('tuandai_xcx' + timestamp);
    // 加密
    let param = util.encrypt(JSON.stringify(resetObj), timestamp);

    util.request({
      url: util.domain + '/user/forgot-password.html',
      data: {
        t: timestamp,
        api_token: apiToken,
        param: param
      },
      success: function(res) {
        let data = res.data;
        // 解密
        data = util.decrypt(data.data, data.t);
        if (200 === data.code) {
          wx.showToast({
            title: '密码更新成功',
            success: function() {
              setTimeout(function() {
                onBackHome();
              }, 1500);
            },
            fail: function() { //调用showToast失败
              onBackHome();
            }
          });
        } else {
          util.toolTip.showToolTip(data.message || '网络异常，请稍后再试');
          wx.hideLoading();
        }
      },
      fail: function(err) {
        util.toolTip.showToolTip('网络异常，请稍后再试');
        wx.hideLoading();
      },
      complete: function() {
        that.setData({
          isRequesting: false
        });
      }
    });

  },

  onShow: function() {
    util.toolTip.init(this);
  }
});
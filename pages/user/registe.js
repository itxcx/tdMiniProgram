var util = require('../../utils/util.js');

// 获取数据成功之后回到首页
function onBackHome(userToken) {
  // 保存token
  wx.setStorageSync('userToken', userToken);
  // 登录成功之后回到首页
  let pageLength = getCurrentPages().length;
  wx.navigateBack({
    delta: pageLength
  });

  // 隐藏显示toast/loading
  wx.hideLoading();
}

Page({
  data: {
    isShowPwd: false,
    isShowInviter: false,
    phone: '',
    pwd: '',
    verifyCode: '',
    inveter: '',
    leftTime: -1,
    isRequesting: false,
    isSendingCode: false
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
  onVerifyInput: function(e) {
    this.setData({
      verifyCode: e.detail.value
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
      "type": 1
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
  // 是否显示邀请人
  onToggleInviter: function() {
    this.setData({
      isShowInviter: !this.data.isShowInviter
    });
  },

  // 注册
  onRegister: function() {
    let that = this;

    if (this.data.isRequesting) return; //正在请求数据中

    let data = this.data;
    let phoneNum = data.phone;
    let pwd = data.pwd;
    let verifyCode = data.verifyCode;
    let inveter = data.inveter;

    // 判断手机格式
    if (!util.checkPhoneNum(phoneNum)) {
      util.toolTip.showToolTip('手机号格式有误');
      return;
    }

    //判断密码
    if ('' === pwd) {
      util.toolTip.showToolTip('请输入密码');
      return;
    } else if (pwd.length < 6) {
      util.toolTip.showToolTip('密码至少应包含6位字符');
      return;
    }

    if ('' === verifyCode) {
      util.toolTip.showToolTip('请输入验证码');
      return;
    } else if (verifyCode.length < 6) {
      util.toolTip.showToolTip('请输入正确的验证码');
      return;
    }

    if (inveter !== '' && !util.checkPhoneNum(inveter)) {
      util.toolTip.showToolTip('邀请人手机号格式有误');
      return;
    }

    wx.showLoading({
      title: '加载中',
      mask: true
    });

    // 设置数据
    this.setData({
      isRequesting: true
    });

    // 获取系统信息
    let sysInfo = wx.getSystemInfoSync();

    let timestamp = parseInt(+new Date() / 1000);
    let apiToken = util.cryptoJS.MD5('tuandai_xcx' + timestamp);

    let param = {
      "phone": phoneNum,
      "password": pwd,
      "verifyCode": verifyCode,
      "invitePhone": inveter,
      "deviceName": sysInfo.system.split(" ")[0] == "Android" ? "Android" : "Ios"
    };
    // 加密
    param = util.encrypt(JSON.stringify(param), timestamp);
    util.request({
      url: util.domain + '/user/register.html',
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
            title: '注册成功',
            success: function() {
              setTimeout(function() {
                onBackHome(data.data.userToken);
              }, 1500);
            },
            fail: function() { //调用showToast失败
              onBackHome(data.data.userToken);
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

  // 跳转至协议页面
  goAgreement: function() {
    wx.navigateTo({
      url: '../user/agreement'
    })
  },

  // 跳转至登录页面
  goLogin: function() {
    wx.navigateTo({
      url: '../user/login'
    });
  },
  onShow: function() {
    util.toolTip.init(this);
  }
});
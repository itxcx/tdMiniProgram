let util = require('../../utils/util.js');
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
  onSubmit: function() {
    let that = this;
    let pwd = that.data.pwd;
    let rePwd = that.data.rePwd;
    // 数据加载中
    if (that.data.isRequesting) return;

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

    let resetObj = wx.getStorageSync('resetObj');
    resetObj.password = pwd;
    resetObj.confirmPassword = rePwd;
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
                // 密码更新成功之后回到首页
                let pageLength = getCurrentPages().length;
                wx.navigateBack({
                  delta: pageLength
                });

                wx.hideLoading();
              }, 1500);
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
})
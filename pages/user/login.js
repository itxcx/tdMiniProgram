let util = require('../../utils/util.js');

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
    let that = this;

    if (this.data.isLogining) return; //正在登录中

    let username = this.data.username;
    let pwd = this.data.pwd;

    // 用户名为空
    if ('' === username) {
      util.toolTip.showToolTip('请输入用户名');
      return;
    } else if (username.length > 25) {
      util.toolTip.showToolTip('请输入正确的用户名');
      return;
    }

    //密码为空 
    if ('' === pwd) {
      util.toolTip.showToolTip('请输入密码');
      return;
    } else if (pwd.length < 6) {
      util.toolTip.showToolTip('密码至少应包含6位字符');
      return;
    }

    // 设置数据
    this.setData({
      isLogining: true
    });

    wx.showLoading({
      title: '加载中',
      mask: true
    });

    let timestamp = parseInt(+new Date() / 1000);
    let apiToken = util.cryptoJS.MD5('tuandai_xcx' + timestamp);

    let param = {
      "username": username,
      "password": pwd
    };
    // 加密
    param = util.encrypt(JSON.stringify(param), timestamp);
    // 请求登录
    util.request({
      url: util.domain + '/user/login.html',
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
            title: '登录成功',
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
          isLogining: false
        });
      }
    });
  },

  //跳转至注册页面
  goRegister: function() {
    wx.navigateTo({
      url: '../user/registe'
    });
  },

  //跳转至忘记密码页面 
  goResetPwd: function() {
    wx.navigateTo({
      url: '../user/forgetpwd'
    })
  },

  onShow: function() {
    util.toolTip.init(this);
  }
})
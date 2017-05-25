let util = require('../../utils/util.js');
Page({
  data: {
    isLogined: false,
    assetInfo: {
      totalFund: '--',
      dueIncome: '--'
    }
  },
  //跳转至登录页面
  goLogin: function() {
    wx.navigateTo({
      url: '../user/login'
    });
  },
  // 跳转至了解团贷网
  goAbout: function() {
    wx.navigateTo({
      url: '../about/index'
    });
  },
  // 跳转至关注微信公众号
  goConcernwx: function() {
    wx.navigateTo({
      url: '../concernwx/index'
    });
  },
  getData: function() { //获取用户数据
    let that = this;

    let timestamp = parseInt(+new Date() / 1000);
    let apiToken = util.cryptoJS.MD5('tuandai_xcx' + timestamp);
    // 获取userToken
    let userToken = wx.getStorageSync('userToken');

    if (!userToken || userToken === '') return; //如果没有userToken则不请求数据

    wx.showLoading({
      title: '加载中',
      mask: true
    });

    let param = {
      "user_token": userToken
    };
    // 加密
    param = util.encrypt(JSON.stringify(param), timestamp);
    // 请求用户数据
    util.request({
      url: util.domain + '/user/fund.html',
      data: {
        t: timestamp,
        api_token: apiToken,
        param: param.toString()
      },
      success: function(res) {
        let data = res.data;
        // 解密
        data = util.decrypt(data.data, data.t);
        if (200 === data.code) {
          that.setData({
            assetInfo: data.data,
            isLogined: true
          });
        } else if (401 !== data.code) {
          util.toolTip.showToolTip(data.message || '网络异常，请稍后再试');
        }
      },
      fail: function(err) {
        util.toolTip.showToolTip('网络异常，请稍后再试');
      },
      complete: function() {
        wx.hideLoading()
      }
    });
  },
  onShow: function() {
    this.getData();
    // 初始化 提示工具
    util.toolTip.init(this);
  }
})
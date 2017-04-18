//获取应用实例
var app = getApp()
Page({
  data: {
    isLogined: false,
    assetInfo: {
      total: '--',
      receivedIncome: '--'
    }
  },
  //跳转至登录页面
  goLogin: function() {
    wx.navigateTo({
      url: '../user/login'
    });
  },
  // 跳转至关注微信公众号
  goConcernwx: function() {
    wx.navigateTo({
      url: '../concernwx/index'
    });
  },
  onLoad: function () {
    console.log('onLoad')
   
  }
})

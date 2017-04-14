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
    })
  },

  onLoad: function () {
    console.log('onLoad')
   
  }
})

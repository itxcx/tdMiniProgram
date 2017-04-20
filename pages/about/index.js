//获取应用实例
var app = getApp()
Page({
  data: {
	isShowMore: false
  },
  onToggleText: function() {
  	this.setData({
      isShowMore: !this.data.isShowMore
    });
  },
  goMoreBackground: function() {
  	 wx.navigateTo({
      url: '../about/background'
    });
  }
})

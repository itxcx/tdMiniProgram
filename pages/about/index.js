//获取应用实例
var app = getApp()
Page({
  data: {
	isShowMore: false,
	partners: [{
		img: '../../images/about_gd1.png',
		desc: '“中国私募股权投资机构50强”第一名'
	},{
		img: '../../images/about_gd2.png',
		desc: '商界传奇人物史玉柱先生创办建立'
	},{
		img: '../../images/about_gd3.png',
		desc: '中国创业投资机构综合排名19强'
	},{
		img: '../../images/about_gd4.png',
		desc: '全国首批承销保荐机构之一'
	},{
		img: '../../images/about_gd5.png',
		desc: '高成长潜力股的创投机构'
	},{
		img: '../../images/about_gd6.png',
		desc: '国家高新技术企业'
	}]
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
  },
  goPartners:  function() {
	wx.navigateTo({
      url: '../about/partners'
    });
  }
})

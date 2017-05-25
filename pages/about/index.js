let util = require('../../utils/util.js');
Page({
  data: {
  	isShowMore: false,
  	gdList: [{
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
  	}],
    plateData: {}
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
  },
  goMoreSecurity:  function() {
  	wx.navigateTo({
      url: '../about/security'
    });
  },
  goRegiste: function() {
  	wx.navigateTo({
      url: '../user/registe'
    });
  },
  goConcernwx: function() {
  	wx.navigateTo({
      url: '../concernwx/index'
    });
  },
  getData: function() { //获取平台数据
    let that = this;
    let timestamp = +new Date();
    let apiToken = util.md5('tuandai_xcx' + timestamp);

    wx.showLoading({
      title: '加载中',
      mask: true
    });

    util.request({
      url: util.domain + '/about/plate-data.html',
      data: {
        t: timestamp,
        api_token: apiToken
      },
      success: function(res){
        let data = res.data;
        if(200 === data.code) {
          that.setData({
              plateData: data.data
            });
        } else {
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
    // 初始化 提示工具
    util.toolTip.init(this);
    
    this.getData();
  }
});

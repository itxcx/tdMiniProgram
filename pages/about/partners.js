let util = require('../../utils/util.js');
Page({
	data: {
		partners: []
	},
	getData: function() { //获取合作伙伴数据
		let that = this;
		let timestamp = +new Date();
		let apiToken = util.md5('tuandai_xcx' + timestamp);

		wx.showLoading({
			title: '加载中',
			mask: true
		});

		util.request({
			url: util.domain + '/about/partners.html',
			data: {
				t: timestamp,
				api_token: apiToken
			},
			success: function(res){
				let data = res.data;
				if(200 === data.code) {
					that.setData({
				      partners: data.data
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
	onLoad: function() {
		// 初始化 提示工具
    	util.toolTip.init(this);

		this.getData();
	}
})

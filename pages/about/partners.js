let util = require('../../utils/util.js');
Page({
	data: {
		partners: []
	},
	onLoad: function() {
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
					// TODO: taost res.msg
				}
			},
			fail: function(err) {
				// TODO: taost 网络异常，请稍后再试
			},
			complete: function() {
				wx.hideLoading()
			}

		});
	}
})

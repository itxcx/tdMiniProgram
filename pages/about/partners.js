let util = require('../../utils/util.js');
Page({
	data: {
		partners: []
	},
	getData: function() { //获取合作伙伴数据
		let that = this;
		let timestamp = parseInt(+new Date() / 1000);
		let apiToken = util.cryptoJS.MD5('tuandai_xcx' + timestamp);

		wx.showLoading && wx.showLoading({
			title: '加载中',
			mask: true
		});

		util.request({
			url: util.domain + '/about/partners.html',
			data: {
				t: timestamp,
				api_token: apiToken
			},
			success: function(res) {
				let data = res.data;
				// 解密
				data = util.decrypt(data.data, data.t);
				if (200 === data.code) {
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
				wx.hideLoading && wx.hideLoading()
			}

		});
	},
	onShow: function() {
		// 初始化 提示工具
		util.toolTip.init(this);

		this.getData();
	}
})
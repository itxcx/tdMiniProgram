let md5 = require('./md5.js');
let toolTip = require('./toolTip/toolTip.js');

// 检查手机号码是否有效
function checkPhoneNum(number) {
  let reg = /^1(3|4|5|7|8)\d{9}$/;
  return reg.test(number) ? true : false;
}

// 请求数据
function request(params) {
  // 设置header的contentType
  params.header = params.header || {};
  params.header['content-type'] = params.header['content-type'] || 'application/x-www-form-urlencoded';
  
  params.method = params.method || 'POST';

  wx.request(params)
}

// 请求域名
let domain = 'https://bbs5.tuandai.com';  //dev

module.exports = {
  checkPhoneNum: checkPhoneNum,
  request: request,
  domain: domain,
  md5: md5, //md5加密库
  toolTip: toolTip //提示组件
}

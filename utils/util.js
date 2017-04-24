let md5 = require('./md5.js');
function formatTime(date) {
  var year = date.getFullYear()
  var month = date.getMonth() + 1
  var day = date.getDate()

  var hour = date.getHours()
  var minute = date.getMinutes()
  var second = date.getSeconds()


  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

function formatNumber(n) {
  n = n.toString()
  return n[1] ? n : '0' + n
}

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
  formatTime: formatTime,
  checkPhoneNum: checkPhoneNum,
  request: request,
  domain: domain,
  md5: md5
}

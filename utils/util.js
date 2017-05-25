let cryptoJS = require('./crypto-js.js');
let toolTip = require('./toolTip/toolTip.js');
let code = 'rWyV2IRCn5iGykkscWSqgex8dzlmSG4gZ64XfnnSFjikrfyw';
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

// 获取加解密key
function getKey(timestamp) {
  return cryptoJS.MD5(code + timestamp).toString().toLocaleLowerCase();
}

// 加密 3des/ECB/PKCS7
function encrypt(input, timestamp) {
  return cryptoJS.TripleDES.encrypt(input,
    cryptoJS.enc.Utf8.parse(getKey(timestamp)), {
      mode: cryptoJS.mode.ECB,
      padding: cryptoJS.pad.Pkcs7
    });
}

// 解密 3des/ECB/PKCS7
function decrypt(input, timestamp) {
  var decryptData = cryptoJS.TripleDES.decrypt(input, cryptoJS.enc.Utf8.parse(getKey(timestamp)), {
    mode: cryptoJS.mode.ECB,
    padding: cryptoJS.pad.Pkcs7
  });

  return JSON.parse(decryptData.toString(cryptoJS.enc.Utf8));
}

// 请求域名
let domain = 'https://bbs5.tuandai.com'; //dev

module.exports = {
  checkPhoneNum: checkPhoneNum,
  request: request,
  domain: domain,
  encrypt: encrypt,
  decrypt: decrypt,
  cryptoJS: cryptoJS, //加密库
  toolTip: toolTip //提示组件
}
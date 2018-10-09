import regex from './regex';

// 验证是否是真实姓名
function isRealName(rule, value, callback) {
  !value && callback('请输入真实姓名');
  !regex.realName.test(value) && callback('请输入正确的姓名');
  callback();
}

// 验证身份证号码
function isCertNo(rule, value, callback) {
  !value && callback('请输入身份证号码');
  !regex.certNo.test(value) && callback('请输入正确的身份证号码');
  callback();
}

// 验证手机号
function isCNCell(rule, value, callback) {
  !value && callback('请再次输入手机号');
  !regex.cell.test(value) && callback('请输入正确的手机号');
  callback();
}

export default {
  isRealName,
  isCertNo,
  isCNCell
}
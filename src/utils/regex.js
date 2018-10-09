/* eslint-disable no-useless-escape */

export default {
  //字符验证，支持字母、数字和特殊字符（仅限!@#$%^&*())
  password: /^[a-zA-Z0-9\!\@\#\$\_\.\%\^\&\*\(\)]+$/,

  // 手机号
  cell: /^(13[0-9]|14[579]|15[0-3,5-9]|16[6]|17[0135678]|18[0-9]|19[89])\d{8}$/,

  // 中文
  chinese: /^[\u4E00-\u9FA5]+$/,

  // 中英文数字
  notSymbol: /^[a-zA-Z0-9\u4e00-\u9fa5]+$/,

  // 正整数
  positiveInteger: /^[1-9]\d*$/,

  // 两位小数
  twoDigitNumber: /^[0-9]+([.]\d{1,2})?$/,

  // 中英文姓名
  reallyName: /^[a-zA-Z\u4e00-\u9fa5]+$/,
  
  // 真实姓名
  realName: /^(\s)*([\u4e00-\u9fa5]+[．.·•]{0,1}[\u4e00-\u9fa5]+)+(\s)*$/,

  // 身份证号码
  certNo: /(^\d{15}$)|(\d{17}(?:\d|x|X)$)/,

  // 银行卡号
  bankCard: /^\d{16,19}$/,

  // 纯数字
  number: /^[0-9]*$/
}

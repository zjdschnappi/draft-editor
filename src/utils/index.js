import tool from './tool';
import date from './date-helper';
import http from './http-helper';
import error from './error-helper';
import regex from './regex';
import validator from './validator';

/**
 * 注意:
 * 如果不是使用很频繁的方法,用上面的形式引入
 * 下面这些方法是使用比较频繁的一些方法
 */
/* eslint-disable no-undef */

export const refresh = () => {
  window.location.reload();
};

export const getResourcePath = (name) => {
  return `${CONFIG.resourcePath}${name}`;
};

export const getFrontPath = (name) => {
  return `${CONFIG.frontPath}${name}`;
};

// 根据用户id找到用户头像
export const getUserLogo = (userId) => {
  return `${CONFIG.frontPath}/user/userLogoUrl.htm?userId=${userId}`;
};

/**
 * 动态引入图片
 *
 * @param {string} name
 * @returns
 */
export const getImg = (name) => {
  let img = require(`img/${name}`);
  if (img.indexOf('data:image') > -1) {
    return img;
  } else if (window.location.port === '9090') {
    return `http://localhost:9090/static/images/${name}`;
  } else {
    return `${CONFIG.resourcePath}/images/${name}`;
  }
};

/**
 * @description 错误信息处理
 */
export const getError = error.getError;
export const getErrorCode = error.getErrorCode;
export const showErrorModal = error.showErrorModal;
export const showErrorMessage = error.showErrorMessage;

/**
 * @description 请求数据方法
 */
export const request = http.request;
export const get = http.get;
export const post = http.post;
export const upload = http.upload;
export const uploadFile = http.uploadFile;

/**
 * ================
 * 开发环境调试用功能
 * ================
 */

/*eslint-disable no-console */
export const log = (...args) => {
  if (process.env.NODE_ENV === 'development') {
    console.log(...args);
  }
};

export const logError = (...args) => {
  if (process.env.NODE_ENV === 'development') {
    console.error(...args);
  }
};

export default (window.T = {
  // 工具
  tool,
  date,
  regex,
  error,
  validator,
  // 刷新页面
  refresh,
  // 路径
  getResourcePath,
  getFrontPath,
  getUserLogo,
  getImg,
  // 请求
  request,
  get,
  post,
  upload,
  uploadFile,
  // 错误信息
  getError,
  getErrorCode,
  showErrorModal,
  showErrorMessage,
  // 调试
  log,
  logError,
});

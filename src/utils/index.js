import tool from './tool';
import date from './date-helper';
import error from './error-helper';
import regex from './regex';
import validator from './validator';

/**
 * @description 错误信息处理
 */
export const getError = error.getError;
export const getErrorCode = error.getErrorCode;
export const showErrorModal = error.showErrorModal;
export const showErrorMessage = error.showErrorMessage;

/**
 * ================
 * 开发环境调试用功能
 * ================
 */

/*eslint-disable */
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

  // 错误信息
  getError,
  getErrorCode,
  showErrorModal,
  showErrorMessage,
  // 调试
  log,
  logError
});

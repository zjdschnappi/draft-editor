import axios from 'axios';
import qs from 'qs';
/**
 * @example <caption>请求数据方法</caption>
 * T.request(config).then();
 *
 * @param {object} config - 参数,格式与axios的一致
 *
 * @returns
 */
const request = (config, callback = null) => {
  const CancelToken = axios.CancelToken;
  return axios(Object.assign({
    method: 'get',
    cancelToken: new CancelToken(function executor(c) {
      if (callback) {
        callback(c);
      }

    })
  }, config));
}

/**
 * @example <caption>get请求数据方法</caption>
 * T.get(url, data).then();
 *
 * @param {string} url - 路径
 * @param {object} data - 参数
 *
 * @returns
 */
const get = (url, params = {}, withCredentials = false) => {
  return axios({
    method: 'GET',
    url,
    params: params,
    withCredentials: withCredentials
  });
}

/**
 * @example <caption>post请求数据方法</caption>
 * T.post(url, data).then();
 *
 * @param {string} url - 路径
 * @param {object} data - 参数
 *
 * @returns
 */

const post = (url, data = {}, withCredentials = false) => {
  return axios({
    method: 'POST',
    headers: {
      'content-type': 'application/x-www-form-urlencoded'
    },
    withCredentials,
    data: qs.stringify(data),
    url
  });
}

/**
 * @example <caption>上传数据方法</caption>
 * T.upload(url, form).then();
 *
 * @param {string} url - 路径
 * @param {object} data - 参数
 *
 * @returns
 */
const upload = (url, form, withCredentials = false) => {
  let _formData = new FormData(form);

  return axios.post(url, _formData, {
    headers: {
      'Content-Type': 'multipart/form-data'
    },
    withCredentials
  });
}

/**
 * @example <caption>上传数据方法</caption>
 * T.upload(url, form).then();
 *
 * @param {string} url - 路径
 * @param {object} data - 参数
 *
 * @returns
 */
const uploadFile = (url, option={}, withCredentials = false) => {
 
  const formData = new FormData();
  const file = option.file;
  formData.append('fileItem', file, file.name);
  formData.append('name', file.name);
  formData.append('type', file.type);
  formData.append('lastModifiedDate', file.name);
  formData.append('size', file.size);

  return axios.post(url, formData, {
    headers: {
      'Content-Type': 'multipart/form-data'
    },
    withCredentials
  });
}


axios.defaults.timeout = 10000;

export default {
  request,
  get,
  post,
  upload,
  uploadFile
}

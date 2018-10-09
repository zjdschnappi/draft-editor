/**
 * 获取url中的参数
 *
 * @param {String} name 要获取的参数名
 */
const getQueryString = (name) => {
  var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)', 'i');
  var r = window.location.search.substr(1).match(reg);
  if (r != null) return unescape(r[2]);
  return '';
};

/**
 * 防抖
 * 触发完事件 n 秒内不再触发事件,一般用在事件频繁触发的情况
 *
 * @param {*} func 回调函数
 * @param {*} wait 等待时间
 * @param {*} immediate  是否立即执行
 */
const debounce = (func, wait, immediate) => {
  let timeout, result;

  const debounced = function() {
    let context = this;
    let args = arguments;

    if (timeout) clearTimeout(timeout);
    if (immediate) {
      // 如果已经执行过，不再执行
      let callNow = !timeout;
      timeout = setTimeout(function() {
        timeout = null;
      }, wait);
      if (callNow) result = func.apply(context, args);
    } else {
      timeout = setTimeout(function() {
        func.apply(context, args);
      }, wait);
    }
    return result;
  };

  debounced.cancel = function() {
    clearTimeout(timeout);
    timeout = null;
  };

  return debounced;
};

// 节流
const throttle = function(fn, delay) {
  let timer = null;
  return function() {
    let context = this,
      args = arguments;
    clearTimeout(timer);
    timer = setTimeout(function() {
      fn.apply(context, args);
    }, delay);
  };
};

// html编码
const HTMLEncode = (html) => {
  var temp = document.createElement('div');
  temp.textContent != null ? (temp.textContent = html) : (temp.innerText = html);
  var output = temp.innerHTML;
  temp = null;
  return output;
};
//编辑器字数
const getEditorTextLength = (contentState) => {
  if (!contentState) return 0;
  let entities = [];
  contentState.getBlockMap().forEach((block) => {
    block.findEntityRanges((character) => {
      if (character.getEntity() !== null) {
        entities.push(contentState.getEntity(character.getEntity()));
      }
    });
  });

  let contentText = contentState.getPlainText();
  let contentTextLength = contentText.trim().length;

  let mediaLength = 0;

  for (let i = 0; i < entities.length; i++) {
    let item = entities[i];
    let type = entities[i]['type'];
    if (type === 'IMAGE') {
      //如果是上传的图片  去四个字长度
      mediaLength += 4;
    } else if (type === 'EMOJI') {
      //如果是表情  和alt字数相等
      mediaLength += item.data.name.length;
      //纯文本里有"🥰"是表情的占位符号 要去掉
      contentTextLength = contentTextLength - 2;
    }
  }

  return mediaLength + contentTextLength;
};
//过滤unicode字符
const filterUnicode = (text) => {
  if (!text) return '';
  return text.replace(
    /([\uE000-\uF8FF]|\uD83C[\uDC00-\uDFFF]|\uD83D[\uDC00-\uDFFF]|[\u2580-\u27BF]|\uD83E[\uDD10-\uDDFF])/g,
    ''
  );
};
const escapeCodeToTag = (text) => {
  if (!text) {
    return '';
  }
  return text
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&amp;/g, '&')
    .replace(/&quot;/g, '"');
};
const escapeTagToCode = (text) => {
  if (!text) {
    return '';
  }
  return text
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/&/g, '&amp;')
    .replace(/"/g, '&quot;');
};
export default {
  getQueryString,
  debounce,
  throttle,
  HTMLEncode,
  getEditorTextLength,
  filterUnicode,
  escapeCodeToTag,
  escapeTagToCode
};

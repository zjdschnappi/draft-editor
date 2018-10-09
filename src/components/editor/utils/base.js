export const UniqueIndex = () => {
  return new Date().valueOf();
};
export const filterUnicode = (text) => {
  if (!text) return '';
  return text.replace(
    /([\uE000-\uF8FF]|\uD83C[\uDC00-\uDFFF]|\uD83D[\uDC00-\uDFFF]|[\u2580-\u27BF]|\uD83E[\uDD10-\uDDFF])/g,
    ''
  );
};

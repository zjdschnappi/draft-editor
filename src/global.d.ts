// utils
declare namespace T {
  function refresh()
  // 获取资源地址
  function getResourcePath(name: string): string
  function getFrontPath(name: string): string
  function getUserLogo(userId: string): string
  function getImg(name: string): string

  // 数据请求
  function request(config: object)
  function get(url: string, data: object)
  function post(url: string, data: object)
  function upload(url: string, form)

  // 捕获错误
  function getError(data: object)
  function getErrorCode(data: object)
  function showErrorModal(data: object)
  function showErrorMessage(data: object)

  // 调试
  function log(...args)
  function logError(...args)

  declare namespace date {
    function getNow()
    function format()
    function getSubjectTime(gmtCreate: string)
  }
  declare namespace tool {
    function throttle(fn: function, delay: number)
    function HTMLEncode(html: string)
  }
}

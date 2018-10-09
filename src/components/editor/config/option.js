// const unicodeEmojiMap = {
//   '😃': 'normal.png',
//   '😎': 'deyi.png',
//   '👻': 'xjbt.png',
//   '🙏': 'baituo.png',
//   '😭': 'ku.png',
//   '🤔': 'koubi.png',
//   '🤣': 'xiaozheku.png',
//   '💚': 'chiguaqunzhong.png',
//   '😍': 'xihuan.png',
//   '😈': 'shengqi.png',
//   '😱': 'jingya.png',
//   '🤕': 'dalian.png',
//   '💯': 'hongdan.png',
//   '🖤': 'heidan.png',
//   '🚩': 'guoqi.png',
//   '👍': 'lihai.png',
//   '✌️': 'v5.png',
//   '💛': 'huangpai.png',
//   '❤️': 'hongpai.png',
//   '😞': 'jinqiu.png',
//   '🏄': 'guihua.png',
//   '🔪': 'dao.png',
//   '✋': 'jushou.png',
//   '💡': 'mingdeng.png',
//   '🍖': 'luchuan.png',
//   '🍗': 'jitui.png',
//   '🍺': 'pijiu.png',
//   '🈸': 'guo.png',
//   '🉑': 'zu.png',
//   '🉐': 'bi.png',
//   '🈺': 'sheng.png',
//   '🈹': 'jia.png',
//   '🈶': 'you.png',
//   '🀄': 'hongzhong.png',
//   '💗': 'facai.png',
//   '🎒': 'hongbao.png',
//   '🏀': 'lanqiu.png',
//   '⚽': 'zuqiu.png',
//   '💣': 'zhadan.png',
//   '🐕': 'wenrugou.png',
//   '🙌': 'qingzhu.png',
//   '😠': 'mmp.png',
//   '🔮': 'jiaqiu.png',

// };
// let emojiUnicodeMap = {};
// Object.keys(unicodeEmojiMap).forEach(item => {
//   Object.assign(emojiUnicodeMap, {
//     [unicodeEmojiMap[item]]: item
//   })
// });
export default {
  height: 430,
  onChange: () => {},
  placeholder: '请输入内容',
  disabled: false,
  needFormatEmoji: true,
  showContentLength: false,
  contentLength: 5000,
  foreColors: [
    '#c00000',
    '#ff0000',
    '#ffc000',
    '#ffff00',
    '#92d050',
    '#00b050',
    '#00b0f0',
    '#0070c0',
    '#002060',
    '#7030a0',
    '#000'
  ],
  backColors: ['#ff9595', '#ffba80', '#fafa4b', '#bbf57c', '#7cf2a1', '#acebff', '#9ec9ff', '#d4aeff', '#fff'],
  emojis: {
    normal: [
      { name: '默认', url: 'normal.png' },
      { name: '得意', url: 'dy.png' },
      { name: 'XJBT', url: 'xjbt.png' },
      { name: '拜托', url: 'bt.png' },
      { name: '哭', url: 'cry.png' },
      { name: '抠鼻', url: 'kb.png' },
      { name: '笑着哭', url: 'xzk.png' },
      { name: '吃瓜群众', url: 'cgqz.png' },
      { name: '喜欢', url: 'like.png' },
      { name: '生气', url: 'angry.png' },
      { name: '惊讶', url: 'jy.png' },
      { name: '打脸', url: 'dl.png' },
      { name: '红单', url: 'hongdan.png' },
      { name: '黑单', url: 'heidan.png' },
      { name: '国旗', url: 'guoqi.png' },
      { name: '厉害', url: 'good.png' },
      { name: 'v5', url: 'v5.png' },
      { name: '黄牌', url: 'yc.png' },
      { name: '红牌', url: 'rc.png' },
      { name: '进球', url: 'goal.png' },
      { name: '跪滑', url: 'guihua.png' },
      { name: '刀', url: 'knife.png' },
      { name: '举手', url: 'js.png' },
      { name: '明灯', url: 'md.png' },
      { name: '撸串', url: 'lc.png' },
      { name: '鸡腿', url: 'chicken.png' },
      { name: '啤酒', url: 'beer.png' },
      { name: '国', url: 'guo.png' },
      { name: '足', url: 'zu.png' },
      { name: '必', url: 'bi.png' },
      { name: '胜', url: 'sheng.png' },
      { name: '加', url: 'jia.png' },
      { name: '油', url: 'you.png' },
      { name: '红中', url: 'hongzhong.png' },
      { name: '发财', url: 'facai.png' },
      { name: '红包', url: 'coupon.png' },
      { name: '篮球', url: 'lq.png' },
      { name: '足球', url: 'zq.png' },
      { name: '炸弹', url: 'boom.png' },
      { name: '稳如狗', url: 'wrg.png' },
      { name: '庆祝', url: 'qz.png' },
      { name: 'mmp', url: 'mmp.png' },
      { name: '假球', url: 'jiaqiu.png' }
    ]
  },
  // unicodeEmojiMap,
  // emojiUnicodeMap,
  toolbarList: [
    {
      key: 'face',
      type: 'dropdown',
      name: '表情'
    },
    {
      key: 'img',
      type: 'dropdown',
      name: '图片'
    },
    // {
    //   key: 'project',
    //   type: 'dropdown',
    //   name: '选单'
    // },
    // {
    //     key:'race',
    //     name:'赛事'
    // },
    // {
    //     key:'at',
    //     name:'@'
    // },
    {
      key: 'divider',
      type: 'icon',
      name: '分隔线'
    },
    {
      key: 'foreColor',
      type: 'dropdown',
      name: '颜色'
    },
    {
      key: 'bold',
      type: 'style',
      name: '加粗'
    },
    {
      key: 'backColor',
      type: 'dropdown',
      name: '底色'
    },
    {
      key: 'removeFormat',
      type: 'style',
      name: '清除格式'
    }
    // {
    //   key: 'undo',
    //   type: 'style',
    //   name: '撤销'
    // },
    // {
    //   key: 'redo',
    //   type: 'style',
    //   name: '前进'
    // }
  ]
};

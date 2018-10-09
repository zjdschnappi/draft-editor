# 系统文档

## 运行项目

```
npm run dev         // 开发
npm run build       // 编译
```

## 编码规范

### css 规范

- 类名使用小写字母，以中划线分隔(如：`top-item` `main-box` `box-list-item-1` )
- id 采用驼峰式命名
- less 中的变量、函数、混合、placeholder 采用驼峰式命名

### js 规范

- 标准变量采用驼峰式命名(如：`firstName` `topBoxList` `footerCopyright` )(**注意:不要用拼音首字母命名,用英文单词命名**)
- 常量全大写，用下划线连接
- react 声明组件,首字母必须大写,其它按照驼峰命名(如: `NoticeIcon`)

## 注意事项

**如果在某些地方需要使用 eslint 检测不通过的方法,可以在代码中加入以下注释跳过检测**

```js
/* eslint-disable no-undef */
```

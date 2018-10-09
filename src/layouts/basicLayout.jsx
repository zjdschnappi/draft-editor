import React from 'react';
import ReactDOM from 'react-dom';
const { DropDown, Icon, LocaleProvider, zh_CN, Avatar } = window.antd;

class BasicLayout extends React.Component {
  render() {
    return (
      <ul className="layout-header">
        <li className="header-item"><a href="">KK部落</a></li>
        <li className="header-item"><a href="">发话题</a></li>
        <li className="header-item"><a href="">部落</a></li>
        <li className="header-item"><a href="">个人中心</a></li>
        <li className="header-item"><a href="">部落号</a></li>
        <li className="header-item">
          <Avatar shape="square" icon="user" />
          <p>金牌讲解员</p>
          <Icon type="down" />
        </li>
      </ul>
    )
  }
}

export default BasicLayout;

// ReactDOM.render(
//   <LocaleProvider locale={zh_CN}>
//     <BasicLayout />
//   </LocaleProvider>,
//   document.getElementById('root')
// )
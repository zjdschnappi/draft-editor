import React from 'react';
import Dropdown from '../dropDown';
import { convertToRaw } from 'draft-js';
const { DatePicker, message } = window.antd;
export default class ProjectPicker extends React.Component {
  state = {
    visible: false,
    fileList: []
  };
  shouldComponentUpdate(nextProps, nextState) {
    if (!this.state.visible && this.state.visible === nextState.visible) {
      return false;
    }
    return true;
  }
  getEditorProjectsLength = () => {
    let map = convertToRaw(this.props.editorState.getCurrentContent()).entityMap;
    let projectLength = 0;
    for (let i in map) {
      if (map[i]['type'] === 'PROJECT') {
        projectLength++;
      }
    }
    return projectLength;
  };
  renderOverlay = () => {
    return (
      <div ref={(ref) => (this.pickerRef = ref)}>
        <div className="project-header">
          <label>查询时间：</label>
          <DatePicker size="small" getCalendarContainer={() => this.pickerRef} />
        </div>
        <div className="project-content">
          <table className="table" cellSpacing="0" cellPadding="0">
            <colgroup>
              <col width="35px" />
              <col width="60px" />
              <col width="65px" />
              <col width="70px" />
              <col width="70px" />
              <col width="65px" />
              <col width="65px" />
              <col width="65px" />
              <col width="65px" />
            </colgroup>
            <thead className="">
              <tr>
                <th>&nbsp;</th>
                <th>彩种</th>
                <th>期号</th>
                <th>发起人</th>
                <th>发起时间</th>
                <th>方案金额</th>
                <th>方案奖金</th>
                <th>我的认购</th>
                <th>我的奖金</th>
                <th>中奖状态</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td colSpan="10" className="no-data">
                  暂无记录
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className="project-footer">
          <button className="ant-btn btn-cancel" type="button" onClick={this.closePicker}>
            取消
          </button>
          <button className="ant-btn btn-ok" type="button" onClick={() => this.insertProject()}>
            插入方案
          </button>
        </div>
      </div>
    );
  };
  insertProject = () => {
    let length = this.getEditorProjectsLength();
    if (length > 0) {
      message.error('最多只能插入一个方案');
      return;
    }
    this.props.editor.insertProject({ purchaseNo: 3214324234325235235 });
    this.closePicker();
  };
  closePicker = () => {
    this.setState({
      visible: false
    });
  };
  onVisibleChange = (visible) => {
    this.setState({
      visible
    });
  };
  render() {
    const { pickerItem } = this.props;
    return (
      <Dropdown
        trigger={['click']}
        visible={this.state.visible}
        onVisibleChange={this.onVisibleChange}
        overlayClassName="editor-dialog editor-project-dialog"
        overlay={this.renderOverlay()}
        animation="slide-down"
      >
        <li className="toolbar-li">
          <i className={`i-block toolbar-i i-${pickerItem.key}`} />
          <span className="i-block v-middle">{pickerItem.name}</span>
        </li>
      </Dropdown>
    );
  }
}

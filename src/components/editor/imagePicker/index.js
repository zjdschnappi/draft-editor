import Dropdown from '../dropDown';
import { UniqueIndex } from '../utils/base';
import { convertToRaw } from 'draft-js';
const { message } = window.antd;
export default class ImagePicker extends React.Component {
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
  getEditorImgsLength = () => {
    let map = convertToRaw(this.props.editorState.getCurrentContent()).entityMap;
    let imgLength = 0;
    for (let i in map) {
      if (map[i]['type'] === 'IMAGE') {
        imgLength++;
      }
    }
    return imgLength;
  };
  renderOverlay = () => {
    return (
      <div className="">
        <ul className="img-header">
          <li className="img-header-li">本地上传</li>
        </ul>
        <div className="img-list-wrap">
          <span className="upload-info">最多上传5张图片，单张图片请小于5M</span>
          <ul className="img-list clearfix">
            {this.state.fileList.map((item) => {
              return (
                <li className="img-list-li" key={item.key}>
                  <img className="img" src={item.url} alt={item.fileName} />
                  <span className="mask" />
                  <i className="anticon anticon-delete" title="删除" onClick={() => this.deleteImg(item.key)} />
                </li>
              );
            })}
            {this.state.fileList.length + this.getEditorImgsLength() < 5 ? (
              <li className="img-list-li img-add-btn">
                <form
                  action="/imageTempUpload.htm"
                  method="post"
                  encType="multipart/form-data"
                  ref={(ref) => (this.uploadImageForm = ref)}
                >
                  <span className="i-add">+</span>
                  添加图片
                  <input
                    className="input-file-hide"
                    type="file"
                    accept="image/gif,image/png,image/jpeg"
                    name="uploadimage"
                    onChange={this.fileChange}
                  />
                </form>
              </li>
            ) : null}
          </ul>
        </div>
        <div className="img-footer">
          <button className="ant-btn btn-cancel" type="button" onClick={this.closePicker}>
            取消
          </button>
          <button className="ant-btn btn-ok" type="button" onClick={this.insertImg}>
            插入
          </button>
        </div>
      </div>
    );
  };
  insertImg = () => {
    if (!this.state.fileList.length) return;

    this.props.editor.insertMedia(this.state.fileList);
    this.closePicker();
    this.clearImgList();
  };
  deleteImg = (key) => {
    let list = this.state.fileList.filter((item) => item.key !== key);
    this.setState({
      fileList: list
    });
  };
  clearImgList = () => {
    this.setState({
      fileList: []
    });
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
  fileChange = (e) => {
    let dom = e.target;
    if (this.getInputFileSize(dom) > 5 * 1024 * 1024) {
      message.error('图片尺寸不能大于5兆');
      return;
    }

    this.uploadImage(this.uploadImageForm);

    e.target.value = null;
  };
  uploadImage = (form) => {
    T.upload(CONFIG.weiboFrontPath + '/imageTempUpload.json', form, true).then(({ data }) => {
      if (data.success === true) {
        this.setState({
          fileList: [
            ...this.state.fileList,
            {
              url: data.url,
              name: data.fileName,
              type: 'IMAGE',
              key: UniqueIndex()
            }
          ]
        });
      } else {
        T.showErrorModal(data);
      }
    });
    // e.preventDefault();
  };
  getInputFileSize = (_input) => {
    let _val = _input.value;

    // 如果不是图片，返回 -1
    if (!/.(gif|jpg|jpeg|png)$/.test(_val.toLowerCase())) {
      return -1;
    }
    // 如果支持 html5的
    if (_input.files) {
      return _input.files[0].size;
    } else {
      return -1;
    }
  };
  render() {
    const { pickerItem } = this.props;
    return (
      <Dropdown
        trigger={['click']}
        visible={this.state.visible}
        onVisibleChange={this.onVisibleChange}
        overlayClassName="editor-dialog editor-image-dialog"
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

import Dropdown from '../dropDown';
const emojiUrlPrefix = CONFIG.resourcePath + '/images/emojis';

export default class EmojiPicker extends React.Component {
  state = {
    visible: false
  };
  shouldComponentUpdate(nextProps, nextState) {
    if (!this.state.visible && this.state.visible === nextState.visible) {
      return false;
    }
    return true;
  }
  renderEmojiHeader = () => {
    let object = this.props.emojis;
    return Object.keys(object).map((item, index) => {
      let it = object[item][0];
      return (
        <li className={`emoji-pkg ${index === 0 ? 'active' : ''}`} key={it.name}>
          <img src={`${emojiUrlPrefix}/${it.url}`} alt={it.name} title={it.name} />
        </li>
      );
    });
  };
  renderEmojiList = () => {
    let list = this.props.emojis['normal'];
    return list.map((item, index) => {
      if (index === 0) {
        return null;
      }
      return (
        <li className="emoji-li" key={item.name} onClick={() => this.selectEmoji(item)}>
          <img src={`${emojiUrlPrefix}/${item.url}`} alt={item.name} title={item.name} />
        </li>
      );
    });
  };
  selectEmoji = (item) => {
    this.props.editor.insertEmoji({
      url: item.url,
      name: item.name,
      // emojiString: `<emotion image_name=${item.url} image_alt=${item.name}>${item.name}</emotion>`,
      emojiString: '🥰'
    });
    this.closePicker();
  };
  renderOverlay = () => {
    return (
      <div className="">
        <div className="emoji-header">
          <ul className="emoji-header-list clearfix">{this.renderEmojiHeader()}</ul>
        </div>
        <div className="emoji-content">
          <ul className="emoji-list clearfix">{this.renderEmojiList()}</ul>
        </div>
      </div>
    );
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
        overlayClassName="editor-dialog editor-emoji-dialog"
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

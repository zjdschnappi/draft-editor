import Dropdown from '../dropDown';

export default class ColorPicker extends React.Component {
  state = {
    visible: false
  };

  // shouldComponentUpdate(nextProps, nextState) {
  //   if (!this.state.visible && this.state.visible === nextState.visible) {
  //     return false;
  //   }
  //   return true;
  // }
  selectColor = (color) => {
    if (this.props.prefix === 'backColor') {
      this.props.editor.toggleSelectionBackgroundColor(
        color,
        this.props.colors.map((item) => 'BGCOLOR-' + item.replace('#', '').toUpperCase())
      );
      T.log('设置背景颜色');
    } else {
      this.props.editor.toggleSelectionColor(
        color,
        this.props.colors.map((item) => 'COLOR-' + item.replace('#', '').toUpperCase())
      );
      T.log('设置文字颜色');
    }
    this.closePicker();
  };
  renderOverlay = (currentColor) => {
    return (
      <div className="">
        <ul className="color-list">
          {this.props.colors.map((item, index) => {
            let className = 'color-li';
            if (currentColor === item) {
              className = 'color-li active';
            }
            return (
              <li
                key={index}
                className={className}
                style={{ backgroundColor: item }}
                onClick={() => this.selectColor(item)}
              />
            );
          })}
        </ul>
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
    const { pickerItem, editor, editorState, colors } = this.props;
    let currentColor = null;
    colors.forEach((color) => {
      let color_id = color.replace('#', '');
      if (editor.selectionHasInlineStyle(editorState, 'COLOR-' + color_id)) {
        currentColor = color;
      }

      if (editor.selectionHasInlineStyle(editorState, 'BGCOLOR-' + color_id)) {
        currentColor = color;
      }
    });
    let className = 'toolbar-li';
    if (currentColor) {
      className = 'toolbar-li active';
    }
    return (
      <Dropdown
        trigger={['click']}
        visible={this.state.visible}
        onVisibleChange={this.onVisibleChange}
        overlayClassName="editor-dialog editor-color-dialog"
        overlay={this.renderOverlay(currentColor)}
        animation="slide-down"
      >
        <li className={className}>
          <i className={`i-block toolbar-i i-${pickerItem.key}`}>
            <b className={pickerItem.key} style={{ backgroundColor: currentColor }} />
          </i>
          <span className="i-block v-middle">{pickerItem.name}</span>
        </li>
      </Dropdown>
    );
  }
}

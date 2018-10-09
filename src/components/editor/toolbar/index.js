import React from 'react';
import EmojiPicker from '../emojiPicker';
import { ForeColorPicker, BackColorPicker } from '../colorPicker';
import ImagePicker from '../imagePicker';
import ProjectPicker from '../projectPicker';
class Toolbar extends React.Component {
  clickHandler = (key) => {
    if (key === 'bold') {
      this.props.editor.toggleSelectionInlineStyle(key);
    } else if (key === 'removeFormat') {
      this.props.editor.removeSelectionInlineStyles();
    } else if (key === 'undo') {
      this.props.editor.undo();
    } else if (key === 'redo') {
      this.props.editor.redo();
    }
  };
  renderPicker = (item) => {
    switch (item.key) {
      case 'face':
        return <EmojiPicker {...this.props} pickerItem={item} />;
      case 'img':
        return <ImagePicker {...this.props} pickerItem={item} />;
      case 'foreColor':
        return <ForeColorPicker {...this.props} pickerItem={item} />;
      case 'backColor':
        return <BackColorPicker {...this.props} pickerItem={item} />;
      case 'project':
        return <ProjectPicker {...this.props} pickerItem={item} />;
      default:
        break;
    }

    return this.renderToolbarLi(item, true);
  };
  renderToolbarLi = (item) => {
    let className = 'toolbar-li';
    if (item.type === 'style') {
      if (this.props.editor.selectionHasInlineStyle(this.props.editorState, item.key)) {
        className = 'toolbar-li active';
      }
    }

    return (
      <li className={className} onClick={() => this.clickHandler(item.key)}>
        <i className={`i-block toolbar-i i-${item.key}`} />
        <span className="i-block v-middle">{item.name}</span>
      </li>
    );
  };
  renderToolbarItem = (item) => {
    if (item.type === 'style') {
      return this.renderToolbarLi(item);
    }
    if (item.type === 'dropdown') {
      return this.renderPicker(item);
    }
  };
  render() {
    return (
      <div className="custom-editor-toolbar">
        <ul className="i-block">
          {this.props.toolbarList.map((item) => {
            if (item.key === 'divider') {
              return <li className="divider" key={item.key} />;
            }
            return <React.Fragment key={item.key}>{this.renderToolbarItem(item)}</React.Fragment>;
          })}
        </ul>
      </div>
    );
  }
}

export default Toolbar;

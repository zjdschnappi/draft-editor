import React from 'react';
import {
  Editor,
  EditorState,
  SelectionState,
  ContentState,
  AtomicBlockUtils,
  Modifier,
  RichUtils,
  CompositeDecorator
} from 'draft-js';
import { convertToHTML, convertFromHTML } from 'draft-convert';
import { handleNewLine } from 'draftjs-utils';
import { getToHTMLConfig, getFromHTMLConfig } from './config/convert';
import { filterUnicode } from './utils/base';
// import { detectColorsFromHTML } from './helpers/colors'
import { getBlockRendererFn, getCustomStyleMap, decorators } from './renderers';
import defaultOption from './config/option';
import Toolbar from './toolbar';

const compositeDecorator = new CompositeDecorator(decorators);

class CustomEditor extends React.Component {
  constructor(props) {
    super(props);
    this.editorState = EditorState.createEmpty(compositeDecorator);
    this.state = { editorState: this.editorState };
  }
  static defaultProps = {
    ...defaultOption
  };
  focus = () => {
    this.draftInstance.focus();
    return this;
  };
  undo = () => {
    this.onChange(EditorState.undo(this.state.editorState));
  };
  redo = () => {
    this.onChange(EditorState.redo(this.state.editorState));
  };
  onChange = (editorState, callback = () => {}) => {
    let newEditorState = editorState;

    const content = editorState.getCurrentContent();
    const key = editorState.getSelection().getFocusKey();
    const type = content.getBlockForKey(key).getType();
    //图片等block块 光标处理
    if (type === 'atomic') {
      const keyAfter = content.getKeyAfter(key);
      const newSelection = SelectionState.createEmpty(keyAfter);
      newEditorState = EditorState.forceSelection(editorState, newSelection);
    }

    this.setState({ editorState: newEditorState }, callback);

    let contentState = newEditorState.getCurrentContent();
    this.props.onChange(
      convertToHTML(getToHTMLConfig({ contentState, needFormatEmoji: this.props.needFormatEmoji }))(contentState),
      contentState
    );
  };
  handleKeyCommand = (command) => {
    const nextEditorState = RichUtils.handleKeyCommand(this.state.editorState, command);

    if (nextEditorState) {
      this.onChange(nextEditorState);
      return 'handled';
    }

    return 'not-handled';
  };
  handleReturn = (event) => {
    event.which = 13;
    event.getModifierState = () => true;
    const nextEditorState = handleNewLine(this.state.editorState, event);

    if (nextEditorState) {
      this.onChange(nextEditorState);
      return true;
    }

    return false;
  };
  insertHTML = (htmlString) => {
    if (!htmlString) {
      return this;
    }
    //将回填的表情img标签转为自定义标签，，因为draft会自动将img标签识别为block
    htmlString = htmlString.replace(
      /<img src="(.*?)\/emojis\/(.*?)" alt="(.*?)" class="(.*?)"\/>/g,
      '<emotion data-url=$2 data-alt=$3>🥰</emotion>'
    );
    try {
      const rawContent = this.convertHTML(htmlString);
      const { blockMap } = rawContent;

      const { editorState } = this.state;
      return this.onChange(
        EditorState.push(
          this.editorState,
          Modifier.replaceWithFragment(editorState.getCurrentContent(), editorState.getSelection(), blockMap),
          'insert-fragment'
        )
      );
    } catch (error) {
      T.log(error);
    }
  };
  convertHTML = (htmlString) => {
    return convertFromHTML(getFromHTMLConfig())(htmlString);
  };
  removeAllInlineStyles = (editorState) => {
    const currentStyles = this.getSelectionInlineStyle(editorState);
    let contentState = editorState.getCurrentContent();
    currentStyles.forEach((style) => {
      contentState = Modifier.removeInlineStyle(contentState, editorState.getSelection(), style);
    });
    return EditorState.push(editorState, contentState, 'change-inline-style');
  };

  toggleSelectionInlineStyle = (style, stylesToBeRemoved = []) => {
    const { editorState } = this.state;
    const selectionState = editorState.getSelection();
    const contentState = editorState.getCurrentContent();

    if (selectionState.isCollapsed()) {
      return editorState;
    }

    style = style.toUpperCase();
    stylesToBeRemoved = stylesToBeRemoved.filter((item) => item !== style);

    const nextContentState = stylesToBeRemoved.length
      ? stylesToBeRemoved.reduce((contentState, item) => {
          return Modifier.removeInlineStyle(contentState, selectionState, item);
        }, contentState)
      : contentState;

    const nextEditorState = stylesToBeRemoved.length
      ? EditorState.push(editorState, nextContentState, 'change-inline-style')
      : editorState;

    this.onChange(RichUtils.toggleInlineStyle(nextEditorState, style));
  };
  toggleSelectionColor = (color, colorToRemove = []) => {
    this.toggleSelectionInlineStyle('COLOR-' + color.replace('#', ''), colorToRemove);
  };

  toggleSelectionBackgroundColor = (color, colorToRemove = []) => {
    this.toggleSelectionInlineStyle('BGCOLOR-' + color.replace('#', ''), colorToRemove);
  };
  removeSelectionInlineStyles = () => {
    this.onChange(this.removeAllInlineStyles(this.state.editorState));
  };
  getSelectionInlineStyle(editorState) {
    return editorState.getCurrentInlineStyle();
  }
  selectionHasInlineStyle(editorState, style) {
    return this.getSelectionInlineStyle(editorState).has(style.toUpperCase());
  }
  insertMedia = (medias) => {
    if (!medias.length) {
      return;
    }
    // const { editorState } = this.state;

    // if (this.getSelectionBlockType(editorState) === 'atomic') {
    //   this.selectNextBlock(editorState, this.getSelectionBlock(editorState));
    // }
    const newEditorState = medias.reduce((editorState, media) => {
      const { url, name, type, meta } = media;
      const contentStateWithEntity = editorState
        .getCurrentContent()
        .createEntity(type, 'IMMUTABLE', { url, name, type, meta });
      const entityKey = contentStateWithEntity.getLastCreatedEntityKey();
      return AtomicBlockUtils.insertAtomicBlock(editorState, entityKey, ' ');
    }, this.state.editorState);

    this.onChange(newEditorState);
  };
  insertProject = (params) => {
    const { editorState } = this.state;
    const contentState = editorState.getCurrentContent();
    const selection = editorState.getSelection();
    const contentStateWithEntity = contentState.createEntity('PROJECT', 'IMMUTABLE', params);
    const entityKey = contentStateWithEntity.getLastCreatedEntityKey();
    let projectAddedContent = Modifier.replaceText(contentState, selection, ' ', null, entityKey);
    const newEditorState = EditorState.push(editorState, projectAddedContent, 'insert-characters');
    this.onChange(newEditorState, () => {
      this.focus();
    });
  };
  insertEmoji = (emoji) => {
    const { editorState } = this.state;
    const { url, name } = emoji;
    let emojiAddedContent;
    const selection = editorState.getSelection();
    const contentState = editorState.getCurrentContent();
    const contentStateWithEntity = contentState.createEntity('EMOJI', 'IMMUTABLE', { url, name });
    const entityKey = contentStateWithEntity.getLastCreatedEntityKey();
    emojiAddedContent = Modifier.replaceText(contentState, selection, emoji.emojiString, null, entityKey);
    const newEditorState = EditorState.push(editorState, emojiAddedContent, 'insert-characters');

    this.onChange(newEditorState, () => {
      this.focus();
    });
  };

  handlePastedFiles = (files) => {
    T.log(files);
    return 'not-handled';
  };
  handlePastedText = (text, html, editorState) => {
    if (!html) {
      return false;
    }
    const formatText = filterUnicode(text);
    const blockMap = ContentState.createFromText(formatText).blockMap;
    const newState = Modifier.replaceWithFragment(
      editorState.getCurrentContent(),
      editorState.getSelection(),
      blockMap
    );
    this.onChange(EditorState.push(editorState, newState, 'insert-fragment'));
    return true;
  };
  componentDidMount() {
    // this.focus();
  }
  render() {
    const {
      foreColors,
      backColors,
      emojis, // emojiUnicodeMap,
      // unicodeEmojiMap,
      toolbarList,
      height,
      showContentLength,
      contentLength,
      disabled,
      placeholder
    } = this.props;
    const toolbarProps = {
      editor: this,
      editorState: this.state.editorState,
      foreColors,
      backColors,
      emojis,
      // emojiUnicodeMap,
      // unicodeEmojiMap,
      toolbarList
    };
    const blockRendererFn = getBlockRendererFn({
      editor: this
    });

    const editorProps = {
      ref: (instance) => {
        this.draftInstance = instance;
      },
      editorState: this.state.editorState,
      height,
      readOnly: disabled,
      onChange: this.onChange,
      handleKeyCommand: this.handleKeyCommand,
      handleReturn: this.handleReturn,
      handlePastedText: this.handlePastedText,
      handlePastedFiles: this.handlePastedFiles,
      blockRendererFn,
      customStyleMap: getCustomStyleMap({
        foreColors: foreColors,
        backColors: backColors
      }),
      placeholder
    };

    return (
      <div className="custom-editor">
        <div className="custom-editor-header">
          <Toolbar {...toolbarProps} />
        </div>
        <div className="custom-editor-content" style={height ? { height } : {}}>
          <Editor {...editorProps} />
        </div>
        {showContentLength ? (
          <span className="object-editor-textRemain">
            <span>
              还可以输入
              <strong>{contentLength}</strong>
              个字
            </span>
          </span>
        ) : null}
      </div>
    );
  }
}

export default CustomEditor;

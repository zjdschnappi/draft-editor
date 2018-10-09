import React from 'react';
import ReactDOM from 'react-dom';
import 'styles/demoPage.less';
const { CustomEditor } = window;
class DemoPage extends React.Component {
  state = {
    editorContent: null,
    editorContentState: null
  };
  editorChange = (editorContent, contentState) => {
    this.setState({
      editorContent,
      editorContentState: contentState
    });
    T.log(editorContent, T.tool.getEditorTextLength(contentState));
  };
  render() {
    return (
      <CustomEditor
        onChange={this.editorChange}
        placeholder="请输入内容"
        ref={(ref) => (this.draftEditorRef = ref)}
        height={430}
      />
    );
  }
}

ReactDOM.render(<DemoPage />, document.getElementById('root'));

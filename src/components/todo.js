import React from 'react';
const { Checkbox, Icon } = window.antd;
class Todo extends React.Component {
  onChange = (e, id) => {
    this.props.checkToggle(e.target.checked, id);
  };
  state = {
    inputValue: this.props.value
  };
  inputChange = (e) => {
    this.setState({
      inputValue: e.target.value
    });
  };
  render() {
    const { value, editVisible, closeHandle, editClickHandle, blurHandler, id, completed, style } = this.props;
    const { inputValue } = this.state;
    return (
      <li className="todo-li" style={style}>
        {editVisible ? null : (
          <React.Fragment>
            <Checkbox defaultChecked={completed} onChange={(e) => this.onChange(e, id)} />
            <span
              className="todo-text"
              style={!completed ? { textDecoration: 'none' } : { textDecoration: 'line-through' }}
              onDoubleClick={() => editClickHandle(id)}
            >
              {value}
            </span>
          </React.Fragment>
        )}

        <Icon
          type="close"
          className="close"
          onClick={() => {
            closeHandle(id);
          }}
        />
        {editVisible ? (
          <input
            type="text"
            className="edit-input"
            autoFocus
            onChange={this.inputChange}
            value={inputValue}
            onBlur={() => {
              blurHandler(inputValue, id);
            }}
          />
        ) : null}
      </li>
    );
  }
}

export default Todo;

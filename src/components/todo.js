import React from 'react';
import { connect } from 'react-redux';
const { Checkbox, Icon } = window.antd;
class Todo extends React.Component {
  onChange = (e, id) => {
    this.props.dispatch({
      type: 'TOGGLE_TODO',
      id
    });
  };
  state = {
    inputValue: this.props.value
  };
  inputChange = (e) => {
    this.setState({
      inputValue: e.target.value
    });
  };
  blurHandler = (id) => {
    this.props.dispatch({
      type: 'FINISH_EDIT_TODO',
      id,
      value: this.state.inputValue
    });
  };
  deleteHandle = (id) => {
    this.props.dispatch({
      type: 'DELETE_TODO',
      id
    });
  };
  editClickHandle = (id) => {
    this.props.dispatch({
      type: 'EDIT_TODO',
      id
    });
  };
  render() {
    const { value, editVisible, id, completed, style } = this.props;
    const { inputValue } = this.state;
    return (
      <li className="todo-li" style={style}>
        {editVisible ? null : (
          <React.Fragment>
            <Checkbox defaultChecked={completed} onChange={(e) => this.onChange(e, id)} />
            <span
              className="todo-text"
              style={!completed ? { textDecoration: 'none' } : { textDecoration: 'line-through' }}
              onDoubleClick={() => this.editClickHandle(id)}
            >
              {value}
            </span>
          </React.Fragment>
        )}

        <Icon
          type="close"
          className="close"
          onClick={() => {
            this.deleteHandle(id);
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
              this.blurHandler(id);
            }}
          />
        ) : null}
      </li>
    );
  }
}

export default connect()(Todo);

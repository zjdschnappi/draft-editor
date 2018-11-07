import React from 'react';
import { connect } from 'react-redux';
class TextInput extends React.Component {
  state = {
    addValue: ''
  };
  inputChange = (e) => {
    this.setState({
      addValue: e.target.value
    });
  };
  addInputSubmit = (e) => {
    e.preventDefault();
    if (!this.state.addValue) {
      return;
    }
    const uniqueIndex = this.uniqueIndex();

    this.props.dispatch({
      type: 'ADD_TODO',
      payload: {
        value: this.state.addValue,
        id: uniqueIndex,
        editVisible: false,
        completed: false
      }
    });
    this.clearInput();
  };
  uniqueIndex = () => {
    return new Date().valueOf();
  };

  clearInput = () => {
    this.setState({
      addValue: ''
    });
  };
  render() {
    return (
      <form onSubmit={this.addInputSubmit}>
        <input type="text" className="add-input" value={this.state.addValue} onChange={this.inputChange} />
      </form>
    );
  }
}
export default connect()(TextInput);

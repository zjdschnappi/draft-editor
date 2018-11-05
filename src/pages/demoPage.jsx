import React from 'react';
import ReactDOM from 'react-dom';
import 'styles/demoPage.less';
import { Provider, connect } from 'react-redux';
import { createStore } from 'redux';
import reducer from '../reducers';
import Todolist from 'components/todoList';

const store = createStore(reducer);
class DemoPage extends React.Component {
  state = {
    todoList: [],
    contentVisible: false,
    addValue: null,
    showType: 'all'
  };

  addInputChange = (e) => {
    this.setState({
      addValue: e.target.value
    });
  };
  uniqueIndex = () => {
    return new Date().valueOf();
  };
  closeHandle = (id) => {
    this.setState({
      todoList: this.state.todoList.filter((item) => item.id !== id)
    });
  };
  editClickHandle = (id) => {
    const list = this.state.todoList.concat();
    list.forEach((item) => {
      if (item.id === id) {
        item.editVisible = true;
      } else {
        item.editVisible = false;
      }
    });
    this.setState({
      todoList: list
    });
  };
  addInputSubmit = (e) => {
    e.preventDefault();
    const { addValue, todoList } = this.state;
    if (!addValue) return;
    const uniqueIndex = this.uniqueIndex();
    this.setState({
      todoList: [
        ...todoList,
        {
          value: addValue,
          id: uniqueIndex,
          editVisible: false,
          completed: false
        }
      ],

      contentVisible: true
    });
    this.clearInput();
  };
  blurHandler = (value, id) => {
    const list = [...this.state.todoList];
    list.forEach((item) => {
      if (item.id === id) {
        item.editVisible = false;
        item.value = value;
      }
    });
    this.setState({
      todoList: list
    });
  };
  changeShowType = (type) => {
    this.setState({
      showType: type
    });
  };
  checkToggle = (checked, id) => {
    const list = [...this.state.todoList];
    list.forEach((item) => {
      if (item.id === id) {
        item.completed = checked;
      }
    });
    this.setState({
      todoList: list
    });
  };
  clearInput = () => {
    this.setState({
      addValue: ''
    });
  };
  render() {
    const { contentVisible, addValue, todoList, showType } = this.state;
    return (
      <div style={{ width: '400px', margin: '0 auto' }}>
        <header className="header">
          <h1 style={{ fontSize: '100px' }}>Todos</h1>
          <form onSubmit={this.addInputSubmit}>
            <input type="text" className="add-input" onChange={this.addInputChange} value={addValue} />
          </form>
        </header>
        {contentVisible ? (
          <React.Fragment>
            <article className="content">
              <Todolist
                todoList={todoList}
                showType={showType}
                closeHandle={this.closeHandle}
                editClickHandle={this.editClickHandle}
                blurHandler={this.blurHandler}
                checkToggle={this.checkToggle}
              />
            </article>

            <footer>
              <div className="todo-footer">
                <span>{todoList.length} items left</span>
                <span className="tabs">
                  <span
                    className={showType === 'all' ? 'tab-btn active' : 'tab-btn'}
                    onClick={() => this.changeShowType('all')}
                  >
                    all
                  </span>
                  <span
                    className={showType === 'active' ? 'tab-btn active' : 'tab-btn'}
                    onClick={() => this.changeShowType('active')}
                  >
                    active
                  </span>
                  <span
                    className={showType === 'completed' ? 'tab-btn active' : 'tab-btn'}
                    onClick={() => this.changeShowType('completed')}
                  >
                    completed
                  </span>
                </span>
              </div>
            </footer>
          </React.Fragment>
        ) : null}
      </div>
    );
  }
}
const Demo = connect()(DemoPage);
ReactDOM.render(
  <Provider store={store}>
    <Demo />
  </Provider>,
  document.getElementById('root')
);

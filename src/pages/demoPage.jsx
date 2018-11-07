import React from 'react';
import ReactDOM from 'react-dom';
import 'styles/demoPage.less';
import { Provider, connect } from 'react-redux';
import { createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import reducer from '../reducers';
import Todolist from 'components/todoList';
import TextInput from 'components/textInput';

const store = createStore(reducer, composeWithDevTools());
class DemoPage extends React.Component {
  state = {
    // todoList: [],
    contentVisible: true,
    // addValue: null,
    showType: 'all'
  };

  uniqueIndex = () => {
    return new Date().valueOf();
  };

  changeShowType = (type) => {
    this.setState({
      showType: type
    });
  };
  render() {
    const { contentVisible, showType } = this.state;
    return (
      <div style={{ width: '400px', margin: '0 auto' }}>
        <header className="header">
          <h1 style={{ fontSize: '100px' }}>Todos</h1>
          <TextInput />
        </header>
        {contentVisible ? (
          <React.Fragment>
            <article className="content">
              <Todolist showType={showType} />
            </article>

            <footer>
              <div className="todo-footer">
                <span>0 items left</span>
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

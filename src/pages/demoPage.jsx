import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import 'styles/demoPage.less';
import Header from 'components/header';
import Content from 'components/content';

function createStore(reducer) {
  let state = null;
  const listeners = [];
  const subscribe = (listener) => listeners.push(listener);
  const getState = () => state;
  const dispatch = (action) => {
    state = reducer(state, action);
    listeners.forEach((listener) => listener());
  };
  dispatch({});
  return { getState, dispatch, subscribe };
}
const themeReducer = (state, action) => {
  if (!state)
    return {
      themeColor: 'red'
    };
  switch (action.type) {
    case 'CHANGE_COLOR':
      return { ...state, themeColor: action.themeColor };
    default:
      return state;
  }
};
const store = createStore(themeReducer);
class DemoPage extends React.Component {
  state = {};
  static childContextTypes = {
    store: PropTypes.object
  };

  getChildContext() {
    return { store };
  }

  render() {
    return (
      <div>
        <Header />
        <Content />
      </div>
    );
  }
}

ReactDOM.render(<DemoPage />, document.getElementById('root'));

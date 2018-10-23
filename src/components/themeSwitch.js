import React from 'react';
import PropTypes from 'prop-types';
class ThemeSwitch extends React.Component {
  constructor() {
    super();
    this.state = { themeColor: '' };
  }
  UNSAFE_componentWillMount() {
    this.updateThemeColor();
  }
  static contextTypes = {
    store: PropTypes.object
  };
  updateThemeColor = () => {
    const { store } = this.context;
    const state = store.getState();
    this.setState({
      themeColor: state.themeColor
    });
  };
  render() {
    return (
      <div>
        <button style={{ color: this.state.themeColor }}>red</button>
        <button style={{ color: this.state.themeColor }}>blue</button>
      </div>
    );
  }
}
export default ThemeSwitch;

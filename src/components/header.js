import React from 'react';
import PropTypes from 'prop-types';
class Header extends React.Component {
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
    return <h1 style={{ color: this.state.themeColor }}>标题</h1>;
  }
}
export default Header;

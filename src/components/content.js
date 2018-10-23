import React from 'react';
import PropTypes from 'prop-types';
import ThemeSwitch from 'components/themeSwitch';
class Content extends React.Component {
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
        <p style={{ color: this.state.themeColor }}>react小书内容</p>
        <ThemeSwitch />
      </div>
    );
  }
}
export default Content;

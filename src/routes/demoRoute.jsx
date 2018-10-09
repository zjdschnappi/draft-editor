import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'dva';

export class DemoRoute extends React.Component {
  static propTypes = {
    demoModel: PropTypes.object,
    date: PropTypes.string
  }

  render() {
    const {
      demoModel
    } = this.props;

    const {
      date
    } = demoModel;

    return (
      <React.Fragment>
        <div>
          这是使用dva后的页面
      </div>
        <div>
          现在时间是 {date}
        </div>
      </React.Fragment>
    )
  }
}

export default connect(({ demoModel }) => ({ demoModel }))(DemoRoute);

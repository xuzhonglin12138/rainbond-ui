import React, { Component } from 'react';
import Result from '../../components/Result';

// eslint-disable-next-line react/prefer-stateless-function
export default class Overdue extends Component {
  render() {
    return (
      <div style={{ height: '100vh', display: 'flex', alignItems: 'center' }}>
        <Result
          type="warning"
          title="平台授权已过期"
          description="请联系好雨商务&nbsp;获取更多授权"
        />
      </div>
    );
  }
}

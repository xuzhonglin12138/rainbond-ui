import React, { Component } from 'react';
import Result from '../../components/Result';

// eslint-disable-next-line react/prefer-stateless-function
export default class Overdue extends Component {
  render() {
    const { location } = this.props;
    const isLicense = location && location.query && location.query.isLicense;
    return (
      <div style={{ height: '100vh', display: 'flex', alignItems: 'center' }}>
        <Result
          type="warning"
          title={!isLicense ? '企业版授权未配置' : '平台授权已过期'}
          description={
            !isLicense
              ? '请获取授权文件并正确配置'
              : '请联系好雨商务 获取更多授权'
          }
        />
      </div>
    );
  }
}

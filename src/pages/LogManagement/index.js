import { Tabs } from 'antd';
import { connect } from 'dva';
import { routerRedux } from 'dva/router';
import React, { PureComponent } from 'react';
import PageHeaderLayout from '../../layouts/PageHeaderLayout';
import userUtil from '../../utils/user';
import OperationLog from './OperationLog';
import LoginLog from './LoginLog';

const { TabPane } = Tabs;

@connect(({ user, list, loading, global, index }) => ({
  user: user.currentUser,
  list,
  loading: loading.models.list,
  rainbondInfo: global.rainbondInfo,
  enterprise: global.enterprise,
  isRegist: global.isRegist,
  oauthLongin: loading.effects['global/creatOauth'],
  certificateLongin: loading.effects['global/putCertificateType'],
  overviewInfo: index.overviewInfo
}))
export default class EnterpriseSetting extends PureComponent {
  constructor(props) {
    super(props);
    const { user } = this.props;
    const adminer = userUtil.isCompanyAdmin(user);
    this.state = {
      adminer,
      activeKey: 'operationLog'
    };
  }
  componentWillMount() {
    const { adminer } = this.state;
    const { dispatch } = this.props;
    if (!adminer) {
      dispatch(routerRedux.push(`/`));
    }
  }
  onChange = (key) => {
    this.setState({ activeKey: key });
  };

  render() {
    const { adminer, activeKey } = this.state;
    return (
      <PageHeaderLayout
        title="日志管理"
        content="操作日志"
      >
        <Tabs onChange={this.onChange} activeKey={activeKey}>
          <TabPane tab={<div>操作日志</div>} key="operationLog">
            <OperationLog {...this.props} />
          </TabPane>
          {adminer && (
            <TabPane tab={<div>登录日志</div>} key="loginLog">
              <LoginLog {...this.props} />
            </TabPane>
          )}
        </Tabs>
      </PageHeaderLayout>
    );
  }
}

import React, { Fragment, PureComponent } from 'react';
import PageHeaderLayout from '@/layouts/PageHeaderLayout';
import Logs from '@/components/Logs';

export default class AppLogs extends PureComponent {
  render() {
    const { appID } = this.props.match.params;
    return (
      <Fragment>
        <PageHeaderLayout
          title="动态"
          content="跟踪账号操作记录的查询，可用于安全分析、资源变更追踪以及合规性审计等场景。"
        >
          <Logs views="app" appID={appID} />
        </PageHeaderLayout>
      </Fragment>
    );
  }
}

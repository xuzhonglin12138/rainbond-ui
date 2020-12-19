import React, { Fragment, PureComponent } from 'react';
import Logs from '@/components/Logs';

export default class OperationLog extends PureComponent {
  render() {
    const {
      match: {
        params: { eid }
      }
    } = this.props;
    return (
      <Fragment>
        <Logs eid={eid} views="enterprise" />
      </Fragment>
    );
  }
}

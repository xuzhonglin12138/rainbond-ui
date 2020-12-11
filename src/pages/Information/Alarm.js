import { Tabs, Table, Button } from 'antd';
import { connect } from 'dva';
import React, { PureComponent } from 'react';
import styles from './index.less';

const { TabPane } = Tabs;

@connect()
export default class Alarm extends PureComponent {
  constructor(props) {
    super(props);
    const {
      match: {
        params: { activeType }
      }
    } = this.props;
    this.state = {
      dataList: [{ comment: 'dd' }],
      total: 0,
      page_num: 1,
      page_size: 10,
      loading: false,
      activeKey: activeType || 'unread'
    };
  }
  onPageChange = page_num => {
    this.setState({ page_num }, () => {
      this.load();
    });
  };
  onChange = key => {
    this.setState({ activeKey: key });
  };
  load = () => {
    const { dispatch, currentTeam } = this.props;
    const { page_num, page_size, tcp_search } = this.state;
    dispatch({
      type: 'gateWay/queryTcpData',
      payload: {
        team_name: currentTeam.team_name,
        page_num,
        page_size,
        search_conditions: tcp_search
      },
      callback: data => {
        if (data) {
          this.setState({
            dataList: data.list,
            loading: false,
            total: data.bean.total
          });
        }
      }
    });
  };
  start = () => {
    this.setState({ loading: true });
    // ajax request after empty completing
    setTimeout(() => {
      this.setState({
        loading: false
      });
    }, 1000);
  };

  render() {
    const {
      activeKey,
      total,
      loading,
      page_num,
      page_size,
      dataList
    } = this.state;
    return (
      <div>
        <div className={styles.boxs}>
          <div className={styles.title}>报警通知</div>
          <Button type="primary" onClick={this.start} loading={loading}>
            标记所有为已读
          </Button>
        </div>
        <Tabs onChange={this.onChange} activeKey={activeKey}>
          <TabPane tab="未读通知" key="unread">
            <Table
              pagination={{
                total,
                page_num,
                pageSize: page_size,
                onChange: this.onPageChange,
                current: page_num
              }}
              dataSource={dataList}
              columns={[
                {
                  title: '',
                  dataIndex: 'comment',
                  render: val => {
                    return <span>{val}</span>;
                  }
                },
                {
                  title: '操作',
                  dataIndex: 'action',
                  width: 100,
                  render: () => {
                    return (
                      <Button onClick={() => {}} href="javascript:;">
                        标记已读
                      </Button>
                    );
                  }
                }
              ]}
              loading={loading}
            />
          </TabPane>
          <TabPane tab="所有通知" key="all">
            <Table
              pagination={{
                total,
                page_num,
                pageSize: page_size,
                onChange: this.onPageChange,
                current: page_num
              }}
              dataSource={dataList}
              columns={[
                {
                  title: '',
                  dataIndex: 'comment',
                  render: val => {
                    return <span>{val}</span>;
                  }
                },
                {
                  title: '操作',
                  dataIndex: 'action',
                  width: 100,
                  render: () => {
                    return (
                      <Button onClick={() => {}} href="javascript:;">
                        标记已读
                      </Button>
                    );
                  }
                }
              ]}
              loading={loading}
            />
          </TabPane>
        </Tabs>
      </div>
    );
  }
}

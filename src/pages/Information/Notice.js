import React, { PureComponent } from 'react';
import { connect } from 'dva';
import { Tabs, Table, Button, Badge } from 'antd';
import { routerRedux } from 'dva/router';
import moment from 'moment';
import logsUtil from '@/utils/logs';
import userUtil from '@/utils/user';
import styles from './index.less';

const { TabPane } = Tabs;

@connect(({ user }) => ({
  user: user.currentUser
}))
export default class Notice extends PureComponent {
  constructor(props) {
    super(props);
    const {
      match: {
        params: { activeType }
      },
      user
    } = this.props;
    const adminer =
      userUtil.isSystemAdmin(user) || userUtil.isCompanyAdmin(user);

    this.state = {
      adminer,
      dataList: [],
      total: 0,
      page: 1,
      pageSize: 10,
      modifyLoading: false,
      loading: false,
      isRead: null,
      activeKey: activeType || 'all'
    };
  }

  componentDidMount() {
    this.loadSystemMessages();
  }
  onChange = key => {
    this.setState(
      {
        loading: true,
        activeKey: key,
        isRead: key === 'unread' ? 'False' : null
      },
      () => {
        this.loadSystemMessages();
      }
    );
  };
  onPageChange = page => {
    this.setState({ page }, () => {
      this.loadSystemMessages();
    });
  };

  loadSystemMessages = () => {
    const { dispatch } = this.props;
    const { page, pageSize, isRead } = this.state;
    dispatch({
      type: 'global/fetchSystemMessages',
      payload: {
        page,
        page_size: pageSize,
        create_time: '',
        is_read: isRead,
        category: 'system'
      },
      callback: res => {
        if (res && res._code === 200) {
          this.setState({
            loading: false,
            dataList: res.list,
            total: res.total
          });
        }
      }
    });
  };
  handleRead = () => {
    const { dataList } = this.state;
    if (dataList && dataList.length > 0) {
      const messageIds = dataList.map(item => item.message_id);
      this.setState({ modifyLoading: true }, () => {
        this.putInternalMessages(messageIds);
      });
    }
  };
  putInternalMessages = (messageIds, url, teamName) => {
    const { dispatch } = this.props;
    const { isRead } = this.state;
    dispatch({
      type: 'global/putInternalMessages',
      payload: {
        message_ids: messageIds
      },
      callback: res => {
        this.setState({
          modifyLoading: false
        });
        if (res && res._code === 200) {
          if (isRead !== 'False') {
            this.updataSystemMessages();
          }
          this.loadSystemMessages();
          if (url) {
            this.handleJump(url, teamName);
          }
        }
      }
    });
  };

  handleJump = (url, teamName) => {
    const { dispatch } = this.props;
    if (this.state.adminer && teamName) {
      this.handleJoinTeams(teamName, url);
    } else {
      dispatch(routerRedux.push(url));
    }
  };

  handleJoinTeams = (teamName, url) => {
    const { dispatch } = this.props;
    dispatch({
      type: 'teamControl/joinTeam',
      payload: {
        team_name: teamName
      },
      callback: res => {
        if (res && res._code === 200) {
          dispatch(routerRedux.push(url));
        }
      }
    });
  };

  updataSystemMessages = () => {
    const { dispatch } = this.props;
    dispatch({
      type: 'global/fetchSystemMessages',
      payload: {
        page: 1,
        page_size: 5,
        is_read: 'False',
        create_time: '',
        category: 'system'
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

  handleTable = () => {
    const { total, loading, page, pageSize, dataList } = this.state;
    return (
      <Table
        onRow={record => {
          return {
            onClick: () => {
              if (!record.is_read) {
                this.putInternalMessages([record.message_id]);
              }
            } // 点击行
          };
        }}
        showHeader={false}
        loading={loading}
        pagination={{
          total,
          page_num: page,
          pageSize,
          onChange: this.onPageChange,
          current: page
        }}
        dataSource={dataList}
        columns={[
          {
            title: '',
            dataIndex: 'content',
            render: (val, data) => {
              return (
                <div
                  style={{
                    cursor: data.is_read ? 'auto' : 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between'
                  }}
                >
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center'
                    }}
                  >
                    <Badge status={data.is_read ? 'default' : 'error'} />
                    {logsUtil.fetchLogsContent(val, (url, teamName) => {
                      if (!data.is_read) {
                        this.putInternalMessages(
                          [data.message_id],
                          url,
                          teamName
                        );
                      } else {
                        this.handleJump(url);
                      }
                    })}
                  </div>
                  {data.create_time && (
                    <span
                      style={{
                        display: 'flex',
                        alignItems: 'center'
                      }}
                    >
                      <svg
                        style={{
                          margin: '0 5px 0 20px'
                        }}
                        fill="currentColor"
                        preserveAspectRatio="xMidYMid meet"
                        height="1em"
                        width="1em"
                        viewBox="0 0 16 16"
                      >
                        <g>
                          <path d="M8 0a8 8 0 110 16A8 8 0 018 0zm0 2a6 6 0 100 12A6 6 0 008 2zm0 2a1 1 0 01.993.883L9 5v3.02l2.125 1.7a1 1 0 01.228 1.302l-.072.103a1 1 0 01-1.303.228l-.103-.072L7 8.98V5a1 1 0 011-1z" />
                        </g>
                      </svg>
                      {moment(data.create_time)
                        .locale('zh-cn')
                        .format('YYYY-MM-DD HH:mm:ss')}
                    </span>
                  )}
                </div>
              );
            }
          }
        ]}
      />
    );
  };

  render() {
    const { activeKey, dataList, modifyLoading, loading } = this.state;
    return (
      <div>
        <div className={styles.boxs}>
          <div className={styles.title}>通知信息</div>
          {activeKey === 'unread' && !loading && dataList.length !== 0 && (
            <Button
              type="primary"
              disabled={loading || dataList.length === 0}
              loading={modifyLoading}
              onClick={this.handleRead}
            >
              标记所有为已读
            </Button>
          )}
        </div>
        <Tabs onChange={this.onChange} animated={false} activeKey={activeKey}>
          <TabPane tab="所有通知" key="all">
            {this.handleTable()}
          </TabPane>
          <TabPane tab="未读通知" key="unread">
            {this.handleTable()}
          </TabPane>
        </Tabs>
      </div>
    );
  }
}

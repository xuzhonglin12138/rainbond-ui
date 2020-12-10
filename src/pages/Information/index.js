import { Tabs, Menu, Table, Button } from 'antd';
import { connect } from 'dva';
import React, { PureComponent } from 'react';
import { FormattedMessage } from 'umi-plugin-locale';
import styles from './index.less';

const { TabPane } = Tabs;
const { Item } = Menu;

@connect()
export default class Information extends PureComponent {
  constructor(props) {
    super(props);
    const {
      match: {
        params: { infoType }
      }
    } = this.props;
    const menuMap = {};
    menuMap.information = (
      <FormattedMessage
        id="header.information"
        defaultMessage="Stand inside letter"
      />
    );
    this.state = {
      selectedRowKeys: [],
      dataList: [{ comment: 'dd' }],
      total: 0,
      page_num: 1,
      page_size: 10,
      menuMap,
      loading: false,
      selectKey: 'information',
      activeKey: infoType || 'unread'
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
  onSelectChange = selectedRowKeys => {
    console.log('selectedRowKeys changed: ', selectedRowKeys);
    this.setState({ selectedRowKeys });
  };
  getmenu = () => {
    const { menuMap } = this.state;
    return Object.keys(menuMap).map(item => (
      <Item key={item}>{menuMap[item]}</Item>
    ));
  };

  getRightTitle = () => {
    const { selectKey, menuMap } = this.state;
    return menuMap[selectKey];
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
        selectedRowKeys: [],
        loading: false
      });
    }, 1000);
  };

  render() {
    const {
      selectKey,
      activeKey,
      total,
      loading,
      page_num,
      page_size,
      dataList,
      columns,
      selectedRowKeys
    } = this.state;
    const rowSelection = {
      selectedRowKeys,
      onChange: this.onSelectChange
    };
    const hasSelected = selectedRowKeys.length > 0;

    return (
      <div className={styles.main}>
        <div className={styles.leftmenu}>
          <Menu mode="inline" selectedKeys={[selectKey]}>
            {this.getmenu()}
          </Menu>
        </div>
        <div className={styles.right}>
          <div className={styles.title}>{this.getRightTitle()}</div>
          <Tabs onChange={this.onChange} activeKey={activeKey}>
            <TabPane tab="通知" key="unread">
              <div style={{ marginBottom: 16 }}>
                <Button
                  type="primary"
                  onClick={this.start}
                  // disabled={!hasSelected}
                  loading={loading}
                >
                  清空通知
                </Button>
              </div>
              <Table
                // rowSelection={rowSelection}
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
                    title: '内容',
                    dataIndex: 'comment',
                    render: val => {
                      return <span>{val}</span>;
                    }
                  },
                  {
                    title: '操作',
                    dataIndex: 'action',
                    width: 100,
                    render: (val, data) => {
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
            <TabPane tab="全部" key="all">
              <Table
                // rowSelection={rowSelection}
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
                    title: '内容',
                    dataIndex: 'comment',
                    render: val => {
                      return <span>{val}</span>;
                    }
                  },
                  {
                    title: '操作',
                    dataIndex: 'action',
                    width: 100,
                    render: (val, data) => {
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
      </div>
    );
  }
}

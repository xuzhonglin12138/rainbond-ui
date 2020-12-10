/* eslint-disable react/sort-comp */
/* eslint-disable no-unused-expressions */
import React, { PureComponent, Fragment } from 'react';
import { connect } from 'dva';
import { Form, Select, DatePicker, Col, Row, Button, Table } from 'antd';
import logsUtil from '@/utils/logs';
import moment from 'moment';
import styles from '../index.less';

const FormItem = Form.Item;
const { Option } = Select;
const { RangePicker } = DatePicker;

@Form.create()
@connect(({ user, list, loading, global, index }) => ({
  user: user.currentUser,
  list,
  loading: loading.models.list,
  rainbondInfo: global.rainbondInfo,
  enterprise: global.enterprise,
  isRegist: global.isRegist,
  overviewInfo: index.overviewInfo
}))
export default class LoginLog extends PureComponent {
  constructor(props) {
    super(props);
    const { user } = this.props;
    this.state = {
      username: '',
      page: 1,
      page_size: 10,
      loading: true,
      logList: [],
      logsPage: 1,
      logsPageSize: 10,
      logsTotal: 0,
      adminList: [],
      startTime: '',
      endTime: '',
      eventType: ''
    };
  }

  componentDidMount() {
    this.loadUser();
    this.loadLoginLog();
  }

  handleSearch = name => {
    this.setState(
      {
        name,
        page: 1
      },
      () => {
        this.loadUser();
      }
    );
  };
  handleChange = value => {
    this.setState(
      {
        username: value,
        page: 1
      },
      () => {
        this.loadLoginLog();
      }
    );
  };
  loadLoginLog = () => {
    const { dispatch } = this.props;
    const {
      logsPage,
      logsPageSize,
      username,
      startTime,
      endTime,
      eventType
    } = this.state;

    dispatch({
      type: 'global/fetchLoginLogs',
      payload: {
        page: logsPage,
        page_size: logsPageSize,
        event_type: eventType,
        username,
        start_time: startTime,
        end_time: endTime
      },
      callback: res => {
        if (res && res._code === 200) {
          this.setState({
            loading: false,
            logList: res.list,
            logsTotal: res.total
          });
        }
      }
    });
  };

  loadUser = () => {
    const {
      dispatch,
      match: {
        params: { eid }
      }
    } = this.props;
    const { page, page_size, name } = this.state;
    dispatch({
      type: 'global/fetchEnterpriseUsers',
      payload: {
        enterprise_id: eid,
        page,
        page_size,
        name
      },
      callback: res => {
        if (res) {
          this.setState({ adminList: res.list });
        }
      }
    });
  };

  disabledDate = current => {
    // Can not select days before today and today
    return current && current > moment().endOf('day');
  };
  range = (start, end) => {
    const result = [];
    for (let i = start; i < end; i++) {
      result.push(i);
    }
    return result;
  };

  onPageChange = logsPage => {
    this.setState({ logsPage, loading: true }, () => {
      this.loadLoginLog();
    });
  };

  handleSubmit = e => {
    e.preventDefault();
    const { form } = this.props;
    form.validateFields((err, values) => {
      if (!err) {
        let startTime = '';
        let endTime = '';

        if (values.times && values.times.length > 1) {
          startTime = moment(values.times[0])
            .locale('zh-cn')
            .format('YYYY-MM-DD HH:mm:ss');
          endTime = moment(values.times[1])
            .locale('zh-cn')
            .format('YYYY-MM-DD HH:mm:ss');
        }
        const username = values.user_name || '';
        const eventType = values.event_type || '';
        this.setState(
          {
            loading: true,
            logsPage: 1,
            startTime,
            endTime,
            username,
            eventType
          },
          () => {
            this.loadLoginLog();
          }
        );
      }
    });
  };
  handleChangeType = value => {
    this.setState(
      {
        eventType: value,
        logsPage: 1
      },
      () => {
        this.loadLoginLog();
      }
    );
  };

  handleChangeTimes = values => {
    let startTime = '';
    let endTime = '';

    if (values && values.length > 1) {
      startTime = moment(values[0])
        .locale('zh-cn')
        .format('YYYY-MM-DD HH:mm:ss');
      endTime = moment(values[1])
        .locale('zh-cn')
        .format('YYYY-MM-DD HH:mm:ss');
    }

    this.setState(
      {
        loading: true,
        logsPage: 1,
        startTime,
        endTime
      },
      () => {
        this.loadLoginLog();
      }
    );
  };

  render() {
    const { getFieldDecorator } = this.props.form;
    const {
      loading,
      adminList,
      logList,
      logsPage,
      logsPageSize,
      logsTotal
    } = this.state;

    const formItemLayout = {
      labelCol: {
        xs: {
          span: 0
        },
        sm: {
          span: 0
        }
      },
      wrapperCol: {
        xs: {
          span: 24
        },
        sm: {
          span: 24
        }
      }
    };
    return (
      <Fragment>
        <Form onSubmit={this.handleSubmit}>
          <Row
            gutter={[16, 16]}
            type="flex"
            justify="space-between"
            align="middle"
          >
            <Col span={4}>
              <FormItem {...formItemLayout}>
                {getFieldDecorator('user_name', {
                  rules: [
                    {
                      required: false,
                      message: '请选择成员'
                    }
                  ]
                })(
                  <Select
                    showSearch
                    placeholder="请选择成员"
                    defaultActiveFirstOption={false}
                    filterOption={false}
                    notFoundContent={null}
                    onSearch={this.handleSearch}
                    onChange={this.handleChange}
                  >
                    <Option key={0} value="">
                      所有成员
                    </Option>
                    {adminList &&
                      adminList.length > 0 &&
                      adminList.map(item => {
                        const { nick_name, real_name, user_id } = item;
                        return (
                          <Option key={user_id} value={nick_name}>
                            {real_name}
                          </Option>
                        );
                      })}
                  </Select>
                )}
              </FormItem>
            </Col>
            <Col span={4}>
              <FormItem {...formItemLayout}>
                {getFieldDecorator('event_type', {
                  rules: [
                    {
                      required: false,
                      message: '请选择操作类型'
                    }
                  ]
                })(
                  <Select
                    placeholder="操作类型"
                    onChange={this.handleChangeType}
                  >
                    <Option key={0} value="">
                      所有类型
                    </Option>
                    {[
                      { name: '登录', key: 'login' },
                      { name: '登出', key: 'logout' }
                    ].map(item => (
                      <Option value={item.key}>{item.name}</Option>
                    ))}
                  </Select>
                )}
              </FormItem>
            </Col>
            <Col span={8}>
              <FormItem {...formItemLayout}>
                {getFieldDecorator('times', {
                  initialValue: ''
                })(
                  <RangePicker
                    separator="至"
                    style={{ width: '100%' }}
                    disabledDate={this.disabledDate}
                    onChange={value => {
                      this.handleChangeTimes(value);
                    }}
                    showTime={{
                      hideDisabledOptions: true,
                      defaultValue: [
                        moment('00:00:00', 'HH:mm:ss'),
                        moment('23:59:59', 'HH:mm:ss')
                      ]
                    }}
                    format="YYYY-MM-DD HH:mm:ss"
                  />
                )}
              </FormItem>
            </Col>
            <Col span={4}>
              <Button
                onClick={this.handleSubmit}
                type="primary"
                htmlType="submit"
                style={{ marginBottom: '24px' }}
              >
                查询
              </Button>
            </Col>
          </Row>
        </Form>
        <Table
          loading={loading}
          size="middle"
          className={styles.tables}
          pagination={{
            size: 'default',
            current: logsPage,
            pageSize: logsPageSize,
            total: logsTotal,
            onChange: this.onPageChange
          }}
          dataSource={logList || []}
          columns={[
            {
              title: '成员',
              align: 'center',
              dataIndex: 'username'
            },
            {
              title: '登录时间',
              dataIndex: 'login_time',
              rowKey: 'login_time',
              align: 'center',
              width: 200,
              render: val => {
                return (
                  <span>
                    {val
                      ? moment(val)
                          .locale('zh-cn')
                          .format('YYYY-MM-DD HH:mm:ss')
                      : '-'}
                  </span>
                );
              }
            },
            {
              title: '登出时间',
              dataIndex: 'logout_time',
              rowKey: 'logout_time',
              align: 'center',
              width: 200,
              render: val => {
                return (
                  <span>
                    {val
                      ? moment(val)
                          .locale('zh-cn')
                          .format('YYYY-MM-DD HH:mm:ss')
                      : '-'}
                  </span>
                );
              }
            },
            {
              title: '活跃时间',
              dataIndex: 'duration',
              rowKey: 'duration',
              align: 'center',
              width: 200,
              render: val => {
                return (
                  <span>
                    {val
                      ? moment('1900-01-01 00:00:00')
                          .add(val, 'seconds')
                          .format('HH:mm:ss')
                      : '-'}
                  </span>
                );
              }
            },
            {
              title: '客户端 IP',
              align: 'center',
              dataIndex: 'client_ip',
              render: val => {
                return <span>{val || '-'}</span>;
              }
            },
            {
              title: '用户代理',
              align: 'center',
              dataIndex: 'user_agent',
              render: val => {
                return <span>{val || '-'}</span>;
              }
            },
            {
              title: '操作类型',
              align: 'center',
              dataIndex: 'event_type',
              width: 100,
              render: val => {
                return <span>{val === 'login' ? '登录' : '登出'}</span>;
              }
            }
          ]}
        />
      </Fragment>
    );
  }
}

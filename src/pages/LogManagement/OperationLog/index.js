/* eslint-disable react/sort-comp */
/* eslint-disable no-unused-expressions */
import React, { PureComponent, Fragment } from 'react';
import { connect } from 'dva';
import {
  Form,
  Select,
  DatePicker,
  Col,
  Row,
  Button,
  Table,
  Tooltip
} from 'antd';
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
export default class OperationLog extends PureComponent {
  constructor(props) {
    super(props);
    const { user } = this.props;
    this.state = {
      name: '',
      page: 1,
      page_size: 10,
      loading: true,
      logList: [
        // {
        //   ID: 92,
        //   app_id: 0,
        //   comment:
        //     'gradmin 创建了团队 <<{"name": "22a", "view_type": "team", "region": "rainbond", "app_id": 0, "service_alias": "", "plugin_id": "", "team_name": "45jnv9c8"}>>转移了<<{"name": "转名称", "view_type": "team", "region": "rainbond", "app_id": 0, "service_alias": "", "plugin_id": "", "team_name": "45jnv9c8"}>>sd',
        //   create_time: '2020-12-07T16:15:31.531346',
        //   enterprise_id: 'c3ec3fc667b54a5da1f53d385074b19a',
        //   operation_type: 'enterprise_manage',
        //   service_alias: '',
        //   team_name: '45jnv9c8',
        //   username: 'gradmin'
        // }
      ],
      logsPage: 1,
      logsPageSize: 10,
      logsTotal: 0,
      adminList: [],
      startTime: '',
      endTime: '',
      operationType: ''
    };
  }

  componentDidMount() {
    this.loadUser();
    this.loadOperationLog();
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
        name: value,
        logsPage: 1
      },
      () => {
        this.loadOperationLog();
      }
    );
  };

  handleChangeType = value => {
    this.setState(
      {
        operationType: value,
        logsPage: 1
      },
      () => {
        this.loadOperationLog();
      }
    );
  };
  loadOperationLog = () => {
    const {
      dispatch,
      match: {
        params: { eid }
      }
    } = this.props;
    const {
      logsPage,
      logsPageSize,
      name,
      startTime,
      endTime,
      operationType
    } = this.state;
    dispatch({
      type: 'global/fetchOperationLogs',
      payload: {
        enterprise_id: eid,
        page: logsPage,
        page_size: logsPageSize,
        name,
        start_time: startTime,
        end_time: endTime,
        operation_type: operationType
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
      this.loadOperationLog();
    });
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
        this.loadOperationLog();
      }
    );
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
        const name = values.username || '';
        const operationType = values.operation_type || '';

        this.setState(
          {
            loading: true,
            logsPage: 1,
            startTime,
            endTime,
            name,
            operationType
          },
          () => {
            this.loadOperationLog();
          }
        );
      }
    });
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

    const logs = logsUtil.fetchOperationType();
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
                {getFieldDecorator('username', {
                  rules: [
                    {
                      required: false,
                      message: '请选择操作者'
                    }
                  ]
                })(
                  <Select
                    showSearch
                    placeholder="请选择操作者"
                    defaultActiveFirstOption={false}
                    filterOption={false}
                    notFoundContent={null}
                    onSearch={this.handleSearch}
                    onChange={this.handleChange}
                  >
                    <Option key={0} value="">
                      所有操作者
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
                {getFieldDecorator('operation_type', {
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
                    {Object.keys(logs).map(item => (
                      <Option value={item}>{logs[item]}</Option>
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
                    style={{ width: '100%' }}
                    separator="至"
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
          className={styles.tables}
          loading={loading}
          size="middle"
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
              title: '操作者',
              align: 'center',
              width: 200,
              dataIndex: 'username',
              render: (val, data) => {
                return (
                  <Tooltip
                    placement="top"
                    title={
                      <div>
                        <div>账户：{data.real_name}</div>
                        <div>邮箱：{data.email}</div>
                      </div>
                    }
                  >
                    {val}
                  </Tooltip>
                );
              }
            },
            {
              title: '操作类型',
              align: 'center',
              width: 150,
              dataIndex: 'operation_type',
              render: val => {
                return <span>{logs[val] || '-'}</span>;
              }
            },
            {
              title: '操作时间',
              dataIndex: 'create_time',
              rowKey: 'create_time',
              align: 'center',
              width: 200,
              render: val => {
                return (
                  <span>
                    {moment(val)
                      .locale('zh-cn')
                      .format('YYYY-MM-DD HH:mm:ss')}
                  </span>
                );
              }
            },
            {
              title: '操作内容',
              dataIndex: 'comment',
              render: val => {
                return <span>{logsUtil.fetchLogsContent(val)}</span>;
              }
            }
          ]}
        />
      </Fragment>
    );
  }
}

/* eslint-disable react/sort-comp */
/* eslint-disable no-unused-expressions */
import React, { PureComponent, Fragment } from 'react';
import { connect } from 'dva';
import { Form, Select, DatePicker, Col, Row, Button, Table } from 'antd';
import logsUtil from '@/utils/logs';
import moment from 'moment';

const FormItem = Form.Item;
const { Option } = Select;

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
        //   user_name: 'gradmin'
        // }
      ],
      logsPage: 1,
      logsPageSize: 10,
      logsTotal: 0,
      adminList: []
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

  loadOperationLog = (val = {}) => {
    const {
      dispatch,
      match: {
        params: { eid }
      }
    } = this.props;
    const { logsPage, logsPageSize, name } = this.state;
    dispatch({
      type: 'global/fetchOperationLogs',
      payload: {
        enterprise_id: eid,
        page: logsPage,
        page_size: logsPageSize,
        name: val.user_name || name,
        ...val
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
  disabledDateTime = () => {
    return {
      disabledHours: () => this.range(0, 24).splice(4, 20),
      disabledMinutes: () => this.range(30, 60),
      disabledSeconds: () => [55, 56]
    };
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

  handleSubmit = e => {
    e.preventDefault();
    const { form } = this.props;
    form.validateFields((err, values) => {
      if (!err) {
        const startTime = values.start_time
          ? moment(values.start_time).valueOf()
          : '';
        const endTime = values.end_time
          ? moment(values.end_time).valueOf()
          : '';
        const user_name = values.user_name || '';
        const operation_type = values.operation_type || '';
        this.setState({ loading: true, logsPage: 1 }, () => {
          this.loadOperationLog({
            start_time: startTime,
            end_time: endTime,
            user_name,
            operation_type
          });
        });
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
                {getFieldDecorator('user_name', {
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
                  >
                    <Option key={0} value="">
                      全部
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
                  <Select placeholder="操作类型">
                    <Option key={0} value="">
                      全部
                    </Option>
                    {Object.keys(logs).map(item => (
                      <Option value={item}>{logs[item]}</Option>
                    ))}
                  </Select>
                )}
              </FormItem>
            </Col>
            <Col span={4}>
              <FormItem {...formItemLayout}>
                {getFieldDecorator('start_time', {
                  rules: [{ required: false, message: '请选择开始日期!' }],
                  initialValue: ''
                })(
                  <DatePicker
                    placeholder="请选择开始日期"
                    style={{ width: '100%' }}
                    format="YYYY-MM-DD HH:mm:ss"
                    disabledDate={this.disabledDate}
                    disabledTime={this.disabledDateTime}
                    showTime={{ defaultValue: moment('00:00:00', 'HH:mm:ss') }}
                  />
                )}
              </FormItem>
            </Col>
            <Col span={4}>
              <FormItem {...formItemLayout}>
                {getFieldDecorator('end_time', {
                  rules: [{ required: false, message: '请选择结束日期!' }],
                  initialValue: ''
                })(
                  <DatePicker
                    placeholder="请选择结束日期"
                    style={{ width: '100%' }}
                    format="YYYY-MM-DD HH:mm:ss"
                    disabledDate={this.disabledDate}
                    disabledTime={this.disabledDateTime}
                    showTime={{ defaultValue: moment('00:00:00', 'HH:mm:ss') }}
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
          style={{ background: '#fff' }}
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
              width: 150,
              dataIndex: 'user_name'
            },
            {
              title: '操作类型',
              align: 'center',
              width: 150,
              dataIndex: 'operation_type',
              render: val => {
                return <span>{logs[val]}</span>;
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

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
      name: '',
      page: 1,
      page_size: 10,
      loading: true,
      logList: [],
      logsPage: 1,
      logsPageSize: 10,
      logsTotal: 0,
      adminList: [],
      startTime: '',
      endTime: ''
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
        page: 1
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
    const { logsPage, logsPageSize, name, startTime, endTime } = this.state;

    dispatch({
      type: 'global/fetchOperationLogs',
      payload: {
        enterprise_id: eid,
        page: logsPage,
        page_size: logsPageSize,
        operation_type: 'login_manage',
        name,
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
      this.loadOperationLog();
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
        const name = values.user_name || '';
        this.setState(
          {
            loading: true,
            logsPage: 1,
            startTime,
            endTime,
            name
          },
          () => {
            this.loadOperationLog();
          }
        );
      }
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
            <Col span={4} />
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
              width: 150,
              dataIndex: 'user_name'
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

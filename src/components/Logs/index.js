/* eslint-disable camelcase */
/* eslint-disable react/sort-comp */
/* eslint-disable no-unused-expressions */
import React, { Fragment, PureComponent } from 'react';
import {
  Button,
  Col,
  DatePicker,
  Form,
  Pagination,
  Row,
  Select,
  Table,
  Tag,
  Tooltip
} from 'antd';
import { Link, routerRedux } from 'dva/router';
import { connect } from 'dva';
import moment from 'moment';
import globalUtil from '@/utils/global';
import logsUtil from '@/utils/logs';
import styles from './index.less';
import locale from 'antd/es/date-picker/locale/zh_CN';
import 'moment/locale/zh-cn';
moment.locale('zh-cn');

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
export default class Index extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      page: 1,
      page_size: 999,
      loading: true,
      logList: [],
      logsPage: 1,
      logsPageSize: 10,
      logsTotal: 1,
      adminList: [],
      apps: [],
      startTime: '',
      endTime: '',
      operationType: '',
      service_alias: ''
    };
  }

  componentDidMount() {
    const { views } = this.props;
    if (views === 'app') {
      this.loadComponents();
    }
    this.handleViews();
    this.handleUser();
  }
  handleJump = (url, teamName) => {
    const { dispatch, views } = this.props;
    if (views === 'enterprise' && url && teamName) {
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

  handleViews = () => {
    const { views } = this.props;
    if (views === 'enterprise') {
      this.loadOperationLog();
    } else if (views === 'teams') {
      this.fetchTeamOperationLogs();
    } else {
      this.fetchAppLogs();
    }
  };
  handleUser = () => {
    const { views } = this.props;
    if (views === 'enterprise') {
      this.loadUser();
    } else {
      this.loadMembers();
    }
  };
  handleSearch = name => {
    this.setState(
      {
        name,
        page: 1
      },
      () => {
        this.handleUser();
      }
    );
  };
  handleSearchComponent = service_alias => {
    this.setState(
      {
        service_alias
      },
      () => {
        this.loadComponents();
      }
    );
  };
  handleChange = value => {
    if (value === '') {
      this.setState(
        {
          loading: true,
          name: ''
        },
        () => {
          this.handleViews();
        }
      );
    }
    this.setState(
      {
        loading: true,
        name: value,
        logsPage: 1
      },
      () => {
        this.handleViews();
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
        this.handleViews();
      }
    );
  };
  handleChangeComponent = value => {
    if (value === '') {
      this.setState(
        {
          loading: true,
          service_alias: ''
        },
        () => {
          this.handleViews();
        }
      );
    }
    this.setState(
      {
        loading: true,
        service_alias: value,
        logsPage: 1
      },
      () => {
        this.handleViews();
      }
    );
  };

  fetchTeamOperationLogs = () => {
    const { dispatch } = this.props;
    const { logsPage, logsPageSize, name, startTime, endTime } = this.state;

    dispatch({
      type: 'index/fetchTeamOperationLogs',
      payload: {
        name,
        page: logsPage,
        page_size: logsPageSize,
        start_time: startTime,
        end_time: endTime,
        team_name: globalUtil.getCurrTeamName()
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
  fetchAppLogs = () => {
    const { dispatch, appID } = this.props;
    const {
      logsPage,
      logsPageSize,
      name,
      startTime,
      endTime,
      service_alias
    } = this.state;
    dispatch({
      type: 'groupControl/fetchAppLogs',
      payload: {
        name,
        page: logsPage,
        page_size: logsPageSize,
        start_time: startTime,
        end_time: endTime,
        team_name: globalUtil.getCurrTeamName(),
        group_id: appID,
        service_alias
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

  loadOperationLog = () => {
    const { dispatch, eid } = this.props;
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
    const { dispatch, eid } = this.props;
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
        if (res && res._code === 200) {
          this.setState({ adminList: res.list });
        }
      }
    });
  };

  loadMembers = () => {
    const { dispatch } = this.props;
    const { page, page_size, name } = this.state;
    const teamName = globalUtil.getCurrTeamName();
    const regionName = globalUtil.getCurrRegionName();
    dispatch({
      type: 'teamControl/fetchTeamMember',
      payload: {
        team_name: teamName,
        region_name: regionName,
        page,
        page_size,
        name
      },
      callback: res => {
        if (res && res._code === 200) {
          this.setState({
            adminList: res.list || []
          });
        }
      }
    });
  };
  loadComponents = () => {
    const { dispatch, appID } = this.props;
    const { service_alias } = this.state;
    dispatch({
      type: 'groupControl/fetchApps',
      payload: {
        team_name: globalUtil.getCurrTeamName(),
        region_name: globalUtil.getCurrRegionName(),
        group_id: appID,
        query: service_alias,
        page: 1,
        page_size: 99
      },
      callback: res => {
        if (res && res._code == 200) {
          this.setState({
            loading: false,
            apps: res.list || []
          });
        }
      }
    });
  };

  disabledDate = current => {
    return (
      current &&
      (moment(new Date()).subtract(1, 'years') > current ||
        current > moment().endOf('day'))
    );
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
      this.handleViews();
    });
  };
  onShowSizeChange = (logsPage, logsPageSize) => {
    this.setState(
      {
        logsPage,
        logsPageSize,
        loading: true
      },
      () => {
        this.handleViews();
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
        this.handleViews();
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
            this.handleViews();
          }
        );
      }
    });
  };

  render() {
    const { views, form } = this.props;
    const { getFieldDecorator } = form;
    const {
      loading,
      adminList,
      logList,
      logsPage,
      logsPageSize,
      logsTotal,
      apps
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

    let columns = [
      {
        title: '用户',
        align: 'center',
        width: 200,
        dataIndex: 'real_name',
        render: (val, data) => {
          return (
            <Tooltip
              placement="top"
              title={
                <div>
                  <div>账户：{data.username}</div>
                  <div>邮箱：{data.email}</div>
                </div>
              }
            >
              {val}
            </Tooltip>
          );
        }
      }
    ];
    if (views === 'enterprise') {
      columns.push({
        title: '操作类型',
        align: 'center',
        width: 150,
        dataIndex: 'operation_type',
        render: val => {
          return <span>{logs[val] || '-'}</span>;
        }
      });
    }
    if (views === 'app') {
      columns.push({
        title: '组件名称',
        align: 'center',
        width: 150,
        dataIndex: 'service_cname',
        render: (val, data) => {
          return (
            <div>
              {val ? (
                <Link
                  to={`/team/${globalUtil.getCurrTeamName()}/region/${globalUtil.getCurrRegionName()}/components/${
                    data.service_alias
                  }/overview`}
                >
                  {val}
                </Link>
              ) : (
                '-'
              )}
            </div>
          );
        }
      });
    }
    const operation = [
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
        render: (val, data) => {
          return (
            <span>
              {data.is_openapi && <Tag color="green">OpenAPI</Tag>}
              {logsUtil.fetchLogsContent(val, this.handleJump)}
            </span>
          );
        }
      }
    ];
    columns = [...columns, ...operation];

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
                {getFieldDecorator('username')(
                  <Select
                    showSearch
                    placeholder="请选择用户"
                    defaultActiveFirstOption={false}
                    filterOption={false}
                    notFoundContent={null}
                    onSearch={this.handleSearch}
                    onChange={this.handleChange}
                  >
                    <Option key={0} value="">
                      所有用户
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
            {views === 'enterprise' && (
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
            )}
            {views === 'app' && (
              <Col span={4}>
                <FormItem {...formItemLayout}>
                  {getFieldDecorator('service_alias')(
                    <Select
                      showSearch
                      placeholder="请选择组件"
                      defaultActiveFirstOption={false}
                      filterOption={false}
                      notFoundContent={null}
                      onSearch={this.handleSearchComponent}
                      onChange={this.handleChangeComponent}
                    >
                      <Option key={0} value="">
                        所有组件
                      </Option>
                      {apps &&
                        apps.length > 0 &&
                        apps.map(item => {
                          const { service_alias, service_cname } = item;
                          return (
                            <Option key={service_alias} value={service_alias}>
                              {service_cname}
                            </Option>
                          );
                        })}
                    </Select>
                  )}
                </FormItem>
              </Col>
            )}
            <Col span={8}>
              <FormItem {...formItemLayout}>
                {getFieldDecorator('times', {
                  initialValue: ''
                })(
                  <RangePicker
                    locale={locale}
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
            <Col span={views === 'teams' ? 8 : 4}>
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
          pagination={false}
          dataSource={logList || []}
          columns={columns}
        />
        <Pagination
          style={{ margin: '20px 0', float: 'right' }}
          size="default"
          current={logsPage}
          pageSize={logsPageSize}
          showSizeChanger
          total={Number(logsTotal)}
          defaultCurrent={1}
          onChange={this.onPageChange}
          pageSizeOptions={['5', '10', '20', '50']}
          onShowSizeChange={this.onShowSizeChange}
        />
      </Fragment>
    );
  }
}

/* eslint-disable no-nested-ternary */
/* eslint-disable no-underscore-dangle */
/* eslint-disable camelcase */
/* eslint-disable react/sort-comp */
/* eslint-disable no-unused-expressions */
import globalUtil from '@/utils/global';
import logsUtil from '@/utils/logs';
import {
  Button,
  DatePicker,
  Form,
  Input,
  Pagination,
  Row,
  Select,
  Table,
  Tag,
  Tooltip
} from 'antd';
import locale from 'antd/es/date-picker/locale/zh_CN';
import { connect } from 'dva';
import { Link, routerRedux } from 'dva/router';
import moment from 'moment';
import 'moment/locale/zh-cn';
import React, { Fragment, PureComponent } from 'react';
import styles from './index.less';

moment.locale('zh-cn');

const FormItem = Form.Item;
const { Option } = Select;
const { RangePicker } = DatePicker;
const { Search } = Input;

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
      query: '',
      appId: '',
      page: 1,
      page_size: 999,
      loading: true,
      logList: [],
      logsPage: 1,
      logsPageSize: 10,
      logsTotal: 1,
      adminList: [],
      adminLoading: false,
      apps: [],
      appLoading: false,
      teamQuery: '',
      teamLoading: false,
      teamApps: [],
      teamPage: 1,
      teamPageSize: 999,
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
  handleJump = (url, Info) => {
    const { dispatch, views } = this.props;
    const { teamNameInfo, appObj, componentObj, pluginInfo } = Info;
    if (views === 'enterprise' && url && teamNameInfo) {
      this.fetchDetail(
        'teamControl/joinTeam',
        {
          team_name: teamNameInfo.team_name
        },
        url
      );
    } else if (appObj) {
      this.fetchDetail(
        'groupControl/fetchGroupDetail',
        {
          team_name: appObj.team_name,
          region_name: appObj.region,
          group_id: appObj.app_id
        },
        url
      );
    } else if (componentObj) {
      this.fetchDetail(
        'appControl/fetchDetail',
        {
          team_name: componentObj.team_name,
          app_alias: componentObj.service_alias
        },
        url
      );
    } else if (pluginInfo) {
      this.fetchDetail(
        'plugin/getPluginVersions',
        {
          team_name: pluginInfo.team_name,
          plugin_id: pluginInfo.plugin_id
        },
        url
      );
    } else {
      dispatch(routerRedux.push(url));
    }
  };

  fetchDetail = (type, payload, url) => {
    const { dispatch } = this.props;
    dispatch({
      type,
      payload,
      callback: () => {
        dispatch(routerRedux.push(url));
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
    if (views === 'teams') {
      this.loadApps();
    }
  };
  handleSearch = (name) => {
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
  handleSearchApp = (teamQuery) => {
    this.setState(
      {
        teamQuery,
        teamPage: 1
      },
      () => {
        this.handleUser();
      }
    );
  };
  handleChangeApp = (appId) => {
    this.setState(
      {
        appId
      },
      () => {
        this.handleViews();
      }
    );
  };

  handleSearchComponent = (service_alias) => {
    this.setState(
      {
        service_alias
      },
      () => {
        this.loadComponents();
      }
    );
  };
  handleChange = (value) => {
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

  handleChangeType = (value) => {
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
  handleChangeComponent = (value) => {
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
    const {
      logsPage,
      logsPageSize,
      name,
      startTime,
      endTime,
      query,
      appId
    } = this.state;

    dispatch({
      type: 'index/fetchTeamOperationLogs',
      payload: {
        query,
        name,
        app_id: appId,
        page: logsPage,
        page_size: logsPageSize,
        start_time: startTime,
        end_time: endTime,
        team_name: globalUtil.getCurrTeamName()
      },
      callback: (res) => {
        if (res && res._code === 200) {
          this.setState({
            loading: false,
            logList: res.list,
            logsTotal: res.total || 1
          });
        }
      }
    });
  };
  fetchAppLogs = () => {
    const { dispatch, appID } = this.props;
    const {
      query,
      logsPage,
      logsPageSize,
      name,
      startTime,
      endTime,
      service_alias
    } = this.state;
    dispatch({
      type: 'application/fetchAppLogs',
      payload: {
        query,
        name,
        page: logsPage,
        page_size: logsPageSize,
        start_time: startTime,
        end_time: endTime,
        team_name: globalUtil.getCurrTeamName(),
        group_id: appID,
        service_alias
      },
      callback: (res) => {
        if (res && res._code === 200) {
          this.setState({
            loading: false,
            logList: res.list,
            logsTotal: res.total || 1
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
      operationType,
      query
    } = this.state;
    dispatch({
      type: 'global/fetchOperationLogs',
      payload: {
        query,
        enterprise_id: eid,
        page: logsPage,
        page_size: logsPageSize,
        name,
        start_time: startTime,
        end_time: endTime,
        operation_type: operationType
      },
      callback: (res) => {
        if (res && res._code === 200) {
          this.setState({
            loading: false,
            logList: res.list,
            logsTotal: res.total || 1
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
      callback: (res) => {
        if (res && res._code === 200) {
          this.setState({
            adminList: res.list || [],
            adminLoading: false,
            name: ''
          });
        }
      }
    });
  };
  loadApps = () => {
    const { dispatch } = this.props;
    const { teamPage, teamPageSize, teamQuery } = this.state;
    const teamName = globalUtil.getCurrTeamName();
    const regionName = globalUtil.getCurrRegionName();
    dispatch({
      type: 'global/getTeamAppList',
      payload: {
        team_name: teamName,
        region: regionName,
        query: teamQuery,
        page: teamPage,
        page_size: teamPageSize
      },
      callback: (res) => {
        if (res && res._code === 200) {
          this.setState({
            teamQuery: '',
            teamLoading: false,
            teamApps: res.list
          });
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
      callback: (res) => {
        if (res && res._code === 200) {
          this.setState({
            adminLoading: false,
            name: '',
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
      type: 'application/fetchApps',
      payload: {
        team_name: globalUtil.getCurrTeamName(),
        region_name: globalUtil.getCurrRegionName(),
        group_id: appID,
        query: service_alias,
        page: 1,
        page_size: 99
      },
      callback: (res) => {
        if (res && res._code == 200) {
          this.setState({
            appLoading: false,
            service_alias: '',
            apps: res.list || []
          });
        }
      }
    });
  };

  disabledDate = (current) => {
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

  onPageChange = (logsPage) => {
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
  handleChangeTimes = (values) => {
    let startTime = '';
    let endTime = '';

    if (values && values.length > 1) {
      startTime = moment(values[0])
        .locale('zh-cn')
        .format('YYYY-MM-DD HH:mm:ss');
      endTime = moment(values[1]).locale('zh-cn').format('YYYY-MM-DD HH:mm:ss');
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
  handleSubmit = () => {
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
        const { name = '', operationType = '', query = '' } = values;

        this.setState(
          {
            loading: true,
            logsPage: 1,
            startTime,
            endTime,
            name,
            query,
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
      apps,
      teamApps,
      adminLoading,
      appLoading
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
        render: (val) => {
          return <span>{logs[val] || '-'}</span>;
        }
      });
    }
    if (views === 'teams') {
      columns.push({
        title: '应用名称',
        align: 'center',
        width: 250,
        dataIndex: 'app_name',
        render: (val, data) => {
          return (
            <div>
              {data.is_delete && val ? (
                val
              ) : val ? (
                <Link
                  to={`/team/${globalUtil.getCurrTeamName()}/region/${globalUtil.getCurrRegionName()}/apps/${
                    data.app_id
                  }`}
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
    if (views === 'app') {
      columns.push({
        title: '组件名称',
        align: 'center',
        width: 250,
        dataIndex: 'service_cname',
        render: (val, data) => {
          return (
            <div>
              {data.is_delete && val ? (
                val
              ) : val ? (
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
        render: (val) => {
          return (
            <span>
              {moment(val).locale('zh-cn').format('YYYY-MM-DD HH:mm:ss')}
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
    const marginRight = views === 'teams' ? '8px' : '20px';
    return (
      <Fragment>
        <Form onSubmit={this.handleSubmit}>
          <Row type="flex" align="middle">
            <FormItem {...formItemLayout}>
              {getFieldDecorator('query', {
                initialValue: ''
              })(
                <Search
                  placeholder="请输入操作内容"
                  onSearch={this.handleSubmit}
                  style={{ width: 249, marginRight }}
                />
              )}
            </FormItem>
            <FormItem {...formItemLayout}>
              {getFieldDecorator('name')(
                <Select
                  showSearch
                  placeholder="请选择用户"
                  loading={adminLoading}
                  style={{ width: '178px', marginRight }}
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
                    adminList.map((item) => {
                      const { nick_name, real_name, user_id } = item;
                      return (
                        <Option
                          key={user_id}
                          value={nick_name}
                          title={`${real_name}(${nick_name})`}
                        >
                          {real_name}({nick_name})
                        </Option>
                      );
                    })}
                </Select>
              )}
            </FormItem>
            {views === 'enterprise' && (
              <FormItem {...formItemLayout}>
                {getFieldDecorator('operationType', {
                  rules: [
                    {
                      required: false,
                      message: '请选择操作类型'
                    }
                  ]
                })(
                  <Select
                    placeholder="操作类型"
                    style={{ width: '178px', marginRight }}
                    onChange={this.handleChangeType}
                  >
                    <Option key={0} value="">
                      所有类型
                    </Option>
                    {Object.keys(logs).map((item) => (
                      <Option value={item}>{logs[item]}</Option>
                    ))}
                  </Select>
                )}
              </FormItem>
            )}
            {views === 'teams' && (
              <FormItem {...formItemLayout}>
                {getFieldDecorator('service_alias')(
                  <Select
                    showSearch
                    style={{
                      width: '178px',
                      marginRight
                    }}
                    placeholder="请选择应用"
                    loading={this.state.teamLoading}
                    defaultActiveFirstOption={false}
                    filterOption={false}
                    notFoundContent={null}
                    onSearch={this.handleSearchApp}
                    onChange={this.handleChangeApp}
                  >
                    <Option key={0} value="">
                      所有应用
                    </Option>
                    {teamApps &&
                      teamApps.length > 0 &&
                      teamApps.map((item) => {
                        const { group_id, group_name } = item;
                        return (
                          <Option key={group_id} value={group_id}>
                            {group_name}
                          </Option>
                        );
                      })}
                  </Select>
                )}
              </FormItem>
            )}
            {views === 'app' && (
              <FormItem {...formItemLayout}>
                {getFieldDecorator('service_alias')(
                  <Select
                    showSearch
                    placeholder="请选择组件"
                    style={{ width: '178px', marginRight }}
                    defaultActiveFirstOption={false}
                    filterOption={false}
                    notFoundContent={null}
                    loading={appLoading}
                    onSearch={this.handleSearchComponent}
                    onChange={this.handleChangeComponent}
                  >
                    <Option key={0} value="">
                      所有组件
                    </Option>
                    {apps &&
                      apps.length > 0 &&
                      apps.map((item) => {
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
            )}

            <FormItem {...formItemLayout}>
              {getFieldDecorator('times', {
                initialValue: ''
              })(
                <RangePicker
                  locale={locale}
                  style={{ width: '400px', marginRight }}
                  separator="至"
                  disabledDate={this.disabledDate}
                  onChange={(value) => {
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

            <Button
              onClick={this.handleSubmit}
              type="primary"
              htmlType="submit"
              style={{ marginBottom: '24px' }}
            >
              查询
            </Button>
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

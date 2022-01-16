/* eslint-disable no-underscore-dangle */
/* eslint-disable class-methods-use-this */
/* eslint-disable no-unused-expressions */
/* eslint-disable array-callback-return */
/* eslint-disable camelcase */
/* eslint-disable react/sort-comp */
import { Button, Card, notification } from 'antd';
import { connect } from 'dva';
import PropTypes from 'prop-types';
import React, { Fragment, PureComponent } from 'react';
import globalUtil from '../../utils/global';
import Basic from './component/Basic/index';
import OperationRecord from './component/Basic/operationRecord';
import BuildHistory from './component/BuildHistory/index';
import Instance from './component/Instance/index';

// eslint-disable-next-line react/no-multi-comp
@connect(
  ({ user, appControl }) => ({
    currUser: user.currentUser,
    appRequest: appControl.appRequest,
    appRequestRange: appControl.appRequestRange,
    requestTime: appControl.requestTime,
    requestTimeRange: appControl.requestTimeRange,
    appDisk: appControl.appDisk,
    appMemory: appControl.appMemory
  }),
  null,
  null,
  { withRef: true }
)
export default class Index extends PureComponent {
  constructor(arg) {
    super(arg);
    this.state = {
      logList: [],
      recordLoading: true,
      page: 1,
      page_size: 6,
      // 安装的性能分析插件
      disk: 0,
      memory: 0,
      resourcesLoading: true,
      beanData: null,
      dataList: [],
      runLoading: true,
      new_pods: null,
      old_pods: null,
      more: false,
      current_version: null,
      pages: 1,
      pageSize: 10,
      total: 0,
      isopenLog: false,
      buildSource: null,
      componentTimers: this.props.timers
    };
    this.inerval = 5000;
  }
  static contextTypes = {
    isActionIng: PropTypes.func,
    appRolback: PropTypes.func
  };
  componentDidMount() {
    this.mounted = true;
    this.loadBuildSourceInfo();
    this.fetchAppDiskAndMemory();
    this.getVersionList();
    this.load();
  }

  componentWillReceiveProps(nextProps) {
    const { status: newStatus, timers: newTimers } = nextProps;
    const { status, timers } = this.props;
    if (newStatus !== status) {
      // eslint-disable-next-line react/no-unused-state
      this.setState({ status: newStatus });
    }
    if (newTimers !== timers) {
      this.setState({ componentTimers: newTimers }, () => {
        if (newTimers) {
          this.load();
        } else {
          this.closeTimer();
        }
      });
    }
  }

  componentWillUnmount() {
    this.mounted = false;
    this.closeTimer();
  }
  load = () => {
    this.fetchPods(true);
    this.fetchOperationLog(true);
  };
  closeTimer = () => {
    if (this.fetchOperationLogTimer) {
      clearInterval(this.fetchOperationLogTimer);
    }
    if (this.fetchPodsTimer) {
      clearInterval(this.fetchPodsTimer);
    }
  };

  fetchAppDiskAndMemory() {
    this.props.dispatch({
      type: 'appControl/getAppResource',
      payload: {
        team_name: globalUtil.getCurrTeamName(),
        app_alias: this.props.appAlias
      },
      callback: data => {
        if (data && data.bean) {
          this.setState({
            disk: data.bean.disk || 0,
            memory: data.bean.memory || 0
          });
        }
        this.handleResourcesLoading();
      },
      handleError: err => {
        this.handleResourcesLoading();
        this.handleError(err);
      }
    });
  }
  handleResourcesLoading = () => {
    this.setState({
      resourcesLoading: false
    });
  };

  fetchOperationLog = (isCycle, isopenLog = false) => {
    this.props.dispatch({
      type: 'appControl/fetchOperationLog',
      payload: {
        team_name: globalUtil.getCurrTeamName(),
        app_alias: this.props.appAlias,
        target: 'service',
        page: this.state.page,
        page_size: this.state.page_size
      },
      callback: res => {
        if (res && res.status_code === 200) {
          this.setState(
            {
              isopenLog,
              has_next: res.has_next || false,
              logList: res.list || [],
              recordLoading: false
            },
            () => {
              if (isCycle) {
                this.handleTimers(
                  'fetchOperationLogTimer',
                  () => {
                    this.fetchOperationLog(true);
                  },
                  5000
                );
              }
            }
          );
        }
      },
      handleError: err => {
        this.handleError(err);
        this.handleTimers(
          'fetchOperationLogTimer',
          () => {
            this.fetchOperationLog(true);
          },
          10000
        );
      }
    });
  };

  handleError = err => {
    const { componentTimers } = this.state;
    if (!componentTimers) {
      return null;
    }
    if (err && err.data && err.data.msg_show) {
      notification.warning({
        message: `请求错误`,
        description: err.data.msg_show
      });
    }
  };
  handleTimers = (timerName, callback, times) => {
    const { componentTimers } = this.state;
    if (!componentTimers) {
      return null;
    }
    this[timerName] = setTimeout(() => {
      callback();
    }, times);
  };

  handleNextPage = () => {
    this.setState(
      {
        page: 1,
        page_size: this.state.page_size * (this.state.page + 1)
      },
      () => {
        this.fetchOperationLog(false);
      }
    );
  };
  getStartTime() {
    return new Date().getTime() / 1000 - 60 * 60;
  }
  getStep() {
    return 60;
  }

  handleRollback = data => {
    this.context.appRolback(data);
  };

  onAction = () => {
    this.fetchOperationLog(false);
    this.getVersionList();
  };
  onLogPush = isopen => {
    this.fetchOperationLog(false, isopen);
  };

  handleDel = item => {
    this.props.dispatch({
      type: 'appControl/delAppVersion',
      payload: {
        team_name: globalUtil.getCurrTeamName(),
        service_alias: this.props.appAlias,
        version_id: item.build_version
      },
      callback: res => {
        if (res) {
          notification.success({
            message: '删除成功'
          });
          this.getVersionList();
        }
      }
    });
  };
  onPageChange = pages => {
    this.setState(
      {
        pages
      },
      () => {
        this.getVersionList();
      }
    );
  };
  onShowSizeChange = (pages, pageSize) => {
    this.setState(
      {
        pages,
        pageSize
      },
      () => {
        this.getVersionList();
      }
    );
  };
  getVersionList = update => {
    const { setShowUpgrade, appAlias, dispatch } = this.props;
    update && setShowUpgrade();

    const { pages, pageSize } = this.state;
    dispatch({
      type: 'appControl/getAppVersionList',
      payload: {
        team_name: globalUtil.getCurrTeamName(),
        service_alias: appAlias,
        page_num: pages,
        page_size: pageSize
      },
      callback: data => {
        if (data && data.bean && data.list) {
          // eslint-disable-next-line no-shadow
          const { bean, list, total = 0 } = data;
          let beanobj = null;
          list.length > 0 &&
            list.map(item => {
              if (item.build_version === bean.current_version) {
                beanobj = item;
              }
            });
          this.setState({
            current_version: bean.current_version,
            beanData: beanobj,
            dataList: list,
            // eslint-disable-next-line react/no-unused-state
            total
          });
        }
      }
    });
  };

  loadBuildSourceInfo = () => {
    const { dispatch } = this.props;
    dispatch({
      type: 'appControl/getAppBuidSource',
      payload: {
        team_name: globalUtil.getCurrTeamName(),
        service_alias: this.props.appAlias
      },
      callback: data => {
        if (data) {
          this.setState({
            buildSource:
              data.bean && data.bean.service_source && data.bean.service_source
          });
        }
      }
    });
  };

  fetchPods = isCycle => {
    const { appAlias, dispatch } = this.props;
    dispatch({
      type: 'appControl/fetchPods',
      payload: {
        team_name: globalUtil.getCurrTeamName(),
        app_alias: appAlias
      },
      callback: res => {
        if (res && res.status_code === 200) {
          this.setState(
            {
              new_pods: res.list.new_pods,
              old_pods: res.list.old_pods,
              runLoading: false
            },
            () => {
              if (isCycle) {
                this.handleTimers(
                  'fetchPodsTimer',
                  () => {
                    this.fetchPods(true);
                  },
                  5000
                );
              }
            }
          );
        }
      },
      handleError: err => {
        this.handleError(err);
        this.handleTimers(
          'fetchPodsTimer',
          () => {
            this.fetchPods(true);
          },
          10000
        );
      }
    });
  };

  handleMore = more => {
    this.setState({
      more
    });
  };

  render() {
    const { status, componentPermissions, socket } = this.props;
    const {
      resourcesLoading,
      logList,
      memory,
      beanData,
      dataList,
      new_pods,
      old_pods,
      runLoading,
      more,
      disk,
      buildSource,
      isopenLog,
      recordLoading,
      has_next,
      current_version,
      pages,
      pageSize,
      total
    } = this.state;
    return (
      <Fragment>
        <Basic
          buildSource={buildSource}
          beanData={beanData}
          resourcesLoading={resourcesLoading}
          memory={memory}
          disk={disk}
          dataList={dataList}
          status={status}
          onPageChange={this.onPageChange}
          handleMore={this.handleMore}
          more={more}
          socket={socket && socket}
        />
        {more && (
          <BuildHistory
            componentPermissions={componentPermissions}
            beanData={beanData}
            current_version={current_version}
            dataList={dataList}
            onPageChange={this.onPageChange}
            onShowSizeChange={this.onShowSizeChange}
            appAlias={this.props.appAlias}
            reload={this.getVersionList}
            handleDel={this.handleDel}
            onRollback={this.handleRollback}
            socket={socket && socket}
            pages={pages}
            pageSize={pageSize}
            total={total}
          />
        )}
        {!more && (
          <Card
            bordered={0}
            loading={runLoading}
            title="运行实例"
            style={{ margin: '20px 0', minHeight: '170px' }}
            bodyStyle={{ padding: '0', background: '#F0F2F5' }}
          >
            <Instance
              status={status}
              runLoading={runLoading}
              new_pods={new_pods}
              old_pods={old_pods}
              appAlias={this.props.appAlias}
              socket={socket && socket}
            />
          </Card>
        )}
        {!more && (
          <OperationRecord
            socket={socket && socket}
            isopenLog={isopenLog}
            onLogPush={this.onLogPush}
            has_next={has_next}
            logList={logList}
            recordLoading={recordLoading}
            handleNextPage={this.handleNextPage}
          />
        )}
      </Fragment>
    );
  }
}

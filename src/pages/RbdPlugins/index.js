import React, { Component } from 'react';
import { Spin, Card, Button } from 'antd';
import { connect } from 'dva';
import { importAppPagePlugin } from '../../utils/importPlugins';
import { getRainbondInfo } from '../../services/api';
import PageHeaderLayout from '../../layouts/PageHeaderLayout';
import RbdPluginsCom from '../../components/RBDPluginsCom'
import Global from '@/utils/global';
import PluginUtil from '../../utils/pulginUtils';
import styles from './index.less';

@connect(({ user, teamControl, global }) => ({
  user: user.currentUser,
}))
export default class Index extends Component {
  constructor(props) {
    super(props);
    this.state = {
      app: {},
      plugins: {},
      loading: true,
      pluginLoading: true,
      error: false,
      errInfo: '',
    };
  }

  componentDidMount() {
    this.getPluginsList();
  }

  importPlugin = (meta, regionName) => {
    importAppPagePlugin(meta, regionName, 'enterprise').then(res => {
      this.setState({ app: res, pluginLoading: false })
    }).catch(err => {
      this.setState({
        errInfo: err?.response?.data?.message || err?.message || "An unexpected error occurred.",
        pluginLoading: false,
        error: true
      })
    })
  }
  getPluginsList = () => {
    const type = PluginUtil.getCurrentViewPosition(window.location.href);
    type === 'Platform' ? this.loadEnterpriseClusters() : this.loadPluginList();
  };

  loadEnterpriseClusters = () => {
    const { dispatch } = this.props;
    const enterpriseId = Global.getCurrEnterpriseId();

    dispatch({
      type: 'region/fetchEnterpriseClusters',
      payload: { enterprise_id: enterpriseId },
      callback: (res) => {
        if (res.status_code === 200 && res.list?.[0]?.region_name) {
          this.loadPluginList(res.list[0].region_name);
        }
      },
    });
  };

  loadPluginList = (regionName) => {
    const {
      dispatch,
      match,
      isCom,
      user,
    } = this.props;
    let pluginId= ''
    if(isCom){
      pluginId = Global.getComponentPluginType()
    }else{
      pluginId = match.params.pluginId
    }
    const enterpriseId = Global.getCurrEnterpriseId() || user?.enterprise_id;
    const currentRegionName = regionName || Global.getCurrRegionName();
    dispatch({
      type: 'global/getPluginList',
      payload: { enterprise_id: enterpriseId, region_name: currentRegionName },
      callback: (res) => {
        if (res && res.list) {
          const plugin = res.list.find((item) => item.name === pluginId) || {};
          this.setState({ plugins: plugin, loading: false }, () => {
            if (plugin.plugin_type === 'JSInject') {
              this.importPlugin(plugin, regionName);
            }
          });
        }
      },
      handleError: () => {
        this.setState({ plugins: {}, loading: false });
      },
    });
  };
  render() {
    const { plugins, loading } = this.state;
    const {isCom = false} = this.props
    return (
      <>
        {!loading ? (
          isCom ? 
          <RbdPluginsCom {...this.state}/> 
          :
          <PageHeaderLayout title={plugins?.name} content={plugins?.description} pluginSVg={plugins?.icon}>
            <RbdPluginsCom {...this.state}/>
          </PageHeaderLayout>
        ) : (
          <div style={{ width: '100%', height: 500, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <Spin size="large" />
          </div>
        )}
      </>
    );
  }
}

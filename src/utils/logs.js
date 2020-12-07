/* eslint-disable react/react-in-jsx-scope */
import { Link } from 'dva/router';

const OperationType = {
  enterprise_manage: '企业管理',
  cluster_manage: '集群管理',
  component_library_manage: '组件库管理',
  team_manage: '团队管理',
  application_manage: '应用管理',
  component_manage: '组件管理'
};
// 企业视图： "enterprise"
// 团队视图： "team"
// 应用视图： "app"
// 组件视图： "component"
// 插件视图： "plugin"

export default {
  fetchOperationType() {
    return OperationType;
  },
  // eslint-disable-next-line consistent-return
  fetchLogsContent(val) {
    const start = val.indexOf('<<');
    if (start > -1) {
      return this.fetchInterception(val, '');
    }
    return (
      // eslint-disable-next-line react/react-in-jsx-scope
      <div>{val}</div>
    );
  },
  fetchInterception(val, boxs) {
    const start = val.indexOf('<<');
    const end = val.indexOf('>>');
    const startVal = val.substring(0, start);
    const obj = JSON.parse(val.substring(start + 2, end));
    const nextVal = val.substring(end + 2);
    let url = '';
    if (obj && obj.view_type) {
      url = this.fetchViewType(obj);
    }
    let box = (
      <span>
        {boxs}
        {startVal}
        <Link to={url}>{obj.name}</Link>
      </span>
    );
    if (nextVal && nextVal.indexOf('>>') > -1) {
      return this.fetchInterception(nextVal, box);
    }
    if (nextVal) {
      box = (
        <span>
          {box}
          {nextVal}
        </span>
      );
    }

    return box;
  },
  fetchViewType(obj) {
    let url = '';
    if (obj.view_type === 'enterprise') {
      url = `/enterprise/${obj.eid}/index`;
    } else if (obj.view_type === 'team') {
      url = `/team/${obj.team_name}/region/${obj.region}/index`;
    } else if (obj.view_type === 'app') {
      url = `/team/${obj.team_name}/region/${obj.region}/apps${obj.app_id}`;
    } else if (obj.view_type === 'component') {
      url = `/team/${obj.team_name}/region/${obj.region}/components/${obj.service_alias}/overview`;
    } else if (obj.view_type === 'plugin') {
      url = `/team/${obj.team_name}/region/${obj.region}/myplugns/${obj.plugin_id}`;
    }
    return url;
  }
};

/* eslint-disable react/react-in-jsx-scope */

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
  fetchLogsContent(val, handleJump) {
    const start = val.indexOf('<<{');
    if (start > -1) {
      return this.fetchInterception(val, '', handleJump);
    }
    return (
      // eslint-disable-next-line react/react-in-jsx-scope
      <span>{val}</span>
    );
  },
  fetchInterception(val, boxs, handleJump) {
    const start = val.indexOf('<<{');
    const end = val.indexOf('}>>');
    const startVal = val.substring(0, start);
    const obj = JSON.parse(val.substring(start + 2, end + 1));
    const nextVal = val.substring(end + 3);
    let url = '';
    if (obj) {
      url = this.fetchViewType(obj);
    }
    let box = (
      <span>
        {boxs}
        {startVal}
        <a
          href="javascript:;"
          onClick={(event) => {
            event.stopPropagation();
            // eslint-disable-next-line no-unused-expressions
            let teamNameInfo;
            let appObj;
            let componentObj;
            let pluginInfo;

            if (obj) {
              if (
                (obj.view_type === 'team' ||
                  obj.view_type === 'team_application') &&
                obj.team_name
              ) {
                teamNameInfo = obj;
              } else if (obj && obj.view_type === 'app' && obj.app_id) {
                appObj = obj;
              } else if (obj.view_type === 'component' && obj.service_alias) {
                componentObj = obj;
              } else if (obj.view_type === 'plugin' && obj.plugin_id) {
                pluginInfo = obj;
              }
            }

            const Info = {
              teamNameInfo,
              appObj,
              componentObj,
              pluginInfo
            };
            // eslint-disable-next-line no-unused-expressions
            handleJump && handleJump(url, Info);
          }}
        >
          {obj.name}
        </a>
      </span>
    );
    if (nextVal && nextVal.indexOf('}>>') > -1) {
      return this.fetchInterception(nextVal, box, handleJump);
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
  fetchViewType(obj = {}) {
    let url = '';
    if (obj.eid) {
      url = `/enterprise/${obj.eid}/index`;
    } else if (obj.team_name && obj.region && obj.app_id) {
      url = `/team/${obj.team_name}/region/${obj.region}/apps/${obj.app_id}`;
    } else if (obj.team_name && obj.region && obj.service_alias) {
      url = `/team/${obj.team_name}/region/${obj.region}/components/${obj.service_alias}/overview`;
    } else if (obj.team_name && obj.region && obj.plugin_id) {
      url = `/team/${obj.team_name}/region/${obj.region}/myplugns/${obj.plugin_id}`;
    } else if (obj.team_name && obj.region) {
      if (obj.view_type && obj.view_type === 'team_application') {
        url = `/team/${obj.team_name}/region/${obj.region}/team`;
      } else {
        url = `/team/${obj.team_name}/region/${obj.region}/index`;
      }
    }
    return url;
  }
};

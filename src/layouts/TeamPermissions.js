import { notification } from 'antd';
import { connect } from 'dva';
import React from 'react';
import router from 'umi/router';
import JoinTeam from '../components/JoinTeam';
import PageLoading from '../components/PageLoading';
import Exception from '../pages/Exception/403';
import roleUtil from '../utils/role';
import userUtil from '../utils/user';

class TeamPermissions extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      joinTeam: false,
      teamView: true,
      joinTeamLoading: false,
      loading: true,
      eid: ''
    };
  }
  componentWillMount() {
    this.fetchUserInfo();
  }

  fetchUserInfo = () => {
    const { dispatch } = this.props;
    const { teamName } = this.props.match.params;
    if (teamName) {
      dispatch({
        type: 'user/fetchCurrent',
        callback: res => {
          if (res && res.status_code === 200) {
            this.setState(
              {
                eid: res.bean && res.bean.enterprise_id
              },
              () => {
                this.handleResults(res.bean.teams, teamName);
              }
            );
          }
        },
        handleError: () => {
          this.setState({
            loading: false,
            teamView: false
          });
        }
      });
    }
  };

  handleResults = (teams, teamName) => {
    const { dispatch } = this.props;
    const teamPermissions = userUtil.getTeamByTeamPermissions(teams, teamName);
    if (teamPermissions && teamPermissions.length === 0) {
      this.setState({
        loading: false,
        teamView: true,
        joinTeam: true
      });
    } else {
      dispatch({
        type: 'teamControl/fetchCurrentTeamPermissions',
        payload: teamPermissions
      });
      const results = roleUtil.queryTeamUserPermissionsInfo(
        teamPermissions,
        'teamBasicInfo',
        'describe'
      );
      this.setState({ teamView: results, loading: false });
    }
  };

  handleJoinTeam = values => {
    this.setState({ joinTeamLoading: true });
    const { dispatch } = this.props;
    const { eid } = this.state;
    dispatch({
      type: 'global/joinTeam',
      payload: values,
      callback: () => {
        notification.success({ message: '申请成功，请等待审核' });
        router.push(`/enterprise/${eid}/teams`);
      }
    });
  };
  cancelJoinTeam = () => {
    return router.go(-1);
  };

  render() {
    const { children } = this.props;
    const { teamView, loading, joinTeam, eid, joinTeamLoading } = this.state;
    if (loading) {
      return <PageLoading />;
    }
    if (!teamView) {
      return <Exception />;
    }

    return (
      <div>
        {joinTeam ? (
          <JoinTeam
            title="请先加入团队"
            enterpriseID={eid}
            loading={joinTeamLoading}
            onOk={this.handleJoinTeam}
            onCancel={this.cancelJoinTeam}
          />
        ) : (
          <div>{children}</div>
        )}
      </div>
    );
  }
}

export default connect()(TeamPermissions);

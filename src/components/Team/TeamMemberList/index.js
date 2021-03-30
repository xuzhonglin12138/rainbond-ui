import { Card, notification } from 'antd';
import { connect } from 'dva';
import React, { PureComponent } from 'react';
import globalUtil from '../../../utils/global';
import userUtil from '../../../utils/user';
import AddMember from '../../AddMember';
import ConfirmModal from '../../ConfirmModal';
import ScrollerX from '../../ScrollerX';
import TeamMemberTable from '../../TeamMemberTable';

@connect(({ teamControl }) => ({
  regions: teamControl.regions,
  currentTeam: teamControl.currentTeam
}))
export default class MemberList extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      showAddMember: false,
      toDeleteMember: null,
      toMoveTeam: null,
      moveTeamLoading: false,
      page: 1,
      pageSize: 8,
      total: 0,
      members: []
    };
  }
  componentDidMount() {
    this.loadMembers();
  }
  onMoveTeam = member => {
    this.setState({ toMoveTeam: member });
  };
  onDelMember = member => {
    this.setState({ toDeleteMember: member });
  };
  onEditAction = member => {
    this.setState({ toEditAction: member });
  };
  hideMoveTeam = () => {
    this.setState({ toMoveTeam: null, moveTeamLoading: false });
  };
  handleMoveTeam = () => {
    this.setState({ moveTeamLoading: true });
    this.props.dispatch({
      type: 'teamControl/moveTeam',
      payload: {
        team_name: globalUtil.getCurrTeamName(),
        user_name: this.state.toMoveTeam.user_name,
        user_id: this.state.toMoveTeam.user_id
      },
      callback: res => {
        let message = '';
        if (res && res.status_code == 200 && res.msg_show) {
          message = res.msg_show;
          this.updateCurrentUser();
        }
        this.loadMembers();
        setTimeout(() => {
          this.hideMoveTeam();
          if (message) {
            notification.success({
              message
            });
          }
        }, 3000);
      }
    });
  };

  updateCurrentUser = () => {
    const { dispatch } = this.props;
    dispatch({
      type: 'user/fetchCurrent',
      callback: res => {
        if (res && res._code === 200) {
          const team = userUtil.getTeamByTeamName(
            res.bean,
            globalUtil.getCurrTeamName()
          );
          dispatch({ type: 'teamControl/fetchCurrentTeam', payload: team });
        }
      }
    });
  };
  hideEditAction = () => {
    this.setState({ toEditAction: null });
  };
  handleEditAction = data => {
    const toEditMember = this.state.toEditAction;
    this.props.dispatch({
      type: 'teamControl/editMember',
      payload: {
        team_name: globalUtil.getCurrTeamName(),
        user_id: toEditMember.user_id,
        role_ids: data.role_ids
      },
      callback: () => {
        this.loadMembers();
        this.hideEditAction();
      }
    });
  };
  showAddMember = () => {
    this.setState({ showAddMember: true });
  };
  hideAddMember = () => {
    this.setState({ showAddMember: false });
  };
  handleAddMember = values => {
    this.props.dispatch({
      type: 'teamControl/addMember',
      payload: {
        team_name: globalUtil.getCurrTeamName(),
        user_ids: values.user_ids.map(item => item.key).join(','),
        role_ids: values.role_ids.join(',')
      },
      callback: () => {
        this.loadMembers();
        this.hideAddMember();
      }
    });
  };
  hideDelMember = () => {
    this.setState({ toDeleteMember: null });
  };
  handleDelMember = () => {
    this.props.dispatch({
      type: 'teamControl/delMember',
      payload: {
        team_name: globalUtil.getCurrTeamName(),
        user_ids: this.state.toDeleteMember.user_id
      },
      callback: () => {
        this.loadMembers();
        this.hideDelMember();
      }
    });
  };
  loadMembers = () => {
    const { dispatch } = this.props;
    const teamName = globalUtil.getCurrTeamName();
    const regionName = globalUtil.getCurrRegionName();
    dispatch({
      type: 'teamControl/fetchTeamMember',
      payload: {
        team_name: teamName,
        region_name: regionName,
        page_size: this.state.pageSize,
        page: this.state.page
      },
      callback: data => {
        if (data) {
          this.setState({
            members: data.list || [],
            total: data.total
          });
        }
      }
    });
  };
  hanldePageChange = page => {
    this.setState({ page }, () => {
      this.loadMembers();
    });
  };
  render() {
    const {
      currentTeam,
      memberPermissions,
      memberPermissions: { isCreate }
    } = this.props;
    const {
      showAddMember,
      members,
      roles,
      toEditAction,
      toDeleteMember,
      toMoveTeam,
      moveTeamLoading,
      page,
      pageSize,
      total
    } = this.state;
    const pagination = {
      current: page,
      pageSize,
      total,
      onChange: v => {
        this.hanldePageChange(v);
      }
    };
    return (
      <div>
        <Card
          style={{
            marginBottom: 24
          }}
          bodyStyle={{
            paddingTop: 12
          }}
          bordered={false}
          title="团队成员"
          extra={
            isCreate && (
              <a href="javascript:;" onClick={this.showAddMember}>
                添加成员
              </a>
            )
          }
        >
          <ScrollerX sm={600}>
            <TeamMemberTable
              memberPermissions={memberPermissions}
              pagination={pagination}
              team={currentTeam}
              onMoveTeam={this.onMoveTeam}
              onDelete={this.onDelMember}
              onEditAction={this.onEditAction}
              list={members}
            />
          </ScrollerX>
        </Card>
        {showAddMember && (
          <AddMember
            roles={roles}
            onOk={this.handleAddMember}
            onCancel={this.hideAddMember}
          />
        )}

        {toEditAction && (
          <AddMember
            roles={roles}
            data={toEditAction}
            onOk={this.handleEditAction}
            onCancel={this.hideEditAction}
          />
        )}
        {toDeleteMember && (
          <ConfirmModal
            onOk={this.handleDelMember}
            title="删除成员"
            subDesc="此操作不可恢复"
            desc="确定要删除此成员吗？"
            onCancel={this.hideDelMember}
          />
        )}
        {toMoveTeam && (
          <ConfirmModal
            onOk={this.handleMoveTeam}
            loading={moveTeamLoading}
            title="移交团队"
            subDesc="移交后您将失去所有权"
            desc={`确定要把团队移交给 ${toMoveTeam.nick_name} 吗？`}
            onCancel={this.hideMoveTeam}
          />
        )}
      </div>
    );
  }
}

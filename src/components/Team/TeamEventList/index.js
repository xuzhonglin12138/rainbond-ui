/* eslint-disable camelcase */
import Logs from '@/components/Logs';
import { Card, Col, Form, Modal, Popconfirm, Row, Select, Table } from 'antd';
import { connect } from 'dva';
import React, { Fragment, PureComponent } from 'react';
import globalUtil from '../../../utils/global';
import roleUtil from '../../../utils/role';
import styles from './index.less';

const { Option } = Select;
const FormItem = Form.Item;

@Form.create()
@connect(({ teamControl, loading, user }) => ({
  regions: teamControl.regions,
  currUser: user.currentUser,
  activitiesLoading: loading.effects['activities/fetchList']
}))
export default class EventList extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      page: 1,
      page_size: 5,
      total: 1,
      roles: [],
      joinUsers: [],
      joinSettingShow: false,
      joinUser: null
    };
  }
  componentDidMount() {
    this.loadJoinUsers();
    this.loadRoles();
  }
  onPageChange = page => {
    this.setState({ page }, () => {
      this.loadJoinUsers();
    });
  };
  loadRoles = () => {
    const { dispatch } = this.props;
    dispatch({
      type: 'teamControl/fetchTeamRoles',
      payload: {
        team_name: globalUtil.getCurrTeamName(),
        page: 1,
        page_size: 10000
      },
      callback: data => {
        if (data) {
          let defaultUserRole = '';
          if (data.list) {
            data.list.map(item => {
              if (item.name.indexOf('开发') !== -1) {
                defaultUserRole = item.ID;
              }
              return item;
            });
          }
          this.setState({
            roles: data.list || [],
            defaultUserRole
          });
        }
      }
    });
  };
  loadJoinUsers = () => {
    const teamName = globalUtil.getCurrTeamName();
    const { page, page_size } = this.state;
    this.props.dispatch({
      type: 'teamControl/getJoinTeamUsers',
      payload: {
        page_size,
        page_num: page,
        team_name: teamName
      },
      callback: data => {
        if (data) {
          this.setState({
            total: data.total,
            joinUsers: data.list || []
          });
        }
      }
    });
  };

  handleRefused = data => {
    this.props.dispatch({
      type: 'teamControl/setJoinTeamUsers',
      payload: {
        team_name: globalUtil.getCurrTeamName(),
        user_id: data.user_id,
        action: false
      },
      callback: () => {
        this.loadJoinUsers();
      }
    });
  };
  handleJoinShow = data => {
    this.setState({ joinSettingShow: true, joinUser: data });
  };
  hideJoinShow = () => {
    this.setState({ joinSettingShow: false, joinUser: null });
  };
  handleJoin = () => {
    const { joinUser } = this.state;
    const { form } = this.props;
    form.validateFields((err, values) => {
      if (!err) {
        this.props.dispatch({
          type: 'teamControl/setJoinTeamUsers',
          payload: {
            team_name: globalUtil.getCurrTeamName(),
            user_id: joinUser.user_id,
            role_ids: values.role_ids,
            action: true
          },
          callback: () => {
            this.hideJoinShow();
            this.loadJoinUsers();
          }
        });
      }
    });
  };

  render() {
    const {
      activitiesLoading,
      memberPermissions: { isCreate },
      form
    } = this.props;
    const { joinSettingShow, roles, defaultUserRole, joinUsers } = this.state;
    const { getFieldDecorator } = form;

    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 6 }
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 14 }
      }
    };
    return (
      <div>
        <Row gutter={24}>
          {joinUsers.length > 0 && (
            <Col md={24} sm={24}>
              <Card
                bodyStyle={{
                  paddingTop: 12
                }}
                bordered={false}
                title="以下用户申请加入团队"
              >
                <Table
                  pagination={{
                    current: this.state.page,
                    pageSize: this.state.page_size,
                    total: this.state.total,
                    onChange: this.onPageChange
                  }}
                  dataSource={joinUsers}
                  columns={[
                    {
                      title: '用户',
                      dataIndex: 'user_name'
                    },
                    {
                      title: '申请时间',
                      dataIndex: 'apply_time'
                    },
                    {
                      title: '操作',
                      dataIndex: '',
                      render: (v, data) =>
                        data.is_pass === 0 &&
                        isCreate && (
                          <Fragment>
                            <span
                              className={styles.linkText}
                              onClick={() => this.handleJoinShow(data)}
                            >
                              通过
                            </span>
                            <Popconfirm
                              title="确定要拒绝用户么?"
                              onConfirm={() => {
                                this.handleRefused(data);
                              }}
                            >
                              <span
                                className={styles.linkText}
                                style={{
                                  marginLeft: 6
                                }}
                              >
                                拒绝
                              </span>
                            </Popconfirm>
                          </Fragment>
                        )
                    }
                  ]}
                />
              </Card>
            </Col>
          )}
          <Col md={24} sm={24} style={{ marginTop: '20px' }}>
            <Card
              bodyStyle={{
                paddingTop: 12
              }}
              bordered={false}
              title="动态"
              loading={activitiesLoading}
            >
              <Logs views="teams" />
            </Card>
          </Col>
        </Row>
        {joinSettingShow && (
          <Modal
            title="用户授权"
            visible
            onOk={this.handleJoin}
            onCancel={this.hideJoinShow}
          >
            <Form>
              <FormItem {...formItemLayout} label="选择角色">
                {getFieldDecorator('role_ids', {
                  initialValue: [defaultUserRole],
                  rules: [
                    {
                      required: true,
                      message: '请选择角色'
                    }
                  ]
                })(
                  <Select
                    getPopupContainer={triggerNode => triggerNode.parentNode}
                    mode="multiple"
                    placeholder="请选择角色"
                    style={{ width: '100%' }}
                  >
                    {roles.map(item => {
                      const { ID, name } = item;
                      return (
                        <Option key={ID} value={ID}>
                          {roleUtil.actionMap(name)}
                        </Option>
                      );
                    })}
                  </Select>
                )}
              </FormItem>
            </Form>
          </Modal>
        )}
      </div>
    );
  }
}

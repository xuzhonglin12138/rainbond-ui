/* eslint-disable react/jsx-no-target-blank */
/* eslint-disable import/extensions */
/* eslint-disable no-underscore-dangle */
/* eslint-disable class-methods-use-this */
/* eslint-disable react/sort-comp */
/* eslint-disable prettier/prettier */
import rainbondUtil from '@/utils/rainbond';
import {
  Avatar,
  Button,
  Dropdown,
  Icon,
  Layout,
  Menu,
  notification,
  Popconfirm,
  Spin
} from 'antd';
import { connect } from 'dva';
import { routerRedux } from 'dva/router';
import Debounce from 'lodash-decorators/debounce';
import React, { PureComponent } from 'react';
import userIcon from '../../../public/images/user-icon-small.png';
import { setNewbieGuide } from '../../services/api';
import ChangePassword from '../ChangePassword';
import NoticeIcon from '../NoticeIcon';
import styles from './index.less';

const { Header } = Layout;
@connect(({ user, global, appControl, order }) => ({
  rainbondInfo: global.rainbondInfo,
  appDetail: appControl.appDetail,
  currentUser: user.currentUser,
  enterprise: global.enterprise,
  enterpriseServiceInfo: order.enterpriseServiceInfo,
  messageList: global.messageList,
  systemList: global.systemList,
  systemTotal: global.systemTotal,
  alertList: global.alertList,
  alertTotal: global.alertTotal
}))
export default class GlobalHeader extends PureComponent {
  constructor(props) {
    super(props);
    const { enterprise } = this.props;
    this.state = {
      isNewbieGuide: false && rainbondUtil.isEnableNewbieGuide(enterprise),
      showChangePassword: false,
      systemLoading: true,
      alertLoading: true
    };
  }

  componentDidMount() {
    this.loadSystemMessages();
    this.loadAlertMessages();
  }

  loadSystemMessages = () => {
    const { dispatch } = this.props;
    dispatch({
      type: 'global/fetchSystemMessages',
      payload: {
        page: 1,
        page_size: 5,
        is_read: 'False',
        create_time: '',
        category: 'system'
      },
      callback: res => {
        if (res && res._code === 200) {
          this.setState({
            systemLoading: false
          });
        }
      }
    });
  };
  loadAlertMessages = () => {
    const { dispatch } = this.props;
    dispatch({
      type: 'global/fetchAlertMessages',
      payload: {
        page: 1,
        page_size: 5,
        is_read: 'False',
        create_time: '',
        category: 'alert'
      },
      callback: res => {
        if (res && res._code === 200) {
          this.setState({
            alertLoading: false
          });
        }
      }
    });
  };

  handleMenuClick = ({ key }) => {
    const { dispatch } = this.props;
    if (key === 'userCenter') {
      dispatch(routerRedux.push(`/account/center`));
    }
    if (key === 'cpw') {
      this.showChangePass();
    }
    if (key === 'logout') {
      dispatch({ type: 'user/logout' });
    }
  };
  showChangePass = () => {
    this.setState({ showChangePassword: true });
  };
  cancelChangePass = () => {
    this.setState({ showChangePassword: false });
  };
  handleChangePass = vals => {
    this.props.dispatch({
      type: 'user/changePass',
      payload: {
        ...vals
      },
      callback: () => {
        notification.success({ message: '修改成功，请重新登录' });
      }
    });
  };

  toggle = () => {
    const { collapsed, onCollapse } = this.props;
    onCollapse(!collapsed);
  };
  @Debounce(600)
  handleVip = () => {
    const { dispatch, eid } = this.props;
    dispatch(routerRedux.push(`/enterprise/${eid}/orders/overviewService`));
  };
  handlIsOpenNewbieGuide = () => {
    const { eid, dispatch } = this.props;
    setNewbieGuide({
      enterprise_id: eid,
      data: {
        NEWBIE_GUIDE: { enable: false, value: '' }
      }
    }).then(() => {
      notification.success({
        message: '关闭成功'
      });
      dispatch({
        type: 'global/fetchEnterpriseInfo',
        payload: {
          enterprise_id: eid
        },
        callback: info => {
          if (info && info.bean) {
            this.setState({
              isNewbieGuide: rainbondUtil.isEnableNewbieGuide(info.bean)
            });
          }
        }
      });
    });
  };
  handleJump = tabType => {
    const { dispatch } = this.props;
    const type = tabType.indexOf('alertInfo') > -1 ? 'alarm' : 'notice';
    dispatch(routerRedux.push(`/information/management/${type}/all`));
  };

  render() {
    const {
      currentUser,
      customHeader,
      rainbondInfo,
      collapsed,
      alertList,
      systemList,
      alertTotal,
      systemTotal,
      enterpriseServiceInfo
    } = this.props;
    const { systemLoading, alertLoading, isNewbieGuide } = this.state;
    const total = alertTotal + systemTotal;
    if (!currentUser) {
      return null;
    }
    const emptyImage = (
      <svg width="75px" height="73px" viewBox="0 0 75 73" version="1.1">
        <g
          id="Ant-Design-Pro-3.0"
          stroke="none"
          strokeWidth="1"
          fill="none"
          fillRule="evenodd"
        >
          <g id="通知为空" transform="translate(-1161.000000, -172.000000)">
            <g id="Group-26-Copy" transform="translate(1031.000000, 44.000000)">
              <g id="bells-(1)" transform="translate(130.000000, 128.000000)">
                <path
                  d="M60.4865,49.018595 L58.824,49.018595 L58.824,22.6239669 C58.824,12.9262978 51.449625,4.94310111 41.9615,3.88849432 L41.9615,2.1209969 C41.9615,0.948556947 41.0055625,0 39.824,0 C38.6424375,0 37.6865,0.948556947 37.6865,2.1209969 L37.6865,3.88849432 C28.198375,4.94310111 20.824,12.9262978 20.824,22.6239669 L20.824,49.018595 L19.1615,49.018595 C17.9799375,49.018595 17.024,49.967152 17.024,51.1395919 C17.024,52.3120319 17.9799375,53.2605888 19.1615,53.2605888 L35.549,53.2605888 L35.549,56.0885847 C35.549,58.4334646 37.460875,60.3305785 39.824,60.3305785 C42.187125,60.3305785 44.099,58.4334646 44.099,56.0885847 L44.099,53.2605888 L60.4865,53.2605888 C61.6680625,53.2605888 62.624,52.3120319 62.624,51.1395919 C62.624,49.967152 61.6680625,49.018595 60.4865,49.018595 Z M54.549,49.018595 L25.099,49.018595 L25.099,22.6239669 C25.099,14.5523954 31.689625,8.01265496 39.824,8.01265496 C47.958375,8.01265496 54.549,14.5523954 54.549,22.6239669 L54.549,49.018595 Z"
                  id="Shape"
                  fillOpacity="0.4"
                  fill="#A3B1BF"
                  fillRule="nonzero"
                />
                <path
                  d="M71.136,16.012278 L71.136,14.8111797 L71.136,14.8111797 C71.136,14.1396014 71.6804217,13.5951797 72.352,13.5951797 C72.5395074,13.5951797 72.7244747,13.6385426 72.892445,13.7218794 L74.1028889,14.3224285 L74.1028889,14.3224285 C74.7044928,14.6209081 74.9502237,15.3505699 74.6517442,15.9521739 C74.5336639,16.1901719 74.340887,16.3829489 74.1028889,16.5010291 L72.892445,17.1015783 L72.892445,17.1015783 C72.2908411,17.4000579 71.5611793,17.154327 71.2626997,16.552723 C71.179363,16.3847527 71.136,16.1997854 71.136,16.012278 Z"
                  id="Triangle-36"
                  fillOpacity="0.4"
                  fill="#A3B1BF"
                />
                <ellipse
                  id="Oval-203"
                  strokeOpacity="0.4"
                  stroke="#A3B1BF"
                  strokeWidth="1.824"
                  cx="16.416"
                  cy="7.61958858"
                  rx="2.432"
                  ry="2.41322314"
                />
                <path
                  d="M70.4656602,47.2590131 L68.7663398,47.2590131 C68.3961213,47.2590131 68.096,47.5591345 68.096,47.9293529 C68.096,48.2995713 68.3961213,48.5996927 68.7663398,48.5996927 L70.4656602,48.5996927 L70.4656602,50.4107364 C70.4656602,50.7809549 70.7657816,51.0810762 71.136,51.0810762 L71.136,51.0810762 C71.5062184,51.0810762 71.8063398,50.7809549 71.8063398,50.4107364 L71.8063398,48.5996927 L73.5056602,48.5996927 C73.8758787,48.5996927 74.176,48.2995713 74.176,47.9293529 L74.176,47.9293529 C74.176,47.5591345 73.8758787,47.2590131 73.5056602,47.2590131 L73.5056602,47.2590131 L71.8063398,47.2590131 L71.8063398,45.6714159 L71.8063398,45.6714159 C71.8063398,45.3011975 71.5062184,45.0010762 71.136,45.0010762 C70.7657816,45.0010762 70.4656602,45.3011975 70.4656602,45.6714159 L70.4656602,47.2590131 Z"
                  id="Combined-Shape"
                  fillOpacity="0.4"
                  fill="#A3B1BF"
                />
                <path
                  d="M2.36966024,37.0028148 L0.670339761,37.0028148 L0.670339761,37.0028148 C0.300121334,37.0028148 -4.53386812e-17,37.3029361 0,37.6731545 C4.53386812e-17,38.043373 0.300121334,38.3434943 0.670339761,38.3434943 L2.36966024,38.3434943 L2.36966024,40.1545381 C2.36966024,40.5247565 2.66978157,40.8248778 3.04,40.8248778 L3.04,40.8248778 C3.41021843,40.8248778 3.71033976,40.5247565 3.71033976,40.1545381 L3.71033976,38.3434943 L5.40966024,38.3434943 C5.77987867,38.3434943 6.08,38.043373 6.08,37.6731545 C6.08,37.3029361 5.77987867,37.0028148 5.40966024,37.0028148 L3.71033976,37.0028148 L3.71033976,35.4152176 L3.71033976,35.4152176 C3.71033976,35.0449992 3.41021843,34.7448778 3.04,34.7448778 C2.66978157,34.7448778 2.36966024,35.0449992 2.36966024,35.4152176 L2.36966024,37.0028148 Z"
                  id="Combined-Shape-Copy"
                  fillOpacity="0.4"
                  fill="#A3B1BF"
                />
                <ellipse
                  id="Oval-4"
                  fillOpacity="0.25"
                  fill="#A3B1BF"
                  cx="40.128"
                  cy="71.1900826"
                  rx="19.456"
                  ry="1.80991736"
                />
              </g>
            </g>
          </g>
        </g>
      </svg>
    );
    const handleUserSvg = () => (
      <svg viewBox="0 0 1024 1024" width="13" height="13">
        <path
          d="M511.602218 541.281848a230.376271 230.376271 0 1 0 0-460.752543 230.376271 230.376271 0 0 0 0 460.752543zM511.960581 0a307.168362 307.168362 0 0 1 155.63197 572.049879c188.806153 56.826147 330.615547 215.939358 356.059326 413.551004 2.406152 18.788465-11.570008 35.836309-31.228783 38.140072-19.60758 2.303763-37.525735-11.006866-39.931887-29.795331-27.645153-214.505906-213.430817-376.025269-438.73881-376.02527-226.536667 0-414.728483 161.826532-442.322441 376.02527-2.406152 18.788465-20.324307 32.099094-39.931887 29.795331-19.658775-2.303763-33.634936-19.351607-31.228783-38.140072 25.392585-196.79253 167.969899-355.700963 357.08322-413.039057A307.168362 307.168362 0 0 1 511.960581 0z"
          fill="#555555"
          p-id="1138"
        />
      </svg>
    );
    const handleEditSvg = () => (
      <svg width="15px" height="15px" viewBox="0 0 1024 1024">
        <path d="M626.9 248.2L148.2 726.9 92.1 932.3l204.6-57 480.5-480.5-150.3-146.6z m274.3-125.8c-41-41-107.5-41-148.5 0l-80.5 80.5L823.1 349l78.1-78.2c41-41 41-107.5 0-148.4zM415.1 932.3h452.2v-64.6H415.1v64.6z m193.8-193.8h258.4v-64.6H608.9v64.6z" />
      </svg>
    );
    const handleLogoutSvg = () => (
      <svg width="15px" height="15px" viewBox="0 0 1024 1024">
        <path d="M1024 445.44 828.414771 625.665331l0-116.73472L506.88 508.930611l0-126.98112 321.53472 0 0-116.73472L1024 445.44zM690.174771 41.985331 100.34944 41.985331l314.37056 133.12 0 630.78528 275.45472 0L690.17472 551.93472l46.08 0 0 296.96L414.72 848.89472 414.72 1024 0 848.894771 0 0l736.25472 0 0 339.97056-46.08 0L690.17472 41.98528 690.174771 41.985331zM690.174771 41.985331" />
      </svg>
    );
    const MenuItems = (key, component, text) => {
      return (
        <Menu.Item key={key}>
          <Icon
            component={component}
            style={{
              marginRight: 8
            }}
          />
          {text}
        </Menu.Item>
      );
    };
    const menu = (
      <div className={styles.uesrInfo}>
        <Menu selectedKeys={[]} onClick={this.handleMenuClick}>
          {MenuItems('userCenter', handleUserSvg, '个人中心')}
          {MenuItems('cpw', handleEditSvg, '修改密码')}
          {!rainbondUtil.logoutEnable(rainbondInfo) &&
            MenuItems('logout', handleLogoutSvg, '退出登录')}
        </Menu>
      </div>
    );
    const enterpriseEdition = rainbondUtil.isEnterpriseEdition(rainbondInfo);
    const platformUrl = rainbondUtil.documentPlatform_url(rainbondInfo);
    return (
      <Header className={styles.header}>
        <Icon
          className={styles.trigger}
          type={!collapsed ? 'menu-unfold' : 'menu-fold'}
          style={{ color: '#ffffff', float: 'left' }}
          onClick={this.toggle}
        />

        {customHeader && customHeader()}
        <div className={styles.right}>
          {rainbondUtil.isEnableBillingFunction() &&
            enterpriseServiceInfo &&
            enterpriseServiceInfo.type === 'free' && (
              <Button type="primary" onClick={this.handleVip}>
                升级付费服务
              </Button>
            )}

          {enterpriseEdition && (
            <span className={styles.action} style={{ color: '#fff' }}>
              企业版
            </span>
          )}
          {isNewbieGuide && (
            <Popconfirm
              title="是否要关闭新手引导功能、关闭后并无法开启此功能?"
              onConfirm={this.handlIsOpenNewbieGuide}
              okText="关闭"
              cancelText="取消"
            >
              <a
                className={styles.action}
                style={{ color: '#fff' }}
                target="_blank"
                rel="noopener noreferrer"
              >
                新手引导
              </a>
            </Popconfirm>
          )}
          {isNewbieGuide && (
            <Popconfirm
              title="是否要关闭新手引导功能、关闭后并无法开启此功能?"
              onConfirm={this.handlIsOpenNewbieGuide}
              okText="关闭"
              cancelText="取消"
            >
              <a
                className={styles.action}
                style={{ color: '#fff' }}
                target="_blank"
                rel="noopener noreferrer"
              >
                新手引导
              </a>
            </Popconfirm>
          )}
          {platformUrl && (
            <a
              target="_blank"
              href={`${platformUrl}docs/`}
              rel="noopener noreferrer"
              className={styles.action}
            >
              平台使用手册
            </a>
          )}
          <NoticeIcon
            className={styles.action}
            count={total}
            loading={systemLoading || alertLoading}
            onClear={this.handleJump}
            onJump={this.handleJump}
          >
            <NoticeIcon.Tab
              count={alertTotal}
              list={alertList}
              title="报警信息"
              name="alertInfo"
              emptyText="你已查看所有报警信息"
              emptyImage={emptyImage}
            />
            <NoticeIcon.Tab
              count={systemTotal}
              list={systemList}
              title="通知信息"
              name="systemInfo"
              emptyText="你已查看所有通知信息"
              emptyImage={emptyImage}
            />
          </NoticeIcon>
          {currentUser ? (
            <Dropdown overlay={menu}>
              <span className={`${styles.action} ${styles.account}`}>
                <Avatar size="small" className={styles.avatar} src={userIcon} />
                <span className={styles.name}>{currentUser.user_name}</span>
              </span>
            </Dropdown>
          ) : (
            <Spin
              size="small"
              style={{
                marginLeft: 8
              }}
            />
          )}
        </div>
        {/* change password */}
        {this.state.showChangePassword && (
          <ChangePassword
            onOk={this.handleChangePass}
            onCancel={this.cancelChangePass}
          />
        )}
      </Header>
    );
  }
}

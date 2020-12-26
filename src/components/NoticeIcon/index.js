/* eslint-disable react/no-unused-state */
import React, { PureComponent } from 'react';
import { Popover, Icon, Tabs, Badge, Spin } from 'antd';
import { routerRedux } from 'dva/router';
import { connect } from 'dva';
import userUtil from '../../utils/user';
import classNames from 'classnames';
import List from './NoticeList';
import styles from './index.less';

const { TabPane } = Tabs;

@connect(({ user }) => ({
  user: user.currentUser
}))
export default class NoticeIcon extends PureComponent {
  static defaultProps = {
    // onItemClick: () => {},
    // onPopupVisibleChange: () => {},
    // onTabChange: () => {},
    // onClear: () => {},
    loading: false,
    locale: {
      emptyText: '暂无数据',
      clear: '清空'
    },
    emptyImage:
      'https://gw.alipayobjects.com/zos/rmsportal/wAhyIChODzsoKIOBHcBk.svg'
  };
  // eslint-disable-next-line react/sort-comp
  static Tab = TabPane;
  constructor(props) {
    super(props);
    const { user } = this.props;
    const adminer = userUtil.isCompanyAdmin(user);

    this.state = { adminer };
    if (props.children && props.children.length > 1) {
      const list = props.children;
      let tabType = list[0].props.name;
      if (list[0].props.count < 1 && list[1].props.count > 0) {
        tabType = list[1].props.name;
      }
      this.state.tabType = tabType;
    }
  }
  onItemClick = (item, tabProps) => {
    const { onItemClick } = this.props;
    onItemClick(item, tabProps);
  };
  onTabChange = tabType => {
    this.setState({ tabType });
    // this.props.onTabChange(tabType);
  };
  handleJump = (url, teamName) => {
    const { dispatch } = this.props;
    if (this.state.adminer && teamName) {
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

  getNotificationBox() {
    const { children, loading, locale, onClear } = this.props;
    const { tabType } = this.state;
    if (!children) {
      return null;
    }
    const panes = React.Children.map(children, child => {
      const title =
        child.props.list && child.props.list.length > 0
          ? `${child.props.title} (${child.props.count})`
          : child.props.title;
      return (
        <TabPane tab={title} key={child.props.name}>
          <List
            {...this.props}
            {...child.props}
            handleJump={this.handleJump}
            data={child.props.list}
            onClick={item => this.onItemClick(item, child.props)}
            onClear={() => onClear(child.props.name)}
            title={child.props.title}
            locale={locale}
            tabType={tabType}
          />
        </TabPane>
      );
    });
    const type =
      tabType.indexOf('alertInfo') > -1 ? 'alertInfo/.0' : 'systemInfo/.1';

    return (
      <Spin spinning={loading} delay={0}>
        <Tabs
          activeKey={type}
          className={styles.tabs}
          onChange={this.onTabChange}
        >
          {panes}
        </Tabs>
      </Spin>
    );
  }
  render() {
    const {
      className,
      count,
      popupAlign,
      onPopupVisibleChange,
      onClick
    } = this.props;
    const noticeButtonClass = classNames(className, styles.noticeButton);
    const notificationBox = this.getNotificationBox();
    const trigger = (
      <span className={noticeButtonClass} onClick={onClick}>
        <Badge
          count={count}
          title={`${count}条未读消息`}
          className={styles.badge}
        >
          <Icon type="bell" className={styles.icon} />
        </Badge>
      </span>
    );
    if (!notificationBox) {
      return trigger;
    }
    const popoverProps = {};
    if ('popupVisible' in this.props) {
      popoverProps.visible = this.props.popupVisible;
    }
    return (
      <Popover
        placement="bottomRight"
        content={notificationBox}
        popupClassName={styles.popover}
        trigger="click"
        arrowPointAtCenter
        popupAlign={popupAlign}
        onVisibleChange={onPopupVisibleChange}
        {...popoverProps}
      >
        {trigger}
      </Popover>
    );
  }
}

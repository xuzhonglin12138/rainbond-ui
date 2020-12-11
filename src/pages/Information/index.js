import { Menu } from 'antd';
import React, { PureComponent } from 'react';
import { connect } from 'dva';
import router from 'umi/router';
import { FormattedMessage } from 'umi-plugin-locale';
import styles from './index.less';

const { Item } = Menu;

@connect()
export default class Information extends PureComponent {
  constructor(props) {
    super(props);
    const {
      match: {
        params: { activeType }
      }
    } = this.props;
    const menuMap = {};
    menuMap.notice = (
      <FormattedMessage
        id="header.information.notice"
        defaultMessage="notice"
      />
    );
    // menuMap.alarm = (
    //   <FormattedMessage id="header.information.alarm" defaultMessage="alarm" />
    // );
    // menuMap.remind = (
    //   <FormattedMessage
    //     id="header.information.remindSetting"
    //     defaultMessage="remindSetting"
    //   />
    // );
    this.state = {
      menuMap,
      selectKey: activeType || 'notice'
    };
  }

  getmenu = () => {
    const { menuMap } = this.state;
    return Object.keys(menuMap).map(item => (
      <Item key={item}>{menuMap[item]}</Item>
    ));
  };

  selectKey = ({ key }) => {
    router.push(
      `/information/management/${key}/${
        key === 'remind' ? 'setting' : 'unread'
      }`
    );
    this.setState({
      selectKey: key
    });
  };

  render() {
    const { children } = this.props;
    const { selectKey } = this.state;
    return (
      <div className={styles.main}>
        <div className={styles.leftmenu}>
          <div className={styles.layoutMenuTitle}>
            <div className={styles.titles}>通知中心</div>
          </div>
          <Menu
            mode="inline"
            selectedKeys={[selectKey]}
            onClick={this.selectKey}
          >
            {this.getmenu()}
          </Menu>
        </div>
        <div className={styles.right}>{children}</div>
      </div>
    );
  }
}

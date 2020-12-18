/* eslint-disable no-nested-ternary */
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
    this.state = {
      selectKey: this.handleKey()
    };
  }
  componentWillReceiveProps() {
    const key = this.handleKey();
    if (key !== this.state.selectKey) {
      this.state = {
        selectKey: this.handleKey()
      };
    }
  }

  getmenu = () => {
    const menuMap = {
      notice: (
        <FormattedMessage
          id="header.information.notice"
          defaultMessage="notice"
        />
      ),
      alarm: (
        <FormattedMessage
          id="header.information.alarm"
          defaultMessage="alarm"
        />
      ),
      remind: (
        <FormattedMessage
          id="header.information.remindSetting"
          defaultMessage="remindSetting"
        />
      )
    };
    if (menuMap) {
      return Object.keys(menuMap).map(item => (
        <Item key={item}>{menuMap[item]}</Item>
      ));
    }
    return '';
  };
  handleKey = () => {
    return window.location.href.indexOf('notice') > -1
      ? 'notice'
      : window.location.href.indexOf('alarm') > -1
      ? 'alarm'
      : 'remind';
  };
  selectKey = ({ key }) => {
    router.push(
      `/information/management/${key}/${key === 'remind' ? 'setting' : 'all'}`
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

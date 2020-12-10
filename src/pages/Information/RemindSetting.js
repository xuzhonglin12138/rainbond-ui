import { Tabs, Table, Button, Switch } from 'antd';
import { connect } from 'dva';
import React, { PureComponent } from 'react';
import styles from './index.less';

const { TabPane } = Tabs;

@connect()
export default class RemindSetting extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {};
  }
  onChange = checked => {
    console.log(`switch to ${checked}`);
  };
  render() {
    return (
      <div>
        <div className={styles.boxs}>
          <div className={styles.title}>提醒设置</div>
        </div>
        <div className={`${styles.boxs} ${styles.mb10}`}>
          <div className={styles.texts}>项目协同每日邮件提醒</div>
          <Switch defaultChecked onChange={this.onChange} />
        </div>
        <div className={`${styles.boxs} ${styles.mb20} ${styles.pb20}`}>
          <div className={styles.texts}>项目动态红点提醒</div>
          <Switch defaultChecked onChange={this.onChange} />
        </div>

        <div className={styles.customTitle}>
          <ul className={styles.customContent}>
            <li>描述</li>
            <li>系统提醒</li>
            <li>邮件提醒</li>
          </ul>
        </div>
        <div className={styles.customSubTitle}>项目管理相关</div>
        <div className={styles.customTitle}>
          <ul className={styles.customContent}>
            <li>需求提醒</li>
            <li>
              <Switch defaultChecked onChange={this.onChange} />
            </li>
            <li>
              <Switch defaultChecked onChange={this.onChange} />
            </li>
          </ul>
        </div>
        <div className={styles.customTitle}>
          <ul className={styles.customContent}>
            <li>需求提醒</li>
            <li>
              <Switch defaultChecked onChange={this.onChange} />
            </li>
            <li>
              <Switch defaultChecked onChange={this.onChange} />
            </li>
          </ul>
        </div>
        <div className={styles.customTitle}>
          <ul className={styles.customContent}>
            <li>需求提醒</li>
            <li>
              <Switch defaultChecked onChange={this.onChange} />
            </li>
            <li>
              <Switch defaultChecked onChange={this.onChange} />
            </li>
          </ul>
        </div>
      </div>
    );
  }
}

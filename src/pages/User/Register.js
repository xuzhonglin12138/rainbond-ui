import { notification } from 'antd';
import { connect } from 'dva';
import { routerRedux } from 'dva/router';
import React, { Component } from 'react';
import cloud from '../../utils/cloud';
import rainbondUtil from '../../utils/rainbond';
import styles from './Register.less';
import RegisterComponent from './registerComponent';

@connect(({ user, global }) => ({
  register: user.register,
  rainbondInfo: global.rainbondInfo,
  isRegist: global.isRegist
}))
export default class Register extends Component {
  // first user, to register admin
  state = {};

  handleSubmit = values => {
    const { dispatch } = this.props;
    dispatch({
      type: 'user/register',
      payload: {
        ...values
      },
      handleError: res => {
        if (
          res &&
          res.data &&
          res.data.code &&
          res.data.code < 600 &&
          res.data.msg_show
        ) {
          notification.warning({ message: res.data.msg_show });
        } else {
          cloud.handleCloudAPIError(res);
        }
      }
    });
  };

  render() {
    const { isRegist, dispatch, rainbondInfo } = this.props;
    if (!isRegist) {
      dispatch(routerRedux.replace('/user/login'));
      return null;
    }
    const firstRegist = !rainbondUtil.fetchIsFirstRegist(rainbondInfo);
    return (
      <div className={styles.main} style={{ marginTop: '37px' }}>
        <h3>{firstRegist ? '管理员注册' : '用户注册'}</h3>
        <RegisterComponent onSubmit={this.handleSubmit} type="register" />
      </div>
    );
  }
}

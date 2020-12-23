/* eslint-disable no-nested-ternary */
/* eslint-disable jsx-a11y/alt-text */
import React, { Component } from 'react';
import { connect } from 'dva';
import { Link } from 'dva/router';
import { Form, Input, Button, Row, Col, Progress } from 'antd';
import styles from './Register.less';
import apiconfig from '../../../config/api.config';
import userUtil from '../../utils/global';
import rainbondUtil from '../../utils/rainbond';
import axios from 'axios';

const FormItem = Form.Item;

@connect(({ user, loading, global }) => ({
  register: user.register,
  rainbondInfo: global.rainbondInfo,
  isRegist: global.isRegist,
  submitting: loading.effects['user/register'],
  thirdsubmitting: loading.effects['user/thirdRegister']
}))
@Form.create()
export default class RegisterComponent extends Component {
  // first user, to register admin
  state = {
    count: 0,
    confirmDirty: false,
    visible: false,
    help: '',
    imgUrl: ''
  };

  componentDidMount() {
    this.getSetCodeImg();
  }
  getSetCodeImg = () => {
    axios
      .get(`${apiconfig.baseUrl}/console/captcha?_=${Date.now()}`, {
        withCredentials: false,
        responseType: 'arraybuffer'
      })
      .then(res => {
        var img = document.createElement('img');
        img.src = `data:image/jpeg;base64,${this.transformArrayBufferToBase64(
          res.data
        )}`;
        img.width = 120;
        img.height = 40;
        document.getElementById('codeImg').innerHTML = '';
        document.getElementById('codeImg').appendChild(img);
      });
  };
  transformArrayBufferToBase64 = buffer => {
    var binary = '';
    var bytes = new Uint8Array(buffer);
    for (var len = bytes.byteLength, i = 0; i < len; i++) {
      binary += String.fromCharCode(bytes[i]);
    }
    return window.btoa(binary);
  };

  handleSubmit = e => {
    e.preventDefault();
    const { form, onSubmit } = this.props;
    form.validateFields(
      {
        force: true
      },
      (err, values) => {
        if (!err) {
          userUtil.removeCookie();
          if (!values.name) {
            values.name = values.user_name;
          }
          onSubmit && onSubmit(values);
        }
      }
    );
  };

  checkConfirm = (rule, value, callback) => {
    const { form } = this.props;
    if (value && value !== form.getFieldValue('password')) {
      callback('两次输入的密码不匹配!');
    } else {
      callback();
    }
  };

  checkPassword = (rule, value, callback) => {
    if (!value) {
      this.setState({
        help: '请输入密码！',
        visible: !!value
      });
      callback('error');
    } else {
      this.setState({ help: '' });
      if (!this.state.visible) {
        this.setState({
          visible: !!value
        });
      }
      if (value.length < 8) {
        this.setState({
          help: '密码不能少于8位！',
          visible: !!value
        });
        callback('error');
      } else {
        const { form } = this.props;
        if (value && this.state.confirmDirty) {
          form.validateFields(['confirm'], { force: true });
        }
        callback();
      }
    }
  };

  render() {
    const {
      form,
      submitting,
      thirdsubmitting,
      type,
      user_info: userInfo,
      rainbondInfo
    } = this.props;
    const { getFieldDecorator } = form;
    const firstRegist = !rainbondUtil.fetchIsFirstRegist(rainbondInfo);
    const { time, help, imgUrl } = this.state;
    console.log('imgUrl', imgUrl);
    return (
      <Form onSubmit={this.handleSubmit}>
        {firstRegist && (
          <FormItem>
            {getFieldDecorator('enter_name', {
              rules: [
                {
                  required: true,
                  message: '请输入企业名称'
                }
              ]
            })(<Input size="large" placeholder="企业名称" />)}
          </FormItem>
        )}
        <FormItem>
          {getFieldDecorator('user_name', {
            initialValue: (userInfo && userInfo.oauth_user_name) || '',
            rules: [
              { required: true, message: '请填写用户名!' },
              {
                pattern: /^[a-z0-9_\-]+$/,
                message: '只支持小写英文字母、数字、下划线、中划线'
              }
            ]
          })(<Input size="large" placeholder="用户名" />)}
        </FormItem>
        <FormItem>
          {getFieldDecorator('name')(<Input size="large" placeholder="姓名" />)}
        </FormItem>
        <FormItem>
          {getFieldDecorator('email', {
            initialValue: (userInfo && userInfo.oauth_user_email) || '',
            rules: [
              {
                required: true,
                message: '请输入邮箱地址！'
              },
              {
                type: 'email',
                message: '邮箱地址格式错误！'
              }
            ]
          })(<Input size="large" placeholder="邮箱" />)}
        </FormItem>
        <FormItem help={help}>
          {getFieldDecorator('password', {
            rules: [
              {
                validator: this.checkPassword
              }
            ]
          })(
            <Input
              size="large"
              type="password"
              placeholder="密码不能少于8位！"
            />
          )}
        </FormItem>
        <FormItem>
          {getFieldDecorator('password_repeat', {
            rules: [
              {
                required: true,
                message: '请确认密码！'
              },
              {
                validator: this.checkConfirm
              }
            ]
          })(<Input size="large" type="password" placeholder="确认密码" />)}
        </FormItem>
        <FormItem>
          <Row gutter={8}>
            <Col span={16}>
              {getFieldDecorator('captcha_code', {
                rules: [
                  {
                    required: true,
                    message: '请输入验证码！'
                  }
                ]
              })(<Input size="large" placeholder="验证码" />)}
            </Col>
            <Col span={8}>
              <div id="codeImg" onClick={this.getSetCodeImg} />
            </Col>
          </Row>
        </FormItem>
        <FormItem>
          <Button
            size="large"
            loading={type === 'register' ? submitting : thirdsubmitting}
            className={styles.submit}
            style={{ width: type === 'register' ? '50%' : '100%' }}
            type="primary"
            htmlType="submit"
          >
            {firstRegist
              ? '管理员注册'
              : type === 'register'
              ? '注册'
              : '注册并绑定'}
          </Button>

          {!firstRegist && type === 'register' && (
            <Link className={styles.login} to="/user/login">
              使用已有账户登录
            </Link>
          )}
        </FormItem>
      </Form>
    );
  }
}

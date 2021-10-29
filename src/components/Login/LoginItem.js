/* eslint-disable no-unused-expressions */
/* eslint-disable react/sort-comp */
/* eslint-disable jsx-a11y/alt-text */
import { Col, Form, Row } from 'antd';
import omit from 'omit.js';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import apiconfig from '../../../config/api.config';
import map from './map';

const FormItem = Form.Item;

function generator({ defaultProps, defaultRules, type }) {
  return WrappedComponent => {
    return class BasicComponent extends Component {
      static contextTypes = {
        form: PropTypes.object,
        updateActive: PropTypes.func
      };
      constructor(props) {
        super(props);
        this.state = {
          count: 0,
          time: Date.now()
        };
      }
      componentDidMount() {
        if (this.context.updateActive) {
          this.context.updateActive(this.props.name);
        }
      }
      componentDidUpdate() {
        if (window.config) {
          this.changeTime();
        }
      }
      componentWillUnmount() {
        clearInterval(this.interval);
      }
      // onGetCaptcha = () => {
      //   let count = 59;
      //   this.setState({ count });
      //   if (this.props.onGetCaptcha) {
      //     this.props.onGetCaptcha();
      //   }
      //   this.interval = setInterval(() => {
      //     count -= 1;
      //     this.setState({ count });
      //     if (count === 0) {
      //       clearInterval(this.interval);
      //     }
      //   }, 1000);
      // };
      changeTime = () => {
        this.setState(
          {
            time: Date.now()
          },
          () => {
            window.config = false;
          }
        );
      };
      render() {
        const { getFieldDecorator } = this.context.form;
        const options = {};
        let otherProps = {};
        const {
          onChange,
          defaultValue,
          rules,
          name,
          ...restProps
        } = this.props;
        const { count, time } = this.state;
        options.rules = rules || defaultRules;
        if (onChange) {
          options.onChange = onChange;
        }
        if (defaultValue) {
          options.initialValue = defaultValue;
        }
        otherProps = restProps || otherProps;
        if (type === 'Captcha') {
          const inputProps = omit(otherProps, ['onGetCaptcha']);
          return (
            <FormItem>
              <Row gutter={8}>
                <Col span={16}>
                  {getFieldDecorator(
                    name,
                    options
                  )(<WrappedComponent {...defaultProps} {...inputProps} />)}
                </Col>
                <Col span={8}>
                  <img
                    onClick={this.changeTime}
                    src={`${apiconfig.baseUrl}/console/captcha?_=${time}`}
                    style={{
                      width: '100%',
                      height: 40
                    }}
                  />
                </Col>
              </Row>
            </FormItem>
          );
        }
        return (
          <FormItem>
            {getFieldDecorator(
              name,
              options
            )(<WrappedComponent {...defaultProps} {...otherProps} />)}
          </FormItem>
        );
      }
    };
  };
}

const LoginItem = {};
Object.keys(map).forEach(item => {
  LoginItem[item] = generator({
    defaultProps: map[item].props,
    defaultRules: map[item].rules,
    type: item
  })(map[item].component);
});

export default LoginItem;

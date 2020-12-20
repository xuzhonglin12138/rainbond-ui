import React, { PureComponent } from 'react';
import { connect } from 'dva';
import { Modal, Form, Input } from 'antd';
import styles from '../CreateTeam/index.less';

const FormItem = Form.Item;

@Form.create()
@connect()
class PlanVersionForm extends PureComponent {
  handleSubmit = () => {
    const { form, onOk } = this.props;
    form.validateFields((err, values) => {
      if (!err) {
        onOk(values.plan_version);
      }
    });
  };

  render() {
    const { form, onCancel, loading = false, info = {} } = this.props;
    const { getFieldDecorator } = form;
    const formItemLayout = {
      labelCol: {
        xs: {
          span: 24
        },
        sm: {
          span: 6
        }
      },
      wrapperCol: {
        xs: {
          span: 24
        },
        sm: {
          span: 14
        }
      }
    };

    return (
      <Modal
        visible
        loading={loading}
        className={styles.TelescopicModal}
        title="编辑规划版本"
        onOk={this.handleSubmit}
        onCancel={onCancel}
      >
        <FormItem {...formItemLayout} label="规划版本">
          {getFieldDecorator('plan_version', {
            rules: [{ required: true, message: '请输入规划版本!' }],
            initialValue: info.plan_version || ''
          })(<Input placeholder="请输入规划版本" />)}
        </FormItem>
      </Modal>
    );
  }
}

export default PlanVersionForm;

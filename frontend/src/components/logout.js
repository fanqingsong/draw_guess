import { Form, Input, Button, Checkbox } from 'antd';
import { Descriptions } from 'antd';

import { connect } from "react-redux";
import { logout } from "../actions/auth";

import { useState } from 'react';

const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated,
    me: state.auth.me
  });
  

export default connect(
    mapStateToProps,
    { logout }
  )((props) => {

  const onFinish = (values) => {
    console.log('Success:', values);

    props.logout();
  };

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

  return (
    <Form
      name="basic"
      labelCol={{
        span: 8,
      }}
      wrapperCol={{
        span: 16,
      }}
      initialValues={{
        remember: true,
      }}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      autoComplete="off"
    >

      {
        props.me && 
          <Descriptions title="Welcome" column={1} style={{width:200}}>
            <Descriptions.Item label="UserName">{props.me.username}</Descriptions.Item>
            <Descriptions.Item label="Email">{props.me.email}</Descriptions.Item>
          </Descriptions>
      }

      <Form.Item
        wrapperCol={{
          offset: 8,
          span: 16,
        }}
      >
        <Button type="primary" htmlType="submit">
          Logout
        </Button>
      </Form.Item>
    </Form>
  );
});



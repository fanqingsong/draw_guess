import { Form, Input, Button, Checkbox } from 'antd';

import { connect } from "react-redux";
import { login, loadMe } from "../actions/auth";

import { useState } from 'react';

const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated
  });
  

export default connect(
    mapStateToProps,
    { login, loadMe }
  )((props) => {

  const onFinish = (values) => {
    console.log('Success:', values);

    props.login(values.username, values.password).then(() => {
      props.loadMe()
    })
  };

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

  const [username, setUsername] = useState("") 
  const [password, setPassword] = useState("") 

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
      <Form.Item
        label="Username"
        name="username"
        rules={[
          {
            required: true,
            message: 'Please input your username!',
          },
        ]}
        onChange={setUsername}
        value={username}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="Password"
        name="password"
        rules={[
          {
            required: true,
            message: 'Please input your password!',
          },
        ]}
        value={password}
        onChange={setPassword}
      >
        <Input.Password />
      </Form.Item>
{/* 
      <Form.Item
        name="remember"
        valuePropName="checked"
        wrapperCol={{
          offset: 8,
          span: 16,
        }}
      >
        <Checkbox>Remember me</Checkbox>
      </Form.Item> */}

      <Form.Item
        wrapperCol={{
          offset: 8,
          span: 16,
        }}
      >
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </Form.Item>
    </Form>
  );
});



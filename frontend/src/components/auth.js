import { Popover, Button } from 'antd';
import React from 'react';
import { Avatar, Card } from 'antd';
import { UserOutlined, HomeOutlined, NotificationOutlined } from '@ant-design/icons';
import { connect } from 'react-redux';

import { loadMe } from "../actions/auth";

import Login from "./login"
import Logout from "./logout"

class Auth extends React.Component {
  state = {
    clicked: false
  };

  componentDidMount() {
    this.props.loadMe();
  }

  hide = () => {
    this.setState({
      clicked: false
    });
  };

  handleClickChange = visible => {
    this.setState({
      clicked: visible,
    });
  };

  render() {
    const clickContent = (
            <div>
                {
                    this.props.isAuthenticated ?
                    <Logout/>
                    :
                    <Login/>
                }
            </div>
        );

    return (
        <Popover
            content={
                <div>
                    {clickContent}
                    <a onClick={this.hide}>Close</a>
                </div>
            }
            title="User Panel"
            trigger="click"
            visible={this.state.clicked}
            onVisibleChange={this.handleClickChange}
            placement="bottomRight"
        >
            <a>
                {
                  this.props.isAuthenticated ?
                  <Avatar shape="circle" style={{margin:'8px', backgroundColor: '#87d068'}} size={50} icon={<UserOutlined />}/>
                  :
                  <Avatar shape="circle" style={{margin:'8px'}} size={50} icon={<UserOutlined />}/>
                }
            </a>
        </Popover>
    );
  }
}

const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated
  });
  
export default connect(
    mapStateToProps,
    {loadMe}
)(Auth);



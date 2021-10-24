
import {SelectRoom} from "./components/selectRoom";
import {Chat} from "./components/chat";
import {Draw} from "./components/draw";
import {Guess} from "./components/guess";

import React from 'react';
import './App.css';

import {
  HashRouter as Router,
  Route,
  Switch,
  Redirect
} from "react-router-dom";

import { Link } from "react-router-dom";

import { Layout, Menu, Breadcrumb } from 'antd';
// import { UserOutlined, LaptopOutlined, NotificationOutlined } from '@ant-design/icons';

const { SubMenu } = Menu;
const { Header, Content, Sider } = Layout;



class SiderDemo extends React.Component {

  render() {
    return (
      <Layout>
        <Header className="header">
          <div className="logo" />
          <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['1']}>
            <Menu.Item key="1">Chat</Menu.Item>
            <Menu.Item key="2">Draw&Guess</Menu.Item>
          </Menu>
        </Header>
        <Router>
          <Layout>
            <Sider width={200} className="site-layout-background">
              <Menu
                mode="inline"
                defaultSelectedKeys={['5']}
                defaultOpenKeys={['sub2']}
                style={{ height: '100%', borderRight: 0 }}
              >
                <SubMenu key="sub1" title="Chat System">
                  <Menu.Item key="1">
                    <Link to="/selectRoom" className="nav-link">
                      Select Room
                    </Link>
                  </Menu.Item>

                  <Menu.Item key="2">
                    <Link to="/chat/lobby" className="nav-link">
                      Chat
                    </Link>
                  </Menu.Item>

                  {/* <Menu.Item key="3">option3</Menu.Item>
                  <Menu.Item key="4">option4</Menu.Item> */}
                </SubMenu>
                <SubMenu key="sub2" title="Draw&Guess">
                  <Menu.Item key="5">
                    <Link to="/draw" className="nav-link">
                      Draw
                    </Link>
                  </Menu.Item>
                  <Menu.Item key="6">
                    <Link to="/guess" className="nav-link">
                      Guess
                    </Link>
                  </Menu.Item>
                  {/* <Menu.Item key="7">option7</Menu.Item>
                  <Menu.Item key="8">option8</Menu.Item> */}
                </SubMenu>
                {/* <SubMenu key="sub3" icon={<NotificationOutlined />} title="subnav 3">
                  <Menu.Item key="9">option9</Menu.Item>
                  <Menu.Item key="10">option10</Menu.Item>
                  <Menu.Item key="11">option11</Menu.Item>
                  <Menu.Item key="12">option12</Menu.Item>
                </SubMenu> */}
              </Menu>
            </Sider>
            <Layout style={{ padding: '0 24px 24px' }}>
              {/* <Breadcrumb style={{ margin: '16px 0' }}>
                <Breadcrumb.Item>Chat System</Breadcrumb.Item>
                <Breadcrumb.Item>List</Breadcrumb.Item>
                <Breadcrumb.Item>App</Breadcrumb.Item>
              </Breadcrumb> */}
              <Content
                className="site-layout-background"
                style={{
                  padding: 24,
                  margin: 0,
                  minHeight: 280,
                }}
              >
                <Switch>
                  <Route exact path="/" component={SelectRoom} />
                  <Route exact path="/selectRoom" component={SelectRoom} />
                  <Route exact path="/chat/:id" component={Chat} />
                  <Route exact path="/draw" component={Draw} />
                  <Route exact path="/guess" component={Guess} />
                </Switch>
              </Content>
            </Layout>
          </Layout>
        </Router>
      </Layout>
    );
  }
}

export default SiderDemo;

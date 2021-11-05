
import {SelectRoom} from "./components/selectRoom";
import Chat from "./components/chat";
import Draw from "./components/draw";
import {Guess} from "./components/guess";

import Menus from "./components/menus";
import Auth from "./components/auth"

import { useState, useEffect } from 'react';
import React from 'react';
import './App.css';

import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect
} from "react-router-dom";

import { Link } from "react-router-dom";

import { Avatar, Card } from 'antd';
import { Layout, Menu, Breadcrumb, PageHeader  } from 'antd';
import { Row, Col, Divider } from 'antd';
import { UserOutlined, HomeOutlined, NotificationOutlined } from '@ant-design/icons';

import { Provider } from "react-redux";
import store from "./store";


const { Header, Content, Footer, Sider,  } = Layout;

export default () => {

  return (
    <Provider store={store}>
      <Router>
        <Layout>
          <Header style={{background:"azure", minHeight: 140,}}>
            <Row>
              <Col flex="100px">
                <Link to="/">
                  <Avatar shape="square" style={{ backgroundColor: "lightblue" }} size={80} icon={<HomeOutlined />} />
                </Link>
              </Col>
              <Col flex="auto">
                <PageHeader
                  title="Draw and Guess"
                  subTitle="This is a funny site of great interest."
                />
              </Col>
            </Row>

            <Row>
              <Col flex="auto">
                <Menus/>
              </Col>
              <Col flex="100px">
                <Auth/>
              </Col>
            </Row>
          </Header>
          <Layout>
            <Layout 
              style={{ 
                padding: '0 24px 24px',
                // margin:'0 auto'
              }}
            >
              <Content
                className="site-layout-background"
                style={{
                  padding: 24,
                  // margin: "0 auto",
                  minHeight: 280,
                }}
              >
                <Switch>
                  <Route exact path="/" render={() => <Redirect to="/draw" push />} /> 
                  {/* <Route exact path="/selectRoom" component={SelectRoom} />
                  <Route exact path="/chat/:id" component={Chat} /> */}
                  <Route exact path="/draw" component={Draw} />
                  <Route exact path="/guess" component={Guess} />
                </Switch>
              </Content>

            </Layout>
          </Layout>
          <Footer align="center">@CopyRight 2021 LightSong</Footer>
        </Layout>
      </Router>
    </Provider>
  );
}


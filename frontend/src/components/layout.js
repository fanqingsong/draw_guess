
import Draw from "./draw";
import Guess from "./guess";
import Gallery from "./gallery";
import Menus from "./menus";
import Auth from "./auth"

import { useState, useEffect } from 'react';

import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect
} from "react-router-dom";

import { Link } from "react-router-dom";

import { Avatar, Card, message } from 'antd';
import { Layout, Menu, Breadcrumb, PageHeader  } from 'antd';
import { Row, Col, Divider } from 'antd';
import { UserOutlined, HomeOutlined, NotificationOutlined } from '@ant-design/icons';

import { connect } from "react-redux";


const { Header, Content, Footer, } = Layout;


const LayoutComponent = (props) => {

  useEffect(() => {
    let type = props.message.type;
    let content = props.message.content;

    if(type === "success") {
      message.success(content);
    } else if(type === "error") {
      message.error(content);
    }
  }, [props.message.content])

  return (
    <Layout>
      <Header style={{background:"azure", minHeight: 140}}>
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
              <Route exact path="/draw" component={Draw} />
              <Route exact path="/guess" component={Guess} />
              <Route exact path="/gallery" component={Gallery} />
            </Switch>
          </Content>

        </Layout>
      </Layout>
      <Footer align="center">@CopyRight 2021 LightSong</Footer>
    </Layout>
  );
}


const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated,
  message: state.message,
});

export default connect(mapStateToProps, null)(LayoutComponent);

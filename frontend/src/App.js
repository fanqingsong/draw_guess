
import LayoutComponent from "./components/layout"

import { useState, useEffect } from 'react';
import React from 'react';
import './App.css';

import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect
} from "react-router-dom";

import { Layout, Menu, Breadcrumb, PageHeader  } from 'antd';

import { Provider } from "react-redux";
import store from "./store";



const { Header, Content, Footer, } = Layout;

export default () => {

  return (
    <Provider store={store}>
      <Router>
        <LayoutComponent/>
      </Router>
    </Provider>
  );
}


import { Link } from "react-router-dom";
import { Layout, Menu, Breadcrumb } from 'antd';
import { withRouter } from 'react-router-dom'
import React, { useState, useEffect } from 'react';

const Menus = (props) => {
    const [count, setCount] = useState(0);

    useEffect(() => {
        let UNLISTEN = props.history.listen(route => { 
            console.log("------------------")
            console.log(route); 

            setCount(count+1);
          });

          return () => {
            UNLISTEN()
          };
      }, [count]);

    console.log("----========= ")
    let pathname = props.location.pathname
    console.log(pathname)

    return (
        <Menu theme="azure" mode="horizontal" selectedKeys={[pathname]} defaultSelectedKeys={[pathname]}>
            {/* <Menu.Item key="/selectRoom">
                <Link to="/selectRoom" className="nav-link">
                    Select Room
                </Link>
            </Menu.Item>

            <Menu.Item key="/chat/lobby">
                <Link to="/chat/lobby" className="nav-link">
                    Chat
                </Link>
            </Menu.Item> */}

            <Menu.Item key="/draw">
                <Link to="/draw" className="nav-link">
                    Draw
                </Link>
            </Menu.Item>

            <Menu.Item key="/guess">
                <Link to="/guess" className="nav-link">
                    Guess
                </Link>
            </Menu.Item>

            <Menu.Item key="/gallery">
                <Link to="/gallery" className="nav-link">
                    Gallery
                </Link>
            </Menu.Item>
        </Menu>
    );
};

export default withRouter(Menus);
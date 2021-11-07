
import React, { Component, Fragment } from "react";

import {SketchField, Tools} from 'react-sketch2';

import { Typography } from 'antd';
import { Row, Col, Card, Drawer, Space, Badge, Button } from 'antd';

import Chat from "./chatDrawGuess";


import { 
    MailOutlined,
} from '@ant-design/icons';

const { Title } = Typography;


export default class Guess extends Component {
    state = {
        room_name: "drawing_broadcaster",
        chatDrawerVisible: false,
        chatCount: 0,
    };

    componentDidMount () {
        let room_name = this.state.room_name;
        
        console.log("------------")
        console.log(room_name)

        const chatSocket = new WebSocket(
            'ws://'
            // + window.location.host
            + "127.0.0.1:8000"
            + '/ws/draw/'
            + room_name
            + '/'
        );

        chatSocket.onmessage = (e) => {
            console.log("got message");

            const data = JSON.parse(e.data);
            let drawing = data.message;

            if(this._sketch){
                this._sketch.setBackgroundFromDataUrl(drawing);
            }
        };

        chatSocket.onclose = function(e) {
            console.error('Chat socket closed unexpectedly');
        };

        this.chatSocket = chatSocket;
    }

    _updateChatCount = (value) => {
        this.setState({chatCount: value});
    }

    _showChatDrawer = () => {
        this.setState({
            chatDrawerVisible: true,
        });
    };

    _onChatDrawerClose = () => {
        this.setState({
            chatDrawerVisible: false,
        });
    };

    _onSketchChange = () => {
        console.log("changed");

        // console.log(this._sketch.toDataURL())

        // let drawing = this._sketch.toDataURL();

        // this.chatSocket.send(JSON.stringify({
        //     'drawing': drawing
        // }));
    };

    render() {
        const {room_name} = this.state;

        return (
            <Fragment>
                <Title>Guesser, watch the live painting, then guess now!</Title>

                <Space style={{ width: '100%' }}>
                    <Badge count={this.state.chatCount} showZero>
                        <Button
                            type="primary"
                            size="large"
                            icon={<MailOutlined />}
                            onClick={() => this._showChatDrawer()}
                        />
                    </Badge>
                </Space>


                <Drawer
                    title="Chat with Artist."
                    placement={'right'}
                    closable={false}
                    onClose={this._onChatDrawerClose}
                    visible={this.state.chatDrawerVisible}
                    // key={'right'}
                    width={400}
                    >
                    <Chat updateChatCount={this._updateChatCount}/>
                </Drawer>

                <SketchField 
                    // width='800px' 
                    height='600px' 
                    style={{background: "azure"}}
                    // tool={Tools.Pencil} 
                    ref={(c) => (this._sketch = c)}
                    onChange={this._onSketchChange}
                    lineColor='black'
                    lineWidth={3}/>
                    
            </Fragment>
        );
    }
}



import React, { Component, Fragment } from "react";

import {SketchField, Tools} from 'react-sketch2';

import { Typography } from 'antd';
import { Row, Col } from 'antd';


import Chat from "./drawGuessChat";

const { Title } = Typography;


export class Draw extends Component {
    state = {
        room_name: "drawing_broadcaster"
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

        chatSocket.onopen = () => {
            console.log("socket opened");
        }

        chatSocket.onmessage = (e) => {
            console.log("got message");
            // let chat_logs = this.state.chat_logs;
            
            // const data = JSON.parse(e.data);
            // chat_logs += (data.message + '\n');

            // this.setState({chat_logs});
        };

        chatSocket.onclose = function(e) {
            console.error('Chat socket closed unexpectedly');
        };

        this.chatSocket = chatSocket;
    }

    _onSketchChange = () => {
        console.log("changed");

        console.log(this._sketch.toDataURL())

        console.log(this.chatSocket.OPEN)
        if(this.chatSocket.readyState !== this.chatSocket.OPEN){
            console.log("websocket not open")
            return;
        }

        let drawing = this._sketch.toDataURL();

        this.chatSocket.send(JSON.stringify({
            'message': drawing
        }));
    };

    render() {
        const {room_name} = this.state;

        return (
            <Fragment>
                <Title>Artist, please paint now!</Title>

                <Row align="center">
                    <Col flex={2} align="right" style={{paddingRight:40}}>
                        <SketchField width='800px' 
                                height='600px' 
                                style={{background: "azure"}}
                                tool={Tools.Pencil} 
                                ref={(c) => (this._sketch = c)}
                                onChange={this._onSketchChange}
                                lineColor='black'
                                lineWidth={3}/>
                    </Col>
                    <Col flex={2} align="left">
                        <Chat/>
                    </Col>
                </Row>


            </Fragment>
        );
    }
}



import React, { Component, Fragment } from "react";

import {SketchField, Tools} from 'react-sketch2';

import { Typography } from 'antd';
import { Row, Col } from 'antd';
import { Avatar, Card } from 'antd';
import { Button, Space } from 'antd';
import { RedoOutlined, UndoOutlined, DeleteOutlined } from '@ant-design/icons';
import { debounce, throttle } from 'underscore'

import Chat from "./drawGuessChat";

const { Title } = Typography;


export class Draw extends Component {
    state = {
        room_name: "drawing_broadcaster",
        canUndo: false,
        canRedo: false
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

    _broadcastDrawing = throttle(()=>{
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
    }, 1000)


    _onSketchChange = () => {
        let prev = this.state.canUndo;
        let now = this._sketch.canUndo();
        if (prev !== now) {
          this.setState({ canUndo: now });
        }

        this._broadcastDrawing()
    };

    _redo = () => {
        this._sketch.redo();
        this.setState({
            canUndo: this._sketch.canUndo(),
            canRedo: this._sketch.canRedo(),
        });
    };

    _undo = () => {
        this._sketch.undo();
        this.setState({
            canUndo: this._sketch.canUndo(),
            canRedo: this._sketch.canRedo(),
        });
    };

    _clear = () => {
        this._sketch.clear();
        this._sketch.setBackgroundFromDataUrl("");
        this.setState({
            backgroundColor: "transparent",
            canUndo: this._sketch.canUndo(),
            canRedo: this._sketch.canRedo(),
        });
    };

    render() {
        const {room_name} = this.state;

        return (
            <Fragment>
                <Title>Artist, please paint now!</Title>

                <Row align="center">
                    <Col flex={2} align="right" style={{paddingRight:40}}>
                        <Space style={{ width: '100%' }}>
                            <Button
                                type="primary"
                                icon={<UndoOutlined />}
                                disabled={!this.state.canUndo}
                                onClick={() => this._undo()}
                            />
                            <Button
                                type="primary"
                                icon={<RedoOutlined />}
                                disabled={!this.state.canRedo}
                                onClick={() => this._redo()}
                            />
                            <Button
                                type="primary"
                                icon={<DeleteOutlined />}
                                onClick={() => this._clear()}
                            />
                        </Space>
                        <div style={{borderWidth:1, borderStyle:'solid'}}>
                            <SketchField 
                                    width='800px' 
                                    height='600px' 
                                    className="canvas-area"
                                    undoSteps={5}
                                    backgroundColor='transparent'
                                    tool={Tools.Pencil} 
                                    ref={(c) => (this._sketch = c)}
                                    onChange={this._onSketchChange}
                                    lineColor='black'
                                    lineWidth={3}/>
                        </div>
                    </Col>
                    <Col flex={2} align="left">
                        <Chat/>
                    </Col>
                </Row>


            </Fragment>
        );
    }
}


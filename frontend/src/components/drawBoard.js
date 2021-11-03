
import React, { Component, Fragment } from "react";

import {SketchField, Tools} from 'react-sketch2';

import { Typography } from 'antd';
import { Row, Col } from 'antd';
import { Card, Divider } from 'antd';
import { Collapse, Select } from 'antd';
import { SettingOutlined } from '@ant-design/icons';
import { Slider, Input } from 'antd';
import { Button, Space } from 'antd';
import { Switch } from 'antd';
import { debounce, throttle } from 'underscore'
import { CompactPicker } from "react-color";

import { 
    RedoOutlined, 
    UndoOutlined, 
    DeleteOutlined, 
    PlusOutlined, 
    CopyOutlined,
    MinusOutlined,
    CloseOutlined, 
    CheckOutlined,
    CloudDownloadOutlined,
} from '@ant-design/icons';

const { Title } = Typography;
const { Option } = Select;
const { TextArea } = Input;
const { Panel } = Collapse;

class DrawBoard extends Component {
    state = {
        room_name: "drawing_broadcaster",
        canUndo: false,
        canRedo: false,
        tool: Tools.Pencil,
        lineWidth: 1,
        lineColor: "black",
        fillWithColor: false,
        fillColor: "#68CCCA",
        fillWithBackgroundColor: false,
        backgroundColor: "transparent",
        text: "a text, cool.",
        enableRemoveSelected: false,
        enableCopyPaste: false,
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
            // console.log("got message");
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

    _broadcastDrawing = debounce(()=>{
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
    }, 2000)


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
            fillWithBackgroundColor: false,
            canUndo: this._sketch.canUndo(),
            canRedo: this._sketch.canRedo(),
        });
    };

    _download = () => {
        const anchor = document.createElement('a');

        anchor.href = this._sketch.toDataURL();
        anchor.download = "toPNG.png";
        anchor.click()
    };

    _onSelectTool = (value) => {
        this.setState({
            tool: value,
            enableRemoveSelected: value === Tools.Select,
            enableCopyPaste: value === Tools.Select,
          });
    }

    _changeLineWeight = debounce((value)=>{
        this.setState({
            lineWidth: value
        })
    }, 1000)

    _onChangeLineWeight = (value) => {
        console.log(`line weight: ${value}`)
        this._changeLineWeight(value)
    }

    render() {
        const {lineWidth} = this.state;

        // console.log(`render linewidth: ${lineWidth}`);

        return (
            <Fragment>
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
                    <Button
                        type="primary"
                        icon={<CloudDownloadOutlined />}
                        onClick={() => this._download()}
                    />
                </Space>

                <Collapse
                    // defaultActiveKey={['1']}
                    expandIconPosition='left'
                >
                    <Panel header="Tools" key="1" extra={<SettingOutlined/>}>
                        <Divider orientation="left">
                            Canvas Tools:
                        </Divider>
                        <Select defaultValue={this.state.tool} style={{ width: 120 }} onSelect={this._onSelectTool}>
                            <Option value={Tools.Pencil}>Pencil</Option>
                            <Option value={Tools.Line}>Line</Option>
                            <Option value={Tools.Arrow}>Arrow</Option>
                            <Option value={Tools.Rectangle}>Rectangle</Option>
                            <Option value={Tools.Circle}>Circle</Option>
                            <Option value={Tools.Pan}>Pan</Option>
                            <Option value={Tools.Select}>Select</Option>
                        </Select>

                        <Divider orientation="left">
                            Line Weight:
                        </Divider>
                        <Slider
                            min={1}
                            max={100}
                            onChange={this._onChangeLineWeight}
                            value={this.state.lineWidth}
                        />

                        <Divider orientation="left">
                            Text:
                        </Divider>
                        <Row>
                            <Col flex='auto'>
                                <TextArea showCount allowClear maxLength={100} value={this.state.text} onChange={(e)=>this.setState({text: e.target.value})} />
                            </Col>
                            <Col flex='100px'>
                                <Button
                                    type="primary"
                                    icon={<PlusOutlined />}
                                    onClick={() => this._sketch.addText(this.state.text)}
                                />
                            </Col>
                        </Row>
                    </Panel>

                    <Panel header="Colors" key="2" extra={<SettingOutlined/>}>
                        <Divider orientation="left">Line:</Divider>
                        <CompactPicker
                            color={this.state.lineColor}
                            onChange={(color) => this.setState({ lineColor: color.hex })}
                        />

                        <Divider orientation="left">Fill:</Divider>
                        <Switch
                            checkedChildren={<CheckOutlined />}
                            unCheckedChildren={<CloseOutlined />}
                            checked={this.state.fillWithColor}
                            onChange={(checked) => this.setState({fillWithColor: checked})}
                            />
                        <br/>
                        <CompactPicker
                            color={this.state.fillColor}
                            onChange={(color) => this.setState({ fillColor: color.hex })}
                        />
                    </Panel>

                    <Panel header="Background" key="3" extra={<SettingOutlined/>}>
                        <Divider orientation="left">Color:</Divider>
                        <Switch
                            checkedChildren={<CheckOutlined />}
                            unCheckedChildren={<CloseOutlined />}
                            checked={this.state.fillWithBackgroundColor}
                            onChange={(checked) => this.setState({fillWithBackgroundColor: checked})}
                            />
                        <br/>
                        <CompactPicker
                            color={this.state.backgroundColor}
                            onChange={(color) => this.setState({ backgroundColor: color.hex })}
                        />
                    </Panel>

                    <Panel header="Control" key="4" extra={<SettingOutlined/>}>
                        <Divider orientation="left">Selection Actions (Select an object first!):</Divider>

                        <Space style={{ width: '100%' }}>
                            <Button
                                type="primary"
                                icon={<CopyOutlined />}
                                disabled={!this.state.enableCopyPaste}
                                onClick={(e) => {
                                    this._sketch.copy();
                                    this._sketch.paste();
                                }}
                            />

                            <Button
                                type="primary"
                                icon={<MinusOutlined />}
                                disabled={!this.state.enableRemoveSelected}
                                onClick={() => this._sketch.removeSelected()}
                            />
                        </Space>
                    </Panel>
                </Collapse>

                <div style={{borderWidth:1, borderStyle:'solid'}}>
                    <SketchField 
                            // width='800px' 
                            height='600px' 
                            className="canvas-area"
                            undoSteps={5}
                            backgroundColor={
                                this.state.fillWithBackgroundColor
                                    ? this.state.backgroundColor
                                    : "transparent"
                            }
                            tool={this.state.tool} 
                            ref={(c) => (this._sketch = c)}
                            onChange={this._onSketchChange}
                            fillColor={
                                this.state.fillWithColor ? this.state.fillColor : "transparent"
                            }
                            lineColor={this.state.lineColor}
                            lineWidth={this.state.lineWidth}/>
                </div>
            </Fragment>
        );
    }
}

export default DrawBoard;


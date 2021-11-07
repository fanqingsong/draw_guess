
import React, { Component, Fragment } from "react";

import {SketchField, Tools} from 'react-sketch2';

import { 
    Row, 
    Col,
    Divider,
    Collapse,
    Select,
    Slider,
    Input,
    Button,
    Space,
    Switch,
    Drawer,
    Badge,
    Avatar,
    Card,
    Typography,
} from 'antd';

import { 
    RedoOutlined, 
    UndoOutlined, 
    DeleteOutlined, 
    PlusOutlined, 
    CopyOutlined,
    MinusOutlined,
    CloseOutlined, 
    CheckOutlined,
    SettingOutlined,
    CloudDownloadOutlined,
    CloudUploadOutlined,
    SaveOutlined,
    MailOutlined,
} from '@ant-design/icons';

import { debounce, throttle } from 'underscore'
import { CompactPicker } from "react-color";

import Chat from "./chatDrawGuess";

import {saveDrawing, loadDrawings} from "../actions/drawBoard" 
import { connect } from "react-redux";

const { Title } = Typography;
const { Option } = Select;
const { TextArea } = Input;
const { Panel } = Collapse;

class Draw extends Component {
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
        drawingTitle: "",
        settingDrawerVisible: false,
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

        this.props.loadDrawings();
    }

    componentWillUnmount () {
        this._broadcastDrawing.cancel();
        this._changeLineWeight.cancel();
    }

    _updateChatCount = (value) => {
        this.setState({chatCount: value});
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

    _save = () => {
        const anchor = document.createElement('a');

        anchor.href = this._sketch.toDataURL();
        anchor.download = "toPNG.png";
        anchor.click()
    };

    _upload = () => {
        this.props.saveDrawing(this._sketch.toDataURL(), this.state.drawingTitle)
    }

    _onSelectTool = (value) => {
        this.setState({
            tool: value,
            enableRemoveSelected: value === Tools.Select,
            enableCopyPaste: value === Tools.Select,
          });
    }

    _onSelectDrawing = (value) => {
        console.log(value)

        let allDrawings = this.props.allDrawings;

        let targetDrawings = allDrawings.filter((one) => one.id === value)
        if(targetDrawings.length !== 1){
            return;
        }

        let targetDrawing = targetDrawings[0];
        if(targetDrawing.content.length === 0){
            return;
        }

        let content = targetDrawing.content;

        this.setState({selectedDrawing: content})
    }

    _download = () => {
        let content = this.state.selectedDrawing;

        this._sketch.clear();
        this._sketch.setBackgroundFromDataUrl(content);
        this.setState({
            backgroundColor: "transparent",
            fillWithBackgroundColor: false,
            canUndo: this._sketch.canUndo(),
            canRedo: this._sketch.canRedo(),
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

    _showSettingDrawer = () => {
        this.setState({
            settingDrawerVisible: true,
        });
    };

    _onSettingDrawerClose = () => {
        this.setState({
            settingDrawerVisible: false,
        });
    };

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

    render() {
        const {lineWidth, } = this.state;

        // console.log(this.props.allDrawings)

        // this.props.allDrawings.map((one) => {
        //     console.log(one)
        // })

        // console.log(`render linewidth: ${lineWidth}`);

        return (
            <Fragment>
                <Title>Artist, please paint now!</Title>
                <Space style={{ width: '100%' }}>
                    <Button
                        type="primary"
                        size="large"
                        icon={<UndoOutlined />}
                        disabled={!this.state.canUndo}
                        onClick={() => this._undo()}
                    />
                    <Button
                        type="primary"
                        size="large"
                        icon={<RedoOutlined />}
                        disabled={!this.state.canRedo}
                        onClick={() => this._redo()}
                    />
                    <Button
                        type="primary"
                        size="large"
                        icon={<DeleteOutlined />}
                        onClick={() => this._clear()}
                    />
                    <Button
                        type="primary"
                        size="large"
                        icon={<SaveOutlined />}
                        onClick={() => this._save()}
                    />
                    <Button
                        type="primary"
                        size="large"
                        icon={<SettingOutlined />}
                        onClick={() => this._showSettingDrawer()}
                    />
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
                    title="Chat with Guesser."
                    placement={'right'}
                    closable={false}
                    onClose={this._onChatDrawerClose}
                    visible={this.state.chatDrawerVisible}
                    // key={'right'}
                    width={400}
                    >
                    <Chat updateChatCount={this._updateChatCount}/>
                </Drawer>

                <Drawer
                    title="Settings"
                    placement={'right'}
                    closable={false}
                    onClose={this._onSettingDrawerClose}
                    visible={this.state.settingDrawerVisible}
                    // key={'right'}
                    width={400}
                    >
                    <Collapse
                        defaultActiveKey={['1']}
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

                            <Divider orientation="left">Background Color:</Divider>
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


                        <Panel header="Storage" key="5" extra={<SettingOutlined/>}>
                            <Divider orientation="left">Upload to server:</Divider>
                            <Row>
                                <Col flex='auto'>
                                    <Input placeholder="enter title here." value={this.state.drawingTitle} onChange={(e) => this.setState({drawingTitle:e.target.value})}/>
                                </Col>
                                <Col flex='100px'>
                                    <Button
                                        type="primary"
                                        icon={<CloudUploadOutlined />}
                                        onClick={() => this._upload()}
                                    />
                                </Col>
                            </Row>

                            <Divider orientation="left">Load one drawing from server:</Divider>
                            <Row>
                                <Col flex='auto'>
                                    <Select style={{ width: '100%' }} onSelect={this._onSelectDrawing}>
                                        {
                                            this.props.allDrawings.map((one) => {
                                                return (<Option key={one.id} value={one.id}>{one.title}</Option>)
                                            })
                                        }
                                    </Select>
                                </Col>
                                <Col flex='100px'>
                                    <Button
                                        type="primary"
                                        icon={<CloudDownloadOutlined />}
                                        onClick={() => this._download()}
                                    />
                                </Col>
                            </Row>

                        </Panel>
                    </Collapse>
                </Drawer>


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

const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated,
    allDrawings: state.drawings.all
  });
  
export default connect(
    mapStateToProps,
    {saveDrawing, loadDrawings}
)(Draw);



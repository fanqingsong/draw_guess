
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

import DrawBoard from "./drawBoard";
import Chat from "./drawGuessChat";

const { Title } = Typography;
const { Option } = Select;
const { TextArea } = Input;
const { Panel } = Collapse;

export class Draw extends Component {
    state = {
    };

    componentDidMount () {
    }

    render() {

        return (
            <Fragment>
                <Title>Artist, please paint now!</Title>

                <Row align="center">
                    <Col flex={2} style={{paddingRight:40}}>
                        <DrawBoard/>
                    </Col>

                    <Col flex={2} align="left">
                        <Card title="Here is Chat Room" style={{ marginTop: 30 }}>
                            <Chat/>
                        </Card>
                    </Col>
                </Row>
            </Fragment>
        );
    }
}


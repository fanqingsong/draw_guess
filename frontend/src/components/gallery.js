
import React, { Component, Fragment } from "react";

import {SketchField, Tools} from 'react-sketch2';

import { Typography } from 'antd';
import { Row, Col, Card, Drawer, Space, Badge, Button } from 'antd';

import Chat from "./chatDrawGuess";

import {saveDrawing, loadDrawings} from "../actions/drawBoard" 
import { connect } from "react-redux";
import { Divider } from 'antd';

import { 
    MailOutlined,
} from '@ant-design/icons';

const { Title } = Typography;


class Gallery extends Component {
    constructor(){
        super()

        this.drawingRefs = []
    }

    state = {

    };

    componentDidMount () {
        this.props.loadDrawings().then(()=>{
            this.props.allDrawings.map((one, index) => {
                this.drawingRefs[index].zoom(4);
                this.drawingRefs[index].addImg(one.content);
            })
        });
    }

    render() {
        const {room_name} = this.state;

        return (
            <Fragment>
                <Title>Here are all paintings, enjoy yourself.</Title>

                <Row gutter={16} wrap={true}>
                    {
                        this.props.allDrawings.map((one) => {
                            
                            return (
                                <Col className="gutter-row">
                                    <Card title={one.title} extra={<a href="#">More</a>} style={{ width: 360 }}>
                                        <SketchField 
                                            width='320px' 
                                            height='240px' 
                                            style={{background: "azure"}}
                                            // tool={Tools.Pencil} 
                                            ref={(c) => {this.drawingRefs.push(c); return c}}
                                            // onChange={this._onSketchChange}
                                            lineColor='black'
                                            lineWidth={3}/>
                                    </Card>
                                </Col>
                            )
                        })
                    }                    
                </Row>

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
    {loadDrawings}
)(Gallery);
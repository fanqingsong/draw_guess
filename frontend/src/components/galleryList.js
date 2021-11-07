
import React, { Component, Fragment } from "react";

import {SketchField, Tools} from 'react-sketch2';

import { Typography } from 'antd';
import { Row, Col, Card, Drawer, Space, Badge, Button, Affix } from 'antd';

import Comment from "./comment";

import {saveDrawing, loadDrawings, deleteDrawing} from "../actions/drawBoard" 
import { connect } from "react-redux";
import { Divider } from 'antd';

import { 
    MailOutlined,
    DeleteOutlined,
    CommentOutlined,  
} from '@ant-design/icons';

const { Title } = Typography;


class GalleryList extends Component {
    constructor(){
        super()

        this.drawingRefs = []
    }

    state = {
    };

    componentDidMount () {
        this._loadDrawings()
    }

    _loadDrawings = () => {
        this.props.loadDrawings().then(()=>{
            this.props.allDrawings.map((one, index) => {
                this.drawingRefs[index].clear();
                this.drawingRefs[index].zoom(0.1);
                this.drawingRefs[index].addImg(one.content);
                // this.drawingRefs[index].setBackgroundFromDataUrl(one.content);

                console.log("=====================================================")
                console.log(one.content)
            })
        });
    }

    _deleteDrawing = (id) => {
        this.props.deleteDrawing(id).then(()=>{
            this._loadDrawings()
        })
    }

    render() {
        const {} = this.state;

        const DrawingExtJS = ({one}) => (
            <>
                <Button type="dashed" icon={<CommentOutlined />} onClick={()=>{this.props.showComment(one.id)}}/>
                <Button type="dashed" icon={<DeleteOutlined />} onClick={()=>{this._deleteDrawing(one.id)}}/>
            </>
        )        

        const GalleryJSX = () => (
            <>
                <Title>Here are all paintings, enjoy yourself.</Title>

                <Row gutter={16} wrap={true}>
                    {
                        this.props.allDrawings.map((one) => {
                            
                            return (
                                <Col className="gutter-row">
                                    <Card title={one.title} 
                                        extra={<DrawingExtJS one={one}/>}  
                                        style={{ width: 360 }}>
                                        <SketchField 
                                            width='320px' 
                                            height='240px' 
                                            // style={{background: "azure"}}
                                            tool={Tools.Pan} 
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
            </>
        );

        return (
            <Fragment>
                <GalleryJSX/>
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
    {loadDrawings, deleteDrawing}
)(GalleryList);
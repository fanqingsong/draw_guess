
import React, { Component, Fragment } from "react";

import {SketchField, Tools} from 'react-sketch2';

import { Typography } from 'antd';
import { Row, Col, Card, Drawer, Space, Badge, Button, Affix } from 'antd';

import Comment from "./comment";
import GalleryList from "./galleryList";

import {saveDrawing, loadDrawings, deleteDrawing} from "../actions/drawBoard" 
import { connect } from "react-redux";
import { Divider } from 'antd';

import { 
    MailOutlined,
    DeleteOutlined,
    CommentOutlined,  
} from '@ant-design/icons';

const { Title } = Typography;


class Gallery extends Component {
    constructor(){
        super()
    }

    state = {
        commentVisible: false,
        commentDrawingId: null,
    };

    componentDidMount () {
    }

    _showComment = (drawing_id) => {
        this.setState({
            commentVisible: true,
            commentDrawingId: drawing_id,
        });
    }

    _hideComment = () => {
        this.setState({
            commentVisible: false,
            commentDrawingId: null,
        });
    }

    render() {
        const {commentVisible, commentDrawingId} = this.state;


        return (
            <Fragment>
                {
                    commentVisible?(
                        <>
                            <Affix offsetTop={100}>
                                <Button type="primary" onClick={this._hideComment}>
                                    Back to List
                                </Button>
                            </Affix>
                            <Comment drawingId={commentDrawingId}/>
                        </>
                    )
                    :
                        <GalleryList showComment={this._showComment}/>
                }

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
)(Gallery);
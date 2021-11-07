
import React, { Component, Fragment } from "react";

import {SketchField, Tools} from 'react-sketch2';

import { Typography } from 'antd';
import { Row, Col, Card, Drawer, Space, Badge, Form, Button, List, Input } from 'antd';
import { Comment, Avatar } from 'antd';

import { connect } from "react-redux";
import {loadDrawing} from "../actions/drawBoard"
import { loadComments, saveComment } from "../actions/comments";

import moment from 'moment';

import { 
    MailOutlined,
} from '@ant-design/icons';

const { Title } = Typography;
const { TextArea } = Input;


const CommentList = ({ comments }) => (
        <List
            dataSource={comments}
            header={`${comments.length} ${comments.length > 1 ? 'replies' : 'reply'}`}
            itemLayout="horizontal"
            renderItem={props => <Comment {...props} />}
        />
    );

const Editor = ({ onChange, onSubmit, submitting, commentToSubmit }) => (
        <>
            <Form.Item>
                <TextArea rows={4} onChange={onChange} value={commentToSubmit} />
            </Form.Item>
            <Form.Item>
                <Button htmlType="submit" loading={submitting} onClick={onSubmit} type="primary">
                    Add Comment
                </Button>
            </Form.Item>
        </>
    );

class CommentComp extends Component {
    state = {
        // comments: [],
        submitting: false,
        commentToSubmit: '',
    };

    componentDidMount () {
        this.props.loadDrawing(this.props.drawingId).then(()=>{
            this._sketch.addImg(this.props.oneDrawing.content);
        })

        this.props.loadComments();
    }

    handleSubmit = () => {
        const {commentToSubmit} = this.state;
        const {saveComment, drawingId, loadComments} = this.props;

        if (!commentToSubmit) {
            return;
        }

        this.setState({
            submitting: true,
        });

        saveComment(commentToSubmit, drawingId).then(() => {
            loadComments();

            this.setState({
                submitting: false,
                commentToSubmit: '',
            });
        })

    };

    handleChange = e => {
        this.setState({
            commentToSubmit: e.target.value,
        });
    };

    render() {
        const { submitting, commentToSubmit } = this.state;
        const comments = this.props.comments;

        return (
            <Fragment>
                <Title>View all comments, and give your comments!</Title>

                <SketchField 
                    // width='800px' 
                    height='600px' 
                    style={{background: "azure"}}
                    ref={(c) => (this._sketch = c)}/>
                    
                {comments.length > 0 && <CommentList comments={comments} />}
                <Comment
                    avatar={<Avatar src="https://joeschmoe.io/api/v1/random" alt="Han Solo" />}
                    content={
                        <Editor
                            onChange={this.handleChange}
                            onSubmit={this.handleSubmit}
                            submitting={submitting}
                            value={commentToSubmit}
                        />
                    }
                />

            </Fragment>
        );
    }
}

const mapStateToProps = (state) => ({
    oneDrawing: state.drawings.one,
    comments: state.comments.all,
})

export default connect(mapStateToProps, {loadDrawing, loadComments, saveComment})(CommentComp);

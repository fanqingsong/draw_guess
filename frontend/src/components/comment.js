
import React, { Component, Fragment } from "react";

import {SketchField, Tools} from 'react-sketch2';

import { Typography } from 'antd';
import { Row, Col, Card, Drawer, Space, Badge, Form, Button, List, Input } from 'antd';
import { Comment, Avatar } from 'antd';

import { connect } from "react-redux";
import {loadDrawing} from "../actions/drawBoard"
import { loadComments, saveComment } from "../actions/comments";
import { loadAllUsers } from "../actions/auth";

import { UserOutlined } from '@ant-design/icons';

import moment from 'moment';

import { 
    MailOutlined,
} from '@ant-design/icons';

const { Title } = Typography;
const { TextArea } = Input;


const CommentList = ({ comments, allUsers }) => {
    comments.forEach(one => {
        const userId = one.user;
        const user = allUsers.find(oneUser => oneUser.id === userId);
        if(user) {
            one.author = user.username;
        }
        one.avatar = (<Avatar size="small" icon={<UserOutlined />} />)
    })

    return (
        <List
            dataSource={comments}
            header={`${comments.length} ${comments.length > 1 ? 'replies' : 'reply'}`}
            itemLayout="horizontal"
            renderItem={props => <Comment {...props} />}
        />
    )};

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

        this.props.loadAllUsers().then(()=>{
            this.props.loadComments(this.props.drawingId);
        });
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
            loadComments(this.props.drawingId);

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
        const allUsers = this.props.allUsers;
        const me = this.props.me;
        const { oneDrawing } = this.props;

        const comments_filtered = comments.filter((one) => one.drawing === oneDrawing.id )

        return (
            <Fragment>
                <Title>View all comments, and give your comments!</Title>

                <SketchField 
                    // width='800px' 
                    height='600px' 
                    style={{background: "azure"}}
                    ref={(c) => (this._sketch = c)}/>
                    
                {comments_filtered.length > 0 && <CommentList comments={comments_filtered} allUsers={allUsers}/>}
                <Comment
                    avatar={<Avatar style={{ backgroundColor: '#87d068' }} icon={<UserOutlined />} alt={me.username}/>}
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
    allUsers: state.auth.allUsers,
    me: state.auth.me,
})

export default connect(mapStateToProps, {
    loadDrawing, 
    loadComments, 
    loadAllUsers,
    saveComment
})(CommentComp);

import React, { Component, Fragment } from "react";
import { useHistory } from 'react-router-dom';

export class SelectRoom extends Component {
    state = {
        room_name: ""
    };

    onChange = (e) => {
        let room_name = e.target.value;
        this.setState({room_name});
    }

    onSubmit = (e) => {
        let room_name = this.state.room_name;

        this.props.history.push('/chat/' + room_name + '/');
    }

    render() {
        const {room_name} = this.state;

        return (
            <Fragment>
                What chat room would you like to enter?<br/>
                <input id="room-name-input" type="text" size="100" onChange={this.onChange} value={room_name}/><br/>
                <input id="room-name-submit" type="button" onClick={this.onSubmit} value="Enter"/>
            </Fragment>
        );
    }
}


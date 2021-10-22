import React, { Component, Fragment } from "react";

export class Chat extends Component {
    state = {
        chat_logs: "",
        one_sentence: ""
    };

    componentDidMount () {
        let room_name = this.props.match.params.id;
        console.log("------------")
        console.log(room_name)

        const chatSocket = new WebSocket(
            'ws://'
            + window.location.host
            + '/ws/chat/'
            + room_name
            + '/'
        );

        chatSocket.onmessage = (e) => {
            let chat_logs = this.state.chat_logs;
            
            const data = JSON.parse(e.data);
            chat_logs += (data.message + '\n');

            this.setState({chat_logs});
        };

        chatSocket.onclose = function(e) {
            console.error('Chat socket closed unexpectedly');
        };

        this.chatSocket = chatSocket;
    }

    onChange = (e) => {
        let one_sentence = e.target.value;
        this.setState({one_sentence});
    }

    onSubmit = (e) => {
        let one_sentence = this.state.one_sentence;

        this.chatSocket.send(JSON.stringify({
            'message': one_sentence
        }));

        this.setState({one_sentence: ""})
    }

    onKeyUp = (e) => {
        if (e.keyCode === 13) {  // enter, return
            this.onSubmit()
        }
    }

    render() {
        let chat_logs = this.state.chat_logs;

        let one_sentence = this.state.one_sentence;

        return (
            <Fragment>
                <textarea id="chat-log" cols="100" rows="20" value={chat_logs}></textarea><br/>
                <input id="chat-message-input" type="text" size="100" onKeyUp={this.onKeyUp} autofocus="autofocus" onChange={this.onChange} value={one_sentence}/><br/>
                <input id="chat-message-submit" type="button" value="Send" onClick={this.onSubmit}/>
            </Fragment>
        );
    }
}


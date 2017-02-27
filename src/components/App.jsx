import React, { Component } from 'react';
import io from 'socket.io-client';
import MessageBox from './MessageBox.jsx';
import Input from './Input.jsx';
let socket = io('http://192.168.0.103:8000');

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      messages: [],
    };
    this.MessageInput = this.MessageInput.bind(this);
  }

  componentWillMount() {
    socket.on(`chat message`, message => {
      this.setState(prevState => ({
        messages: [...prevState.messages, message],
      }));
    });
  }

  MessageInput(message) {
    socket.emit('chat message', message);
  }

  render() {
    const mainStyle = {
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'flex-end',
      height: '500px',
      width: '500px',
      border: '1px solid darkgray',
      borderRadius: '2px',
    };

    return (
      <div style={mainStyle}>
        <MessageBox messageLog={this.state.messages} />
        <Input handleMessageInput={this.MessageInput} />
      </div>
    );
  }
}

export default App;

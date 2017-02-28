import React, { Component } from 'react';
import io from 'socket.io-client';
import MessageBox from './MessageBox.jsx';
import Input from './Input.jsx';
import ConnectedMessage from './ConnectedMessage.jsx';

let socket = io('http://192.168.0.103:8000');


class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      messages: [],
      username: '',
      logged: false,
      lastConnected: '',
    };
    this.MessageInput = this.MessageInput.bind(this);
    this.NicknameInput = this.NicknameInput.bind(this);
  }

  componentWillMount() {
    socket.on(`chat message`, message => {
      this.setState(prevState => ({
        messages: [...prevState.messages, message],
      }));
    });
    socket.on(`user connected`, user => {
      this.setState({
        lastConnected: user,
      });
    });
  }

  NicknameInput(e) {
    e.preventDefault();
    const nickname = e.target.lastChild.value;
    e.target.lastChild.value = '';
    this.setState({
      username: nickname,
      logged: true,
    });
    socket.emit('user connected', nickname);
  }

  MessageInput(message) {
    message.nickname = this.state.username;
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
      background: '#f9f9f9',
      position: 'relative',
    };

    const nickNameStyle = {
      position: 'absolute',
      top: 0,
      left: 0,
      height: '100%',
      width: '100%',
      background: 'black',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      opacity: '1',
      zIndex: '3',
      transition: 'all 500ms ease-out',
    };

    if (this.state.logged) {
      nickNameStyle.zIndex = '-1';
      nickNameStyle.opacity = '0';
      nickNameStyle.transform = 'translateY(-50px)';
    }

    return (
      <div style={mainStyle}>
        <div style={nickNameStyle}>
          <form
            onSubmit={this.NicknameInput}
            style={{
              width: '200px',
              overflow: 'hidden',
              display: 'flex',
              alignItems: 'center',
              flexDirection: 'column'
            }}>
            <h2
              style={{
                padding: '20px',
                color: 'white',
                fontFamily: 'arial'
              }} >nickname ?</h2>
            <input
              style={{
                background: 'none',
                border: 'none',
                borderBottom: '1px solid white',
                color: 'white',
                fontSize: '24px',
                textAlign: 'center',
                maxWidth: '200px',
              }}
              type="text" />
          </form>
        </div>
        <ConnectedMessage lastConnceted={this.state.lastConnected} />
        <MessageBox messageLog={this.state.messages} />
        <Input handleMessageInput={this.MessageInput} />
      </div>
    );
  }
}

export default App;

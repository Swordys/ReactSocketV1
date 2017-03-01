import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import socket from '../constants/clientSocket';

class MessageBox extends Component {
  constructor(props) {
    super(props);
    this.renderMessages = this.renderMessages.bind(this);
    this.state = {
      globalMessages: [],
    };
  }
  componentWillMount() {
    socket.on(`chat message`, message => {
      this.setState(prevState => ({
        globalMessages: [...prevState.globalMessages, message],
      }));
    });
  }

  renderMessages() {
    const msgStyle = {
      background: '#eee',
      fontFamily: 'arial',
      fontSize: '14px',
      borderTop: '1px solid darkgray',
      overflow: 'hidden',
      flexShrink: '0',
    };
    const wrapperStyle = {
      display: 'flex',
      flexDirection: 'column',
      padding: '10px',
    };
    const {globalMessages} = this.state;
    return globalMessages.map(message => <div style={msgStyle} key={message.key}>
      <div style={wrapperStyle}>
        <div style={{ fontWeight: 'bold', borderBottom: '1px solid gray', paddingBottom: '5px' }}>{message.sender}</div>
        <p style={{ paddingTop: '10px' }} >
          {message.message}
        </p>
      </div>
    </div>);
  }

  render() {
    const MessageBoxStyle = {
      width: '100%',
      background: 'white',
      display: 'flex',
      flexDirection: 'column',
      overflowY: 'auto',
    };

    return (
      <div className="msg-wrap" style={MessageBoxStyle} >
        {this.renderMessages()}
      </div>
    );
  }
}

MessageBox.propTypes = {
  messageLog: PropTypes.array,
};

const mapStateToProps = state => ({
  globalMessages: state.lastMessage,
});

export default connect(mapStateToProps)(MessageBox);

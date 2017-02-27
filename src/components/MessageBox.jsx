import React, { Component, PropTypes } from 'react';

class MessageBox extends Component {

  constructor(props) {
    super(props);
    this.renderMessages = this.renderMessages.bind(this);
  }

  renderMessages() {
    const msgStyle = {
      background: '#eee',
      padding: '10px',
      fontFamily: 'arial',
      fontSize: '14px',
      borderTop: '1px solid darkgray',
      overflow: 'hidden',
    };
    const {messageLog} = this.props;
    return messageLog.map(message => <div style={msgStyle} key={message.key}>{message.message}</div>);
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

export default MessageBox;

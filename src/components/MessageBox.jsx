import React, { Component, PropTypes } from 'react';

class MessageBox extends Component {

  constructor(props) {
    super(props);
    this.renderMessages = this.renderMessages.bind(this);
  }

  renderMessages() {
    const {messageLog} = this.props;
    return messageLog.map(message => <div key={message.key}>{message.message}</div>);
  }

  render() {
    const MessageBoxStyle = {
      height: '100%',
      width: '100%',
      background: 'white'
    };

    return (
      <div style={MessageBoxStyle} >
        {this.renderMessages()}
      </div>
    );
  }
}

MessageBox.propTypes = {
  messageLog: PropTypes.array,
};

export default MessageBox;

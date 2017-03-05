import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import styles from '../style/reactTrans.css';
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
      background: '#f6f6f6',
      fontFamily: 'arial',
      fontSize: '14px',
      border: '1px solid darkgray',
      overflow: 'hidden',
      flexShrink: '0',
      borderRadius: '3px',
      marginTop: '15px',
    };

    const msgStyleInbox = {
      background: '#f6f6f6',
      fontFamily: 'arial',
      fontSize: '14px',
      border: '1px solid darkgray',
      overflow: 'hidden',
      flexShrink: '0',
      borderRadius: '3px',
      marginTop: '15px',
      alignSelf: 'flex-start',
    };

    const wrapperStyle = {
      display: 'flex',
      flexDirection: 'column',
      padding: '10px',
    };
    const { globalMessages } = this.state;
    const { userName } = this.props;

    return globalMessages.map(function (message) {
      let style = {};
      userName !== message.sender ? style = msgStyleInbox : style = msgStyle;
      return (
        <div style={style} key={message.key}>
          <div style={wrapperStyle}>
            <div style=
              {{
                fontWeight: 'bold',
                borderBottom: '1px solid gray',
                paddingBottom: '5px',
                fontFamily: 'Rubik',
              }}>
              {message.sender}
            </div>
            <p style=
              {{
                paddingTop: '10px',
                fontFamily: 'Rubik',
              }} >
              {message.message}
            </p>
            <span style=
              {{
                color: 'gray',
                paddingTop: '10px',
                fontSize: '10px'
              }}>
              {message.time}
            </span>
          </div>
        </div>);
    }
    );
  }

  render() {

    return (
      <div className='testing'>
        <ReactCSSTransitionGroup
          transitionName="msg-anim"
          component="div"
          className="trans-wrap"
          transitionEnterTimeout={300}
          transitionLeaveTimeout={300}>
          {this.renderMessages()}
        </ReactCSSTransitionGroup>
      </div>

    );
  }
}

MessageBox.propTypes = {
  messageLog: PropTypes.array,
  userName: PropTypes.string,
};

const mapStateToProps = state => ({
  globalMessages: state.lastMessage,
  userName: state.userName,
});

export default connect(mapStateToProps)(MessageBox);

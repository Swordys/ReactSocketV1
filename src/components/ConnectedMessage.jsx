import React, { Component, PropTypes } from 'react';
/* eslint-disable no-unused-vars */
import style from '../style/userConnected.css';
/* eslint-enable no-unused-vars */
let toggle = true;

class ConnectedMessage extends Component {
  render() {
    const {lastConnceted} = this.props;
    let flash = '';
    const MessageStyle = {
      background: 'black',
      color: 'white',
      fontFamily: 'arial',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      position: 'absolute',
      top: 0,
      right: 0,
      opacity: 0,
    };

    () => {
      this.setState({
        last: lastConnceted,
      });
      this.setState(prev => ({
        check: prev.last === lastConnceted ? true : false,
      }));
    };

    if (lastConnceted) {
      toggle = !toggle;
      if (toggle) {
        flash = 'conncted-wrap';
        console.log('yas');
      } else {
        flash = 'conncted-wrap2';
        console.log('yaz');
      }
    }

    return (
      <div className={flash} style={MessageStyle}>
        <span style={{ padding: '10px' }}>{lastConnceted} connceted</span>
      </div>
    );
  }
}


ConnectedMessage.propTypes = {
  lastConnceted: PropTypes.string,
}

export default ConnectedMessage;

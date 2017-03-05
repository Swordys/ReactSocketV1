import React, { Component } from 'react';
import socket from '../constants/clientSocket';
import awesome from '../style/fontAwesome/css/font-awesome.min.css';

class HeaderControls extends Component {

  constructor(props) {
    super(props);
    this.state = {
      userCount: 0,
    };
  }

  componentDidMount() {
    socket.emit('connected users');
    socket.on('connected users', users => {
      this.setState({
        userCount: users.length,
      });
    });
  }

  render() {
    const HeaderStyle = {
      height: '50px',
      width: '100%',
      borderBottom: '1px solid darkgray',
      display: 'flex',
      justifyContent: 'flex-end',
      alignItems: 'center',
      overflow: 'hidden',
    };

    const userOnline = {
      padding: '5px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      cursor: 'pointer',
      position: 'relative',
      zIndex: '10',
    };
    return (
      <div style={HeaderStyle} >
        <div style={userOnline}>
          <i className="fa fa-male" aria-hidden="true" style={{ fontSize: '16px' }} />
          <span style={{ fontFamily: 'ThickFont', fontSize: '18px', padding: '8px' }}>{this.state.userCount}</span>
        </div>
      </div>
    );
  }
}

export default HeaderControls;

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { connectToRoom } from '../actions/Actions.jsx';
import socket from '../constants/clientSocket';

class RoomModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      room: '',
    };
    this.roomSubmit = this.roomSubmit.bind(this);
  }

  roomSubmit(e) {
    e.preventDefault();
    const { connectRoom } = this.props;
    const room = e.target.lastChild.value;
    if (room.length > 0) {
      e.target.lastChild.value = '';
      this.setState({
        room,
      });
      connectRoom(room);

      socket.emit('create room', room);
      socket.emit('connected users', room);
    }
  }

  render() {
    let Unchangable = false;
    const roomModalStyle = {
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
      zIndex: '4',
      transition: 'all 500ms ease-out',
      userSelect: 'none',
    };

    if (this.state.room.length > 0) {
      Unchangable = true;
      roomModalStyle.zIndex = '-1';
      roomModalStyle.opacity = '0';
      roomModalStyle.transform = 'translateY(-50px)';
    }

    return (
      <div style={roomModalStyle}>
        <form
          onSubmit={this.roomSubmit}
          style=
          {{
            width: '250px',
            overflow: 'hidden',
            display: 'flex',
            alignItems: 'center',
            flexDirection: 'column'
          }}>
          <h2
            style=
            {{
              padding: '20px',
              color: 'white',
              fontFamily: 'ThickFont',
              letterSpacing: '2px',
              fontSize: '36px'
            }} >
            #room
              </h2>
          <input
            readOnly={Unchangable}
            style={{
              background: 'none',
              border: 'none',
              borderBottom: '1px solid white',
              color: 'white',
              fontSize: '28px',
              textAlign: 'center',
              fontFamily: 'ThickFont',
              maxWidth: '200px',
            }}
            type="text" />
        </form>
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  connectRoom: (room) => {
    dispatch(connectToRoom(room));
  }
});

export default connect(null, mapDispatchToProps)(RoomModal);

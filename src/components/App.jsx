import React, { Component } from 'react';
import RoomModal from './RoomModal.jsx';
import LoginModal from './LoginModal.jsx';
import MessageBox from './MessageBox.jsx';
import Input from './Input.jsx';
import ConnectedMessage from './ConnectedMessage.jsx';
import HeaderControls from './HeaderControls.jsx';

/*eslint-disable no-unused-vars*/
import styles from '../style/app.css';
/*eslint-enable no-unused-vars*/


class App extends Component {
  render() {
    return (
      <div className="app-wrap">
        <RoomModal />
        <LoginModal />
        <HeaderControls />
        <ConnectedMessage />
        <MessageBox />
        <Input />
      </div>
    );
  }
}


export default App;

import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { connectNickname } from '../actions/Actions.jsx';
import MessageBox from './MessageBox.jsx';
import Input from './Input.jsx';
import ConnectedMessage from './ConnectedMessage.jsx';
import HeaderControls from './HeaderControls.jsx';


class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      messages: [],
      username: '',
      logged: false,
      lastConnected: '',
    };
    this.NicknameInput = this.NicknameInput.bind(this);
  }


  NicknameInput(e) {
    e.preventDefault();
    const { connectNickname } = this.props;
    const nickname = e.target.lastChild.value;
    e.target.lastChild.value = '';
    connectNickname(nickname);
    this.setState({
      logged: true,
    });
  }


  render() {
    const mainStyle = {
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'flex-end',
      height: '600px',
      width: '600px',
      border: '1px solid darkgray',
      borderRadius: '2px',
      background: 'white',
      position: 'relative',
    };

    let Unchangable = false;
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
      userSelect: 'none',
    };

    if (this.state.logged) {
      Unchangable = true;
      nickNameStyle.zIndex = '-1';
      nickNameStyle.opacity = '0';
      nickNameStyle.transform = 'translateY(-50px)';
    }

    return (
      <div style={mainStyle}>
        <div style={nickNameStyle}>
          <form
            onSubmit={this.NicknameInput}
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
              nickname ?
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
        <HeaderControls />
        <ConnectedMessage />
        <MessageBox />
        <Input />
      </div>
    );
  }
}


App.propTypes = {
  connectNickname: PropTypes.func,
};

const mapStateToProps = state => ({
  username: state.userName,
});

const mapDispatchToProps = dispatch => ({
  connectNickname: (name) => {
    dispatch(connectNickname(name));
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(App);

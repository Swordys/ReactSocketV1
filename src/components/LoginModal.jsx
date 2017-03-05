import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { connectNickname, changeLoginStatus } from '../actions/Actions.jsx';

class LoginModal extends Component {

  constructor(props) {
    super(props);
    this.NicknameInput = this.NicknameInput.bind(this);
  }

  NicknameInput(e) {
    e.preventDefault();
    const { connectNickname, loginToRoom } = this.props;
    const nickname = e.target.lastChild.value;
    if (nickname.length > 0) {
      connectNickname(nickname);
      loginToRoom(true);
      e.target.lastChild.value = '';
    }
  }

  render() {
    let Unchangable = false;
    const { loggedState } = this.props;
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

    if (loggedState) {
      Unchangable = true;
      nickNameStyle.zIndex = '-1';
      nickNameStyle.opacity = '0';
      nickNameStyle.transform = 'translateY(-50px)';
    }

    return (
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
    );
  }
}


LoginModal.propTypes = {
  loggedState: PropTypes.bool.isRequired,
  connectNickname: PropTypes.func.isRequired,
  loginToRoom: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  loggedState: state.loggedState,
});

const mapDispatchToProps = dispatch => ({
  connectNickname: (name) => {
    dispatch(connectNickname(name));
  },
  loginToRoom: (status) => {
    dispatch(changeLoginStatus(status));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(LoginModal);

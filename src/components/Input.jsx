import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { sendGlobalMessage } from '../actions/Actions.jsx';

class Input extends Component {
  constructor(props) {
    super(props);
    this.submitMeesage = this.submitMeesage.bind(this);
  }

  submitMeesage(e) {
    e.preventDefault();
    const { sendGlobal, userName } = this.props;
    const message = { msg: e.target.firstChild.value, sender: userName };
    if (message.msg.length > 0) {
      e.target.firstChild.value = '';
      sendGlobal(message);
    }

    // auto scroll to bottom
    const msgWrap = document.querySelector('.trans-wrap');
    const isScrolled = msgWrap.scrollHeight - msgWrap.clientHeight <= msgWrap.scrollTop + 1;
    if (!isScrolled) {
      msgWrap.scrollTop = msgWrap.scrollHeight - msgWrap.clientHeight;
    }
  }

  render() {
    const inputStyle = {
      width: '100%',
      padding: '10px',
      border: '0',
      borderTop: '1px solid darkgray',
      boxSizing: 'border-box',
      background: '#f9f9f9'
    };

    return (
      <form onSubmit={this.submitMeesage}>
        <input placeholder="type here" style={inputStyle} type="text" />
      </form>
    );
  }
}

Input.propTypes = {
  sendGlobal: PropTypes.func.isRequired,
  userName: PropTypes.string,
};

const mapStateToProps = state => ({
  userName: state.userName,
});

const mapDispatchToProps = dispatch => ({
  sendGlobal: (message) => {
    dispatch(sendGlobalMessage(message));
  }
});
export default connect(mapStateToProps, mapDispatchToProps)(Input);

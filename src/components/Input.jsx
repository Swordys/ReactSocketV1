import React, { Component, PropTypes } from 'react';
import uuid from 'uuid';

class Input extends Component {
  constructor(props) {
    super(props);
    this.submitMeesage = this.submitMeesage.bind(this);
  }

  submitMeesage(e) {
    const {handleMessageInput} = this.props;
    e.preventDefault();
    const message = e.target.firstChild.value;
    if (message.length > 0) {
      e.target.firstChild.value = '';
      handleMessageInput({ message, key: uuid() });
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
        <input style={inputStyle} type="text" />
      </form>
    );
  }
}

Input.propTypes = {
  handleMessageInput: PropTypes.func.isRequired,
};

export default Input;

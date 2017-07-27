import React, { Component, PropTypes } from "react";
import socket from "../constants/clientSocket";
/* eslint-disable no-unused-vars */
import style from "../style/userConnected.css";
/* eslint-enable no-unused-vars */

class ConnectedMessage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      lastConnceted: "",
      toggle: true
    };
  }

  componentWillMount() {
    socket.on(`user connected`, user => {
      this.setState({
        lastConnected: user,
        toggle: !this.state.toggle
      });
    });
  }

  render() {
    const toggle = this.state.toggle;

    const MessageStyle = {
      background: "black",
      color: "white",
      fontFamily: "arial",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      position: "absolute",
      top: 50,
      right: 0,
      opacity: 0
    };

    let flash = "";
    if (toggle) {
      flash = "conncted-wrap";
    } else {
      flash = "conncted-wrap2";
    }

    return (
      <div className={flash} style={MessageStyle}>
        <span style={{ padding: "10px" }}>
          {this.state.lastConnected} connceted
        </span>
      </div>
    );
  }
}

ConnectedMessage.propTypes = {
  lastConnceted: PropTypes.string
};

export default ConnectedMessage;

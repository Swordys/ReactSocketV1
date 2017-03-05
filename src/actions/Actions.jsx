import moment from 'moment';
import uuid from 'uuid';
import socket from '../constants/clientSocket';

const connectNicknameSuccess = (name) => ({
  type: 'GET_NICKNAME_SUCCESS',
  name
});

export const connectNickname = (name) => (dispatch) => {
  socket.emit('user connected', name);
  dispatch(connectNicknameSuccess(name));
};

export const sendGlobalMessage = (message) => () => {
  const messageObj = {
    message: message.msg,
    key: uuid(),
    sender: message.sender,
    time: moment().format("HH:mm A"),
  };
  socket.emit('chat message', messageObj);
};

export const changeLoginStatus = (status) => dispatch => {
  if (status) {
    dispatch({
      type: 'LOGGED_IN',
      check: status
    });
  } else {
    dispatch({
      type: 'LOGGED_OUT',
      check: status,
    });
  }
};

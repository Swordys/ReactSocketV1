import moment from 'moment';
import uuid from 'uuid';
import socket from '../constants/clientSocket';

const connectRoomSuccess = (room) => ({
  type: 'CONNECTED_TO_ROOM',
  room,
});

export const connectToRoom = (room) => (dispatch) => {
  socket.emit('connect room', room);
  dispatch(connectRoomSuccess(room));
};

const connectNicknameSuccess = (name) => ({
  type: 'GET_NICKNAME_SUCCESS',
  name
});

export const connectNickname = (userObj) => (dispatch) => {
  socket.emit('user connected', userObj);
  dispatch(connectNicknameSuccess(userObj));
};

export const sendGlobalMessage = (message) => () => {
  const messageObj = {
    message: message.msg,
    key: uuid(),
    sender: message.sender,
    time: moment().format("HH:mm A"),
    room: message.room,
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

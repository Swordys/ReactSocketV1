import io from 'socket.io-client';
import uuid from 'uuid';
let socket = io('http://192.168.0.100:8000');

const connectNicknameSuccess = (name) => ({
  type: 'GET_NICKNAME_SUCCESS',
  name
});

export const connectNickname = (name) => (dispatch) => {
  socket.emit('user connected', name);
  dispatch(connectNicknameSuccess(name));
};



const sendGlobalMessageSuccess = (message) => ({
  type: 'GET_GLOBALMESSAGE_SUCCESS',
  message
});

export const sendGlobalMessage = (message) => (dispatch) => {
  const messageObj = {
    message: message.msg,
    key: uuid(),
    sender: message.sender,
  };
  socket.emit('chat message', messageObj);
  dispatch(sendGlobalMessageSuccess(messageObj));
};

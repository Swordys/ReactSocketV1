// Set up your root reducer here...
import {
  combineReducers
} from 'redux';
import {
  connectNicknameReducer,
  sendGlobalMessageReducer,
} from './Reducers.jsx';

export default combineReducers({
  userName: connectNicknameReducer,
  lastMessage: sendGlobalMessageReducer,
});

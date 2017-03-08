// Set up your root reducer here...
import {
  combineReducers
} from 'redux';
import {
  connectNicknameReducer,
  loggedState,
  connectedRoomReducer,
} from './Reducers.jsx';

export default combineReducers({
  userName: connectNicknameReducer,
  connectedRoom: connectedRoomReducer,
  loggedState,
});

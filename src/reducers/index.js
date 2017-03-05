// Set up your root reducer here...
import {
  combineReducers
} from 'redux';
import {
  connectNicknameReducer,
  loggedState,
} from './Reducers.jsx';

export default combineReducers({
  userName: connectNicknameReducer,
  loggedState,
});

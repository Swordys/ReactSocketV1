export const connectNicknameReducer = (state = '', action) => {
  switch (action.type) {
    case 'GET_NICKNAME_SUCCESS':
      return action.name;
    default:
      return state;
  }
};


export const loggedState = (state = true, action) => {
  switch (action.type) {
    case 'LOGGED_IN':
      return action.check;
    case 'LOGGED_OUT':
      return action.check;
    default:
      return false;
  }
};

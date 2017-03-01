export const connectNicknameReducer = (state = '', action) => {
  switch (action.type) {
    case 'GET_NICKNAME_SUCCESS':
      return action.name;
    default:
      return state;
  }
};


export const sendGlobalMessageReducer = (state = [], action) => {
  switch (action.type) {
    case 'GET_GLOBALMESSAGE_SUCCESS':
      return [...state, action.message];
    default:
      return state;
  }
};

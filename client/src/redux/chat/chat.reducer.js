import ChatActionTypes from './chat.types';

const INITIAL_STATE = {
  messages: null,
  error: null,
};

const chatReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case ChatActionTypes.GET_MESSAGES_SUCCESS:
      return {
        ...state,
        messages: action.payload,
        error: null,
      };
    case ChatActionTypes.GET_MESSAGES_FAILURE:
    case ChatActionTypes.SEND_MESSAGE_FAILURE:
      return {
        ...state,
        error: action.payload,
      };
    case ChatActionTypes.ADD_MESSAGE:
      return {
        ...state,
        messages: state.messages.concat(action.payload),
      };
    default:
      return state;
  }
};

export default chatReducer;

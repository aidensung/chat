import ChatActionTypes from './chat.types';

export const getMessagesStart = () => ({
  type: ChatActionTypes.GET_MESSAGES_START,
});

export const getMessagesSuccess = (chats) => ({
  type: ChatActionTypes.GET_MESSAGES_SUCCESS,
  payload: chats,
});

export const getMessagesFailure = (error) => ({
  type: ChatActionTypes.GET_MESSAGES_FAILURE,
  payload: error,
});

export const sendMessageStart = (messageInfo) => ({
  type: ChatActionTypes.SEND_MESSAGE_START,
  payload: messageInfo,
});

export const sendMessageSuccess = (message) => ({
  type: ChatActionTypes.SEND_MESSAGE_SUCCESS,
  payload: message,
});

export const sendMessageFailure = (error) => ({
  type: ChatActionTypes.SEND_MESSAGE_FAILURE,
  payload: error,
});

export const addMessage = (message) => ({
  type: ChatActionTypes.ADD_MESSAGE,
  payload: message,
});

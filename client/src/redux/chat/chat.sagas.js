import { takeLatest, put, all, call } from 'redux-saga/effects';

import axios from 'axios';

import ChatActionTypes from './chat.types';

import {
  getMessagesSuccess,
  getMessagesFailure,
  sendMessageSuccess,
  sendMessageFailure,
} from './chat.actions';

import { CHAT_SERVER } from '../../Config';

const getMessagesRequest = () => {
  const getMessagesResponse = axios
    .get(`${CHAT_SERVER}/getmessages`)
    .then((response) => response.data);

  return getMessagesResponse;
};

export function* getMessages() {
  try {
    const messages = yield getMessagesRequest();
    yield put(getMessagesSuccess(messages));
  } catch (err) {
    yield put(getMessagesFailure(err));
  }
}

export function* onGetMessagesStart() {
  yield takeLatest(ChatActionTypes.GET_MESSAGES_START, getMessages);
}

const sendMessageRequest = (message) => {
  const sendMessageResponse = axios
    .post(`${CHAT_SERVER}/sendmessage`, message)
    .then((response) => response.data);

  return sendMessageResponse;
};

export function* sendMessage({ payload }) {
  try {
    const message = yield sendMessageRequest(payload);
    yield put(sendMessageSuccess(message));
  } catch (err) {
    yield put(sendMessageFailure(err));
  }
}

export function* onSendMessageStart() {
  yield takeLatest(ChatActionTypes.SEND_MESSAGE_START, sendMessage);
}

export function* chatSagas() {
  yield all([call(onGetMessagesStart), call(onSendMessageStart)]);
}

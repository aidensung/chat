import { takeLatest, put, all, call } from 'redux-saga/effects';

import axios from 'axios';

import UserActionTypes from './user.types';

import {
  signInSuccess,
  signInFailure,
  signOutSuccess,
  signOutFailure,
  signUpSuccess,
  signUpFailure,
} from './user.actions';

import { USER_SERVER } from '../../Config';

const signInWithEmailAndPassword = (emailAndPassword) => {
  const signInResponse = axios
    .post(`${USER_SERVER}/signin`, emailAndPassword)
    .then((response) => response.data);

  return signInResponse;
};

export function* signInWithEmail({ payload }) {
  try {
    const user = yield signInWithEmailAndPassword(payload);
    yield put(signInSuccess(user));
  } catch (err) {
    yield put(signInFailure(err));
  }
}

export function* onEmailSignInStart() {
  yield takeLatest(UserActionTypes.EMAIL_SIGN_IN_START, signInWithEmail);
}

const getCurrentUser = () => {
  const user = axios
    .get(`${USER_SERVER}/auth`)
    .then((response) => response.data);

  return user;
};

export function* isUserAuthenticated() {
  try {
    const userAuth = yield getCurrentUser();
    if (!userAuth) return;
    yield put(signInSuccess(userAuth));
  } catch (err) {
    yield put(signInFailure(err));
  }
}

export function* onCheckUserAuth() {
  yield takeLatest(UserActionTypes.CHECK_USER_AUTH, isUserAuthenticated);
}

const signOutRequest = () => {
  axios.get(`${USER_SERVER}/signout`).then((response) => response.data);
};

export function* signOut() {
  try {
    yield signOutRequest();
    yield put(signOutSuccess());
  } catch (err) {
    yield put(signOutFailure(err));
  }
}

export function* onSignOutStart() {
  yield takeLatest(UserActionTypes.SIGN_OUT_START, signOut);
}

const signUpRequest = (userCredentials) => {
  const signUpResponse = axios
    .post(`${USER_SERVER}/signup`, userCredentials)
    .then((response) => response.data);

  return signUpResponse;
};

export function* signUp({ payload }) {
  try {
    const userCredentials = yield signUpRequest(payload);
    yield put(signUpSuccess(userCredentials));
  } catch (err) {
    yield put(signUpFailure(err));
  }
}

export function* onSignUpStart() {
  yield takeLatest(UserActionTypes.SIGN_UP_START, signUp);
}

export function* signInAfterSignUp({ payload }) {
  yield signInWithEmail({ payload: payload });
}

export function* onSignUpSuccess() {
  yield takeLatest(UserActionTypes.SIGN_UP_SUCCESS, signInAfterSignUp);
}

export function* userSagas() {
  yield all([
    call(onEmailSignInStart),
    call(onCheckUserAuth),
    call(onSignOutStart),
    call(onSignUpStart),
    call(onSignUpSuccess),
  ]);
}

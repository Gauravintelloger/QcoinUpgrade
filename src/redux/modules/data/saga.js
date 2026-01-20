// @flow

import { App_Service } from 'src/services';

import {
  takeLatest,
  put,
  call,
  fork,
  all
} from 'redux-saga/effects';

import {
  GET_FACEBOOK_DATA,
  fetchDataActionCreators,
  SET_INDEX,

} from './actions';

export function* setIndex({ payload }) {

  try {

    // alert(JSON.stringify(payload) + 'sdsd')

  } catch (e) {
  }
}

export default function* () {
  yield takeLatest(SET_INDEX, setIndex);

}

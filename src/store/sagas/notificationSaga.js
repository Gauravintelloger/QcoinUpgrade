import { call, put, takeLatest } from 'redux-saga/effects';
import C from '../constants';
import AsyncStorage from '@react-native-async-storage/async-storage';

const _retrieveData = async (item) => {
  try {
    const token = await AsyncStorage.getItem(item);
    if (token !== null) {
      return token

    } else {
      return null
    }
  } catch (error) {
  }
};

function* getNotification(action) {
  const { Api } = require("../../services");
  try {
    const token = yield call(_retrieveData, 'token')
    if (token) {
      const response = yield call(Api.notificationCall, { token });
      if (response.data && response.data.notifications) {
        yield put({
          type: C.GET_NOTIFICATION_SUCCEEDED,
          payload: response.data.notifications

        });
      } else {
        yield put({
          type: C.GET_NOTIFICATION_FAILED,
          payload: []
        });
      }
    }

  } catch (e) {
    console.log(e)
    yield put({
      type: C.GET_NOTIFICATION_FAILED,
      payload: {
        error: e
      }
    });
  }
}




function* notificationSaga() {
  yield takeLatest(C.GET_NOTIFICATION_REQUESTED, getNotification);
}

export default notificationSaga;
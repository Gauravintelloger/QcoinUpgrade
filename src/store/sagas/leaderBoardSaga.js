import { call, put, takeLatest } from 'redux-saga/effects';
import C from '../constants';
import { parsePosts } from '../helpers/postsHelpers';
import AsyncStorage from '@react-native-async-storage/async-storage';


function* getLeaderBoard(action) {
  const { Api } = require("../../services");
  try {
    const token = yield call(_retrieveData, 'token')
    if (token) {
      const response = yield call(Api.getLeaderBoardCall, { token, page: action.payload.page ? action.payload.page : 1,branch: action.payload.branch? action.payload.branch:""});
      if (response.data && response.data.users && response.data.users) {
        yield put({
          type: C.GET_LEADER_BOARD_SUCCEEDED,
          payload: response.data.users

        });
      } else {
        yield put({
          type: C.GET_LEADER_BOARD_FAILED,
          payload: {
            error: 'something went wrong [getPsots]'
          }
        });
      }
    }

  } catch (e) {
    console.log(e)
    yield put({
      type: C.GET_LEADER_BOARD_FAILED,
      payload: {
        error: 'something went wrong [getPsots]'
      }
    });
  }
}


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

function* leaderBoardSaga() {
  yield takeLatest(C.GET_LEADER_BOARD_REQUESTED, getLeaderBoard);
}

export default leaderBoardSaga;
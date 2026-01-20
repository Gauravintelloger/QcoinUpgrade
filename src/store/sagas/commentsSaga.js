import { call, put, takeLatest } from 'redux-saga/effects';
import C from '../constants';
import { parsePosts } from '../helpers/postsHelpers';

import {AsyncStorage} from '@react-native-async-storage/async-storage';

function* getCommentsForPost(action) {
  const { Api } = require("../../services");
  try {
    const token = yield call(_retrieveData, 'token')
    if (token) {
      const response = yield call(Api.getCommentsForPostCall, { token, id: action.payload.id, page: action.payload.page ? action.payload.page : 1 });
      if (response.data && response.data.comments && response.data.comments) {
        yield put({
          type: C.GET_COMMENTS_FOR_POST_SUCCEEDED,
          payload: {
            comments: response.data.comments,
            id: action.payload.id
          }

        });
      } else {
        yield put({
          type: C.GET_COMMENTS_FOR_POST_FAILED,
          payload: {
            error: 'something went wrong [getPsots]',
            id: action.payload.id
          }
        });
      }
    }

  } catch (e) {
    yield put({
      type: C.GET_COMMENTS_FOR_POST_FAILED,
      payload: {
        error: e
      }
    });
  }
}


function* createCommentForPost(action) {
  const { Api } = require("../../services");
  try {
    const token = yield call(_retrieveData, 'token')
    if (token) {
      const response = yield call(Api.createCommentForPostCall, { token, id: action.payload.id, body: action.payload.body });

      if (response.data && response.data.comment) {
        yield put({
          type: C.CREATE_COMMENT_FOR_POST_SUCCEEDED,
          payload: {
            comment: response.data.comment,
            id: action.payload.id,
            user: action.payload.user
          }

        });
      } else {
        yield put({
          type: C.CREATE_COMMENT_FOR_POST_FAILED,
          payload: {
            error: 'something went wrong [getPsots]',
            id: action.payload.id
          }
        });
      }
    }

  } catch (e) {
    console.log(e)
    yield put({
      type: C.CREATE_COMMENT_FOR_POST_FAILED,
      payload: {
        error: e
      }
    });
  }
}


function* delectCommentForPost(action) {
  const { Api } = require("../../services");
  try {
    const token = yield call(_retrieveData, 'token')
    if (token) {
      const response = yield call(Api.deleteCommentCall, { token, id: action.payload.commentId, });
      if (response.data && response.data.message == "Comment Deleted") {
        yield put({
          type: C.DELETE_COMMENT_FOR_POST_SUCCEEDED,
          payload: {
            commentId: action.payload.commentId,
            postId: action.payload.postId,
          }
        });
      } else {
        yield put({
          type: C.DELETE_COMMENT_FOR_POST_FAILED,
          payload: {
            error: 'something went wrong [delete comment]',
            id: action.payload.id
          }
        });
      }
    }

  } catch (e) {
    console.log(e)
    yield put({
      type: C.DELETE_COMMENT_FOR_POST_FAILED,
      payload: {
        error: e
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

function* commentsSaga() {
  yield takeLatest(C.GET_COMMENTS_FOR_POST_REQUESTED, getCommentsForPost);
  yield takeLatest(C.CREATE_COMMENT_FOR_POST_REQUESTED, createCommentForPost);
  yield takeLatest(C.DELETE_COMMENT_FOR_POST_REQUESTED, delectCommentForPost);

}

export default commentsSaga;
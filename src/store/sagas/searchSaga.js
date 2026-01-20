import { call, put, takeLatest } from 'redux-saga/effects';
import C from '../constants';
import { parsePosts } from '../helpers/postsHelpers';
import { getPostsAction } from '../actions/postsActions';
import Snackbar from 'react-native-snackbar';
import AsyncStorage from '@react-native-async-storage/async-storage';


function* search(action) {
    const { Api } = require("../../services");
    try {
        const token = yield call(_retrieveData, 'token')
        if (token) {
            const response = yield call(Api.searchUsersCall, { token, text: action.payload.text, branch:action.payload.branch });
            if (response.data && response.data.users) {
                // const parsedPosts = yield call(parsePosts, response.data.posts.data)
                yield put({
                    type: C.SEARCH_SUCCEEDED,
                    payload: response.data.users

                });
            } else {
                yield put({
                    type: C.SEARCH_SUCCEEDED,
                    payload: []
                });
            }
        }

    } catch (e) {
        yield put({
            type: C.SEARCH_FAILED,
            payload: {
                error: e
            }
        });
    }
}


function* tagUser(action) {
    const { pop } = require('../../navigation')
    try {
        yield put({
            type: C.TAG_USER_SUCCEEDED,
            payload: action.payload.user

        });
        pop(action.payload.componentId)
    } catch (e) {

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


function* getReasons(action) {
    const { Api } = require("../../services");
    try {
        const token = yield call(_retrieveData, 'token')
        if (token) {
            const response = yield call(Api.getReasonsCall, { token, });
            if (response.data && response.data.reasons) {
                // const parsedPosts = yield call(parsePosts, response.data.posts.data)
                yield put({
                    type: C.GET_REASONS_SUCCEEDED,
                    payload: response.data.reasons

                });
            } else {
                yield put({
                    type: C.GET_REASONS_FAILED,
                    payload: []
                });
            }
        }

    } catch (e) {
        yield put({
            type: C.SEARCH_FAILED,
            payload: {
                error: e
            }
        });
    }
}


function* createPost(action) {
    const { Api } = require("../../services");
    const { pop } = require('../../navigation')
    try {
        const token = yield call(_retrieveData, 'token')
        let user = yield call(_retrieveData, 'user')

        if (token) {
            user = JSON.parse(user)
            const response = yield call(Api.createPostCall, { token, ...action.payload });
            if (response.data && response.data.message && response.data.message === 'Post Created Successfully') {
              

                Snackbar.show({
                    text: response.data.message,
                    type: 'danger',
                    backgroundColor: 'green',

                    duration: Snackbar.LENGTH_LONG,
                    action: {
                        text: 'Okay',

                        onPress: () => { Snackbar.dismiss() },
                    },
                });
                // yield put(getPostsAction({ userId: user.id }))
                pop(action.payload.componentId)
                // const parsedPosts = yield call(parsePosts, response.data.posts.data)
                yield put({
                    type: C.CREATE_POST_SUCCEEDED,
                    payload: []
                });
            } else {
                let text = ''
                Object.keys(response.data.message).map(key => {
                    text = text + response.data.message[key][0] + '\n'
                })

                
                Snackbar.show({
                    text: text,
                    type: 'danger',
                    backgroundColor: 'red',

                    duration: Snackbar.LENGTH_LONG,
                    action: {
                        text: 'Okay',

                        onPress: () => { Snackbar.dismiss() },
                    },
                });
                yield put({
                    type: C.CREATE_POST_FAILED,
                    payload: []
                });
            }
        }

    } catch (e) {
        yield put({
            type: C.CREATE_POST_FAILED,
            payload: {
                error: e
            }
        });
    }
}




function* searchSaga() {
    yield takeLatest(C.SEARCH_REQUESTED, search);
    yield takeLatest(C.TAG_USER_REQUESTED, tagUser);
    yield takeLatest(C.GET_REASONS_REQUESTED, getReasons);
    yield takeLatest(C.CREATE_POST_REQUESTED, createPost)
}

export default searchSaga;
import { call, put, takeLatest } from 'redux-saga/effects';
import C from '../constants';
import { parsePosts } from '../helpers/postsHelpers';
import AsyncStorage from '@react-native-async-storage/async-storage';


function* getPosts(action) {
    const { Api } = require("../../services");
    try {
        const token = yield call(_retrieveData, 'token')
        if (token) {
            let params = { token, page: action.payload.page ? action.payload.page : 1 }
            if(action.payload.branch){
                params.branch = action.payload.branch
            }
            if(action.payload.name){
                params.name = action.payload.name
            }
            const response = yield call(Api.getPostsCall, params);

            if (response.data && response.data.Posts && response.data.Posts) {
                // const parsedPosts = yield call(parsePosts, response.data.posts.data)
                yield put({
                    type: C.GET_POSTES_SUCCEEDED,
                    payload: response.data.Posts

                });
            } else {
                yield put({
                    type: C.GET_POSTES_FAILED,
                    payload: {
                        error: 'something went wrong [getPsots]'
                    }
                });
            }
        }

    } catch (e) {
        alert(JSON.stringify(e))
        yield put({
            type: C.GET_USER_DETAILS_FAILED,
            payload: {
                error: e
            }
        });
    }
}


function* getLikesForPost(action) {
    const { Api } = require("../../services");
    try {
        const token = yield call(_retrieveData, 'token')
        if (token) {
            const response = yield call(Api.getLikesForPostCall, { token, id: action.payload.id, page: action.payload.page ? action.payload.page : 1 });
            if (response.data && response.data.likes && response.data.likes) {
                yield put({
                    type: C.GET_LIKES_FOR_POST_SUCCEEDED,
                    payload: {
                        likes: response.data.likes,
                        id: action.payload.id
                    }

                });
            } else {
                yield put({
                    type: C.GET_LIKES_FOR_POST_FAILED,
                    payload: {
                        error: 'something went wrong [getPsots]',
                        id: action.payload.id
                    }
                });
            }
        }

    } catch (e) {
        yield put({
            type: C.GET_LIKES_FOR_POST_FAILED,
            payload: {
                error: e
            }
        });
    }
}


function* likeUnLike(action) {
    const { Api } = require("../../services");
    try {
        const token = yield call(_retrieveData, 'token')
        if (token) {
            const response = yield call(Api.likeUnLikePostCall, { token, id: action.payload.id });
            // if (response.data && response.data.likes && response.data.likes) {
            //     yield put({
            //         type: C.GET_LIKES_FOR_POST_SUCCEEDED,
            //         payload: {
            //             likes: response.data.likes,
            //             id: action.payload.id
            //         }

            //     });
            // } else {
            //     yield put({
            //         type: C.GET_LIKES_FOR_POST_FAILED,
            //         payload: {
            //             error: 'something went wrong [getPsots]',
            //             id: action.payload.id
            //         }
            //     });
            // }
        }

    } catch (e) {
        // yield put({
        //     type: C.GET_LIKES_FOR_POST_FAILED,
        //     payload: {
        //         error: e
        //     }
        // });
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

function* postsSaga() {
    yield takeLatest(C.GET_POSTES_REQUESTED, getPosts);
    yield takeLatest(C.GET_LIKES_FOR_POST_REQUESTED, getLikesForPost)
    yield takeLatest(C.LIKE_UNLIKE_FOR_POST_REQUESTED, likeUnLike)

}

export default postsSaga;
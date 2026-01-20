import C from '../constants';
import { fromJS } from 'immutable';

const allPosts = {
    pending: false,
    list: [],
    error: null,
    success: false
    // page: 1,
    // hasMore: true,
    // lastRequest: {}
}

const postsByUserId = {
    pending: false,
    list: [],
    error: null,
    success: false
    // page: 1,
    // hasMore: true,
    // lastRequest: {}
}
const likesForPost = {
    pending: false,
    list: [],
    error: null,
    success: false
    // page: 1,
    // hasMore: true,
    // lastRequest: {}
}

const defaultState = fromJS({
    allPosts: {
        ...allPosts
    },
    postsByUserId: {

    },
    likesForPost: {
        ...likesForPost
    },
    postsById: {

    },

});

const posts = (state = defaultState, action) => {
    switch (action.type) {
        case C.GET_POSTES_REQUESTED:
            // const pageNum = action.payload.page ? action.payload.page : 1
            let postss = state.get('allPosts').list || [];
            return state.merge({
                allPosts: {
                    ...allPosts,
                    pending: true,
                    success: false,
                    list: postss
                    // error: null,
                }
            })
        case C.GET_POSTES_SUCCEEDED:
            let lastPost = action.payload.current_page === 1 ? [] : [...state.get('allPosts').list]
            let prevPostsById = state.get('postsById') || {};
            let data = [...action.payload.data];
            delete action.payload.data
            let newList = [...lastPost,
            ...data];
            let newPostByIds = {};
            newList.map(post => {
                newPostByIds[post.id] = {
                    "total_likes": post.total_likes,
                    "liked": post.liked,
                    "total_comments": post.total_comments,
                }
            })
            return state.merge({
                allPosts: {
                    ...allPosts,
                    pending: false,
                    list: newList,
                    success: true,
                    ...action.payload
                },
                postsById: {
                    ...prevPostsById,
                    ...newPostByIds,
                }
            })
        case C.GET_POSTES_FAILED:
            return state.merge({
                allPosts: {
                    ...allPosts,
                    pending: false,
                    list: [],
                    error: action.payload,
                    success: false
                }
            })

        case C.GET_LIKES_FOR_POST_REQUESTED:
            // const pageNum = action.payload.page ? action.payload.page : 1
            let people = state.get('likesForPost')[action.payload.id] ? state.get('likesForPost')[action.payload.id].list : [];
            return state.merge({
                likesForPost: {
                    ...state.get('likesForPost'),
                    [action.payload.id]: {
                        pending: true,
                        success: false,
                        list: people
                    }
                    // error: null,
                }
            })
        case C.GET_LIKES_FOR_POST_SUCCEEDED:
            const likesForPostbyID = state.get('likesForPost')[action.payload.id] ? state.get('likesForPost')[action.payload.id] : { list: [] }
            let lastPeople = action.payload.likes.current_page === 1 ? [] : [...likesForPostbyID.list]
            let data1 = [...action.payload.likes.data];
            delete action.payload.likes.data
            return state.merge({
                likesForPost: {
                    ...state.get('likesForPost'),
                    [action.payload.id]: {
                        ...likesForPostbyID,
                        pending: false,
                        list: [
                            ...lastPeople,
                            ...data1
                        ],
                        success: true,
                        ...action.payload.likes
                    }
                }
            })
        case C.GET_LIKES_FOR_POST_FAILED:
            return state.merge({
                likesForPost: {
                    ...state.get('likesForPost'),
                    [action.payload.id]: {
                        pending: false,
                        list: [],
                        error: action.payload,
                        success: false
                    }
                }
            })


        case C.GET_USER_PROFILE_REQUESTED:
            const lastProfiles = state.get('postsByUserId');
            const profile = postsByUserId // remove 9

            let postss2 = (state.get('postsByUserId')[action.payload.userId] || {}).list || [];
            return state.merge({
                postsByUserId: {
                    ...lastProfiles,
                    [action.payload.userId]: {
                        ...profile,
                        pending: true,
                        list: postss2,
                        success: false
                    }
                }
            })
        case C.GET_USER_PROFILE_SUCCEEDED:
            const lastProfiles2 = state.get('postsByUserId');
            const prevPostByIds1 = state.get('postsById') || {};

            const profile2 = lastProfiles2[action.payload.userId] // remove 9
            let postss3 = (state.get('postsByUserId')[action.payload.userId] || {}).list || [];
            const { current_page, data: data3 } = action.payload.posts;
            let lastPost2 = current_page === 1 ? [] : [...postss3]
            let data2 = [...data3];
            delete action.payload.posts.data
            let newList1 = [
                ...lastPost2,
                ...data2];
            let newPostByIds1 = {};
            newList1.map(post => {
                newPostByIds1[post.id] = {
                    "total_likes": post.total_likes,
                    "liked": post.liked,
                    "total_comments": post.total_comments,
                }
            })

            return state.merge({
                postsByUserId: {
                    ...lastProfiles2,
                    [action.payload.userId]: {
                        ...profile2,
                        success: true,
                        pending: false,
                        list: newList1,
                        achievments: action.payload.achievments || [],
                        user_info: action.payload.user_info,
                        ...action.payload.posts
                    },
                    postsById: {
                        ...prevPostByIds1,
                        ...newPostByIds1
                    }
                }
            })
        case C.GET_USER_PROFILE_FAILED:
            const lastProfiles3 = state.get('postsByUserId');
            const profile3 = lastProfiles3[action.payload.userId] // remove 9

            return state.merge({
                postsByUserId: {
                    ...lastProfiles3,
                    [action.payload.userId]: {
                        ...profile3,
                        error: action.payload,
                        list: []
                    }
                }
            })

        case C.CREATE_COMMENT_FOR_POST_SUCCEEDED:
            const prevPostByIds2 = state.get('postsById') || {};
            const pppp = prevPostByIds2[action.payload.id] ?
                prevPostByIds2[action.payload.id]
                : {
                    "total_likes": 0,
                    "liked": false,
                    "total_comments": 0,
                }
            return state.merge({
                postsById: {
                    ...prevPostByIds2,
                    [action.payload.id]: {
                        ...pppp,
                        total_comments: pppp.total_comments + 1
                    }
                }
            })
        case C.DELETE_COMMENT_FOR_POST_SUCCEEDED:
            const prevPostByIds22 = state.get('postsById') || {};
            const eeee = prevPostByIds22[action.payload.postId] ?
                prevPostByIds22[action.payload.postId]
                : {
                    "total_likes": 0,
                    "liked": false,
                    "total_comments": 0,
                }
            return state.merge({
                postsById: {
                    ...prevPostByIds22,
                    [action.payload.postId]: {
                        ...eeee,
                        total_comments: eeee.total_comments - 1 > 0 ? eeee.total_comments - 1 : 0
                    }
                }
            })

        case C.LIKE_UNLIKE_FOR_POST_REQUESTED:
            const prevPostByIds3 = state.get('postsById') || {};
            const pppp1 = prevPostByIds3[action.payload.id] ?
                prevPostByIds3[action.payload.id]
                : {
                    "total_likes": 0,
                    "liked": false,
                    "total_comments": 0,
                }
            return state.merge({
                postsById: {
                    ...prevPostByIds3,
                    [action.payload.id]: {
                        ...pppp1,
                        total_likes: pppp1.liked ? pppp1.total_likes - 1 : pppp1.total_likes + 1,
                        liked: pppp1.liked ? false : true
                    }
                }
            })
        default:
            return state
    }
};

export default posts;
import C from '../constants';

const getPostsAction = payload => {
    return {
        type: C.GET_POSTES_REQUESTED,
        payload
    }
};

const getLikesForPostAction = payload => {
    return {
        type: C.GET_LIKES_FOR_POST_REQUESTED,
        payload
    }
};


const likeUnLikeAction = payload => {
    return {
        type: C.LIKE_UNLIKE_FOR_POST_REQUESTED,
        payload
    }
};

export {
    getPostsAction,
    getLikesForPostAction,
    likeUnLikeAction,
};
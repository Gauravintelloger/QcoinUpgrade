import C from '../constants';

const getCommentsForPostAction = payload => {
  return {
    type: C.GET_COMMENTS_FOR_POST_REQUESTED,
    payload,
  };
};

const createCommentForPostAction = payload => {
  return {
    type: C.CREATE_COMMENT_FOR_POST_REQUESTED,
    payload,
  };
};


const deleteCommentForPostAction = payload => {
  return {
    type: C.DELETE_COMMENT_FOR_POST_REQUESTED,
    payload,
  };
};

export {
  getCommentsForPostAction,
  createCommentForPostAction,
  deleteCommentForPostAction
};

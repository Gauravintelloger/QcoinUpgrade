import C from '../constants';

const deleteCommentForPost = payload => {
  return {
    type: C.DELETE_COMMENT_SUCCESS,
    payload,
  };
};

export default deleteCommentForPost;

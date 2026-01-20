import C from '../constants';

const searchAction = payload => {
  return {
    type: C.SEARCH_REQUESTED,
    payload
  }
};

const tagUserAction = payload => {
  return {
    type: C.TAG_USER_REQUESTED,
    payload
  }
};

const getReasonsAction = payload => {
  return {
    type: C.GET_REASONS_REQUESTED,
    payload
  }
};


const createPostAction = payload => {
  return {
    type: C.CREATE_POST_REQUESTED,
    payload
  }
};

export {
  searchAction,
  tagUserAction,
  getReasonsAction,
  createPostAction,
};
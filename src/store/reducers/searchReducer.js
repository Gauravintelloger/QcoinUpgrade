import C from '../constants';
import { fromJS } from 'immutable';

const defaultState = fromJS({
  pending: false,
  users: [],
  success: false,
  error: null,
  tagedUser: null,
  reasons: [],
  createPost: {
    pending: false,
    success: false,
  },
});

const search = (state = defaultState, action) => {
  switch (action.type) {
    case C.SEARCH_REQUESTED:
      return state.merge({
        pending: true,
        success: false,
        users: [],
      });
    case C.SEARCH_SUCCEEDED:
      return state.merge({
        pending: false,
        success: true,
        users: action.payload,
      });
    case C.SEARCH_FAILED:
      return state.merge({
        pending: false,
        success: false,
        users: [],
        error: action.payload,
      });
    case C.TAG_USER_REQUESTED:
      console.log(action.payload)
      return state.merge({
        tagedUser: {
          ...action.payload
        },
      });
    case C.TAG_USER_SUCCEEDED:
      return state.merge({
        tagedUser: action.payload,
      });
    case C.GET_REASONS_REQUESTED:
      return state.merge({
        reasons: [],
      });
    case C.GET_REASONS_SUCCEEDED:
      return state.merge({
        reasons: action.payload,
      });
    case C.GET_REASONS_FAILED:
      return state.merge({
        reasons: [],
      });
    case C.CREATE_POST_REQUESTED:
      return state.merge({
        createPost: {
          pending: true,
          success: false,
        },
      });
    case C.CREATE_POST_SUCCEEDED:
      return state.merge({
        createPost: {
          pending: false,
          success: true,
        },
        tagedUser: null
      });
    case C.CREATE_POST_FAILED:
      return state.merge({
        createPost: {
          pending: false,
          success: false,
        },
      });
    default:
      return state;
  }
};

export default search;

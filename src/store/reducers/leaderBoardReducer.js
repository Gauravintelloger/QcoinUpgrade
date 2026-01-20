import C from '../constants';
import { fromJS } from 'immutable';

const users = {
  pending: false,
  list: [],
  error: null,
  success: false
  // page: 1,
  // hasMore: true,
  // lastRequest: {}
}


const defaultState = fromJS({
  users: {
    ...users
  },
  postsByUserId: {

  }
});

const leaderBoard = (state = defaultState, action) => {
  switch (action.type) {
    case C.GET_LEADER_BOARD_REQUESTED:
      // const pageNum = action.payload.page ? action.payload.page : 1
      let postss = state.get('users').list || [];
      return state.merge({
        users: {
          ...users,
          pending: true,
          success: false,
          list: postss
          // error: null,
        }
      })
    case C.GET_LEADER_BOARD_SUCCEEDED:
      let lastPost = action.payload.current_page === 1 ? [] : [...state.get('users').list]
      let data = [...action.payload.data];
      delete action.payload.data
      return state.merge({
        users: {
          ...users,
          pending: false,
          list: [
            ...lastPost,
            ...data
          ],
          success: true,
          ...action.payload
        }
      })
    case C.GET_LEADER_BOARD_FAILED:
      return state.merge({
        users: {
          ...users,
          pending: false,
          list: [],
          error: action.payload,
          success: false
        }
      })


    default:
      return state
  }
};

export default leaderBoard;
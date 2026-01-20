import C from '../constants';
import { fromJS } from 'immutable';

const notifications = {
  pending: false,
  list: [],
  error: null,
  success: false
}


const defaultState = fromJS({
  notifications: {
    ...notifications
  },

});

const notification = (state = defaultState, action) => {
  switch (action.type) {
    case C.GET_NOTIFICATION_REQUESTED:
      // const pageNum = action.payload.page ? action.payload.page : 1
      return state.merge({
        notifications: {
          pending: true,
          success: false,
          list: []
          // error: null,
        }
      })
    case C.GET_NOTIFICATION_SUCCEEDED:
      return state.merge({
        notifications: {
          pending: false,
          list: action.payload,
          success: true,
        }
      })
    case C.GET_NOTIFICATION_FAILED:
      return state.merge({
        notifications: {
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

export default notification;
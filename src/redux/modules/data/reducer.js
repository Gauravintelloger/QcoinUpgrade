// @flow

import {
  GET_FACEBOOK_DATA_SUCCESS,
  SET_INDEX,
} from './actions';

export const DEFAULT = {
  selected: 0,
};

export default function data(state = DEFAULT, action = {}) {
  const { type, payload } = action;

  switch (type) {
    case GET_FACEBOOK_DATA_SUCCESS: {
      return {
        ...state,
        user: payload
      };
    }
    case SET_INDEX: {
      return {
        ...state,
        selected: action.payload
      }
    }
    default:
      return state;
  }
}

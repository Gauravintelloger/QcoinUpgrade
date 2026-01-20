import C from '../constants';
import { fromJS } from 'immutable';

const userProfile = {
  pending: false,
  error: null,
  success: false
}

const userById = {
  pending: false,
  error: null,
  success: false,
  list: [],
  achievments: [],
  userInfo: {}
}

const defaultState = fromJS({
  pending: false,
  accessToken: null,
  success: false,
  error: null,
  tokenType: '',
  userProfile: {
    ...userProfile
  },
  errors: [],
  selected: 0,
  userById: {}
});

const user = (state = defaultState, action) => {
  switch (action.type) {
    case C.LOGIN_USER_REQUESTED:
      return state.merge({
        pending: true,
        accessToken: null,
        error: null,
        tokenType: '',
        userProfile: { ...userProfile },
        success: false
      })
    case C.LOGIN_USER_SUCCEEDED:
      return state.merge({
        pending: false,
        accessToken: action.payload.accessToken,
        tokenType: action.payload.tokenType,
        userProfile: { ...action.payload.user, success: true },
        changePassword: action.payload.changePassword,
        success: true
      })
    case C.LOGIN_USER_FAILED:
      return state.merge({
        pending: false,
        error: action.payload.error,
        errors: action.payload.errors || [],
        userProfile: { ...userProfile },
        success: false
      })
    case C.GET_USER_DETAILS_REQUESTED:
      return state.merge({
        userProfile: { ...state.get('userProfile'), success: false },
      })
    case C.GET_USER_DETAILS_SUCCEEDED:
      return state.merge({
        userProfile: { ...action.payload, success: true },
      })
    case C.GET_USER_PROFILE_REQUESTED:
      const lastProfiles = state.get('userById');
      const profile = userById // remove 9
      return state.merge({
        userById: {
          ...lastProfiles,
          [action.payload.userId]: {
            ...profile,
            pending: true
          }
        }
      })
    case C.GET_USER_PROFILE_SUCCEEDED:
      const lastProfiles2 = state.get('userById');
      const profile2 = lastProfiles2[action.payload.userId] || userById // remove 9
      return state.merge({
        userById: {
          ...lastProfiles2,
          [action.payload.userId]: {
            ...profile2,
            success: true,
            pending: false,
            achievments: action.payload.achievments,
            userInfo: action.payload.user_info || {},
          }
        }
      })
    case C.GET_USER_PROFILE_FAILED:
      const lastProfiles3 = state.get('userById');
      const profile3 = lastProfiles3[action.payload.userId] || userById // remove 9

      return state.merge({
        userById: {
          ...lastProfiles3,
          [action.payload.userId]: {
            ...profile3,
            error: action.payload
          }
        }
      })
    default:
      return state
  }
};

export default user;
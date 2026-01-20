import C from '../constants';

const loginAction = payload => {
  return {
    type: C.LOGIN_USER_REQUESTED,
    payload
  }
};


const getUserDetailsAction = payload => {
  return {
    type: C.GET_USER_DETAILS_REQUESTED,
    payload
  }
};

const changePasswordAction = payload => {
  return {
    type: C.CHANGE_PASSWORD_REQUESTED,
    payload
  }
};

const getUserProfileAction = payload => {
  return {
    type: C.GET_USER_PROFILE_REQUESTED,
    payload
  }
};


const forgotPasswordAction = payload => {
  return {
    type: C.FORGOT_PASSWORD_REQUESTED,
    payload
  }
};

const updateUserImageAction = payload => {
  return {
    type: C.UPDATE_IMAGE_REQUESTED,
    payload
  }
};

export {
  loginAction,
  changePasswordAction,
  getUserProfileAction,
  getUserDetailsAction,
  forgotPasswordAction,
  updateUserImageAction,
};
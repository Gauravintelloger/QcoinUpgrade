import store from '../../store';
 const apiUrl = 'https://qcoinapp.com/api/v1';
//const apiUrl = 'https://kpmg.designinjo.com/api/v1'
import { Platform } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const loginCall = payload => {
  const { AppService } = require('../')
  let params = {
    email: payload.email,
    password: payload.password,
    deviceToken: payload.deviceToken,
  };
  const url = `${apiUrl}/login`;
  return AppService({ url, method: 'POST', params });
};

const requestRedeemCall = async (payload = {}) => {
  const { AppService } = require('../')
  const token = await AsyncStorage.getItem("token");
  const url = `${apiUrl}/requestRedeem`
  return AppService({
    url,
    method: 'POST',
    params: payload,
    authToken: token,
  });
}

const getRedeemsCall = async (payload = {}) => {
  const { AppService } = require('../')
  const token = await AsyncStorage.getItem("token");
  const url = `${apiUrl}/getRedeems`
  return AppService({
    url,
    method: 'GET',
    payload,
    authToken: token,
  });
}

const changePasswordCall = payload => {
  const { AppService } = require('../')
  let params = {
    old_password: payload.old_password,
    password: payload.password,
    password_confirmation: payload.password_confirmation,
  };
  const url = `${apiUrl}/auth/changePassword`;
  return AppService({
    url,
    method: 'POST',
    params,
    authToken: payload.token
      ? payload.token
      : store.getState().user.get('accessToken'),
  });
};

const getPostsCall = payload => {
  const { AppService } = require('../')
  let params = {
    // state_id: payload.id
  };
  const url = `${apiUrl}/posts/getPosts?page=${
    payload.page ? payload.page : 1
    }&branch=${payload.branch?payload.branch:""}&name=${payload.name?payload.name:""}`;
  return AppService({
    url,
    method: 'GET',
    params,
    authToken: payload.token
      ? payload.token
      : store.getState().user.get('accessToken'),
  }); // remove token
};

const getUserProfileCall = async (payload) => {
  const { AppService } = require('../')
  const token = await AsyncStorage.getItem("token");

  let params = {
    // state_id: payload.id
  };
  const url = `${apiUrl}/user/profile/${payload.userId}?page=${
    payload.page ? payload.page : 1
    }`;
  return AppService({
    url,
    method: 'GET',
    params,
    authToken:token
  }); // remove token
};

const getUserDataCall = payload => {
  const { AppService } = require('../')
  let params = {
    // state_id: payload.id
  };
  const url = `${apiUrl}/auth/user`;
  return AppService({
    url,
    method: 'GET',
    params,
    authToken: payload.token
      ? payload.token
      : store.getState().user.get('accessToken'),
  }); // remove token
};

const searchUsersCall = payload => {
  const { AppService } = require('../')
  let params = {
    // state_id: payload.id
  };
  
  let url = `${apiUrl}/searchUsers?name=${payload.text?payload.text:""}&branch=${payload.branch?payload.branch:""}`;
  if(Platform.OS === 'android') {
    url = url.replace("/searchUsers","/searchUsersandroid");
  }

  return AppService({
    url,
    method: 'GET',
    params,
    authToken: payload.token
      ? payload.token
      : store.getState().user.get('accessToken'),
  }); // remove token
};

const getReasonsCall = payload => {
  const { AppService } = require('../')
  let params = {
    // state_id: payload.id
  };
  const url = `${apiUrl}/posts/getReasons`;
  return AppService({
    url,
    method: 'GET',
    params,
    authToken: payload.token
      ? payload.token
      : store.getState().user.get('accessToken'),
  }); // remove token
};

const createPostCall = payload => {
  const { AppService } = require('../')
  let params = {
    user_id: payload.user_id,
    given_points: payload.given_points,
    body: payload.body,
    reason: payload.reason,
  };
  const url = `${apiUrl}/posts/createPost`;
  return AppService({
    url,
    method: 'POST',
    params,
    authToken: payload.token
      ? payload.token
      : store.getState().user.get('accessToken'),
  });
};

const getRedeemRequests = async (payload) =>{
  const { AppService } = require('../')
  const token = await AsyncStorage.getItem("token");

  let params = {
    // state_id: payload.id
  };
  const url = `${apiUrl}/userRequests`;
  return AppService({
    url,
    method: 'GET',
    params,
    authToken: token
  }); // remove token
} 

const getLeaderBoardCall = payload => {
  const { AppService } = require('../')
  let params = {
    // state_id: payload.id
  };

  const url = `${apiUrl}/leaderboard?branch=${payload.branch}`;
  return AppService({
    url,
    method: 'GET',
    params,
    authToken: payload.token
      ? payload.token
      : store.getState().user.get('accessToken'),
  }); // remove token
};

const getLikesForPostCall = payload => {
  const { AppService } = require('../')
  let params = {
    // state_id: payload.id
  };
  const url = `${apiUrl}/posts/getPost/likes/${payload.id}?page=${
    payload.page ? payload.page : 1
    }`;
  return AppService({
    url,
    method: 'GET',
    params,
    authToken: payload.token
      ? payload.token
      : store.getState().user.get('accessToken'),
  }); // remove token
};

const getCommentsForPostCall = payload => {
  const { AppService } = require('../')
  let params = {
    // state_id: payload.id
  };
  const url = `${apiUrl}/posts/getPost/comments/${payload.id}?page=${
    payload.page ? payload.page : 1
    }`;
  return AppService({
    url,
    method: 'GET',
    params,
    authToken: payload.token
      ? payload.token
      : store.getState().user.get('accessToken'),
  }); // remove token
};

const createCommentForPostCall = payload => {
  const { AppService } = require('../')
  let params = {
    body: payload.body,
  };
  const url = `${apiUrl}/posts/addComment/${payload.id}`;
  return AppService({
    url,
    method: 'POST',
    params,
    authToken: payload.token
      ? payload.token
      : store.getState().user.get('accessToken'),
  });
};

const deleteCommentCall = payload => {
  const { AppService } = require('../')
  let params = {};
  const url = `${apiUrl}/delete/comment/${payload.id}`;
  return AppService({
    url,
    method: 'GET',
    params,
    authToken: payload.token
      ? payload.token
      : store.getState().user.get('accessToken'),
  });
};

const likeUnLikePostCall = payload => {
  const { AppService } = require('../')
  let params = {};
  const url = `${apiUrl}/posts/likeUnLike/${payload.id}`;
  return AppService({
    url,
    method: 'GET',
    params,
    authToken: payload.token
      ? payload.token
      : store.getState().user.get('accessToken'),
  }); // remove token
};

const forgotPasswordCall = payload => {
  const { AppService } = require('../')
  let params = {
    email: payload.email,
  };
  const url = `${apiUrl}/forgetPassword`;
  return AppService({ url, method: 'POST', params });
};

const updateUserDataCall = payload => {
  const { AppServiceForm } = require('../')
  var form = new FormData();
  let data = null
  if (payload.image) {
    if (!payload.image.path.startsWith("file://")) {
      payload.image.path = "file://" + payload.image.path
    }
    console.log(payload.image.path)
    data = {
      uri: payload.image.path,
      name: payload.image.filename || 'image' + '.JPG',
      type: payload.image.mime,
    }
  }
  form.append('image', data);
  // form.append("image", payload.image.path)
  const url = `${apiUrl}/auth/user/updateInfo`;
  return AppServiceForm({
    url,
    method: 'POST',
    form,
    authToken: payload.token
      ? payload.token
      : store.getState().user.get('accessToken'),
  });
};

const notificationCall = async (payload) => {
  const { AppService } = require('../')
  const url = `${apiUrl}/notifications`;
  return AppService({
    url,
    method: 'GET',
    authToken: payload.token
      ? payload.token
      : store.getState().user.get('accessToken'),
  });
};

const getPostCall = payload => {
  const { AppService } = require('../')
  const url = `${apiUrl}/posts/getPost/${payload.post_id}`;
  return AppService({
    url,
    method: 'GET',
    authToken: payload.token
      ? payload.token
      : store.getState().user.get('accessToken'),
  });
};

const getBranchesCall = payload => {
  const { AppService } = require('../')
  const url = `${apiUrl}/country/branches`;
  return AppService({
    url,
    method: 'GET',
    authToken: payload.token
      ? payload.token
      : store.getState().user.get('accessToken'),
  });
};

const getAppVersionCall = payload => {
  const { AppService } = require('../')
  const url = `${apiUrl}/appVersion`;
  return AppService({
    url,
    method: 'GET',
    // authToken: payload.token
    //   ? payload.token
    //   : store.getState().user.get('accessToken'),
  });
};

export {
  deleteCommentCall,
  loginCall,
  getPostsCall,
  changePasswordCall,
  getUserProfileCall,
  searchUsersCall,
  getReasonsCall,
  createPostCall,
  getLeaderBoardCall,
  getLikesForPostCall,
  getCommentsForPostCall,
  createCommentForPostCall,
  getUserDataCall,
  likeUnLikePostCall,
  forgotPasswordCall,
  updateUserDataCall,
  notificationCall,
  getPostCall,
  getAppVersionCall,
  getBranchesCall,
  getRedeemsCall,
  requestRedeemCall,
  getRedeemRequests
};

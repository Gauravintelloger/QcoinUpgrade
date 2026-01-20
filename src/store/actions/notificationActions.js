
import C from '../constants';

const getNotificationAction = payload => {
  return {
    type: C.GET_NOTIFICATION_REQUESTED,
    payload
  }
};

export {
  getNotificationAction
};
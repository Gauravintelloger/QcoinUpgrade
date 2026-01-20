import { createSelector } from 'reselect';

const notificationState = state => state.notification;

export const notificationSelector = createSelector(
  notificationState,
  notification => notification.get('notifications')
);

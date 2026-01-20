import { connect } from "react-redux";
// import NotificationScreen from './NotificationScreen';
import { getNotificationAction } from "../../store/actions/notificationActions";
import { notificationSelector } from "../../store/selectors/notificationSelectors";
import React, { Suspense } from "react";
import { Text } from "react-native";
const LazyNotificationScreen = React.lazy(() => import("./NotificationScreen"));

const NotificationScreenWrapper = (props) => (
  <Suspense fallback={<Text>Loading...</Text>}>
    <LazyNotificationScreen {...props} />
  </Suspense>
);

const mapStateToProps = (state) => {
  return {
    notification: notificationSelector(state),
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getNotification: (p) => dispatch(getNotificationAction(p)),
  };
};

const mergeProps = (stateProps, dispatchProps, ownProps) => {
  return {
    ...ownProps,
    ...stateProps,
    ...dispatchProps,
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
  mergeProps
)(NotificationScreenWrapper);

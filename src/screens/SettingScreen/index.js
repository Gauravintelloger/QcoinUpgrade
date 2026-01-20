import { connect } from "react-redux";
// import SettingScreen from './SettingScreen';
import {
  accessTokenSelector,
  pendingSelector,
  errorSelector,
  userProfileSelector,
} from "../../store/selectors/userSelectors";
import { changePasswordAction } from "../../store/actions/userActions";
import React, { Suspense } from "react";
import { Text } from "react-native";
const LazySettingScreen = React.lazy(() => import("./SettingScreen"));

const SettingScreenWrapper = (props) => (
  <Suspense fallback={<Text>Loading...</Text>}>
    <LazySettingScreen {...props} />
  </Suspense>
);
const mapStateToProps = (state) => {
  return {
    token: accessTokenSelector(state),
    pending: pendingSelector(state),
    error: errorSelector(state),
    userProfile: userProfileSelector(state),
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    changePassword: (payload) => dispatch(changePasswordAction(payload)),
    getUserProfile: (payload) => dispatch(getUserProfileAction(payload)),
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
)(SettingScreenWrapper);

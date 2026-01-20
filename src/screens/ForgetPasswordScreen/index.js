import { connect } from "react-redux";
// import ForgetPasswordScreen from './ForgetPasswordScreen';
import {
  accessTokenSelector,
  pendingSelector,
  errorSelector,
} from "../../store/selectors/userSelectors";
import {
  changePasswordAction,
  forgotPasswordAction,
} from "../../store/actions/userActions";
import React, { Suspense } from "react";
import { Text } from "react-native";
const LazyForgetPasswordScreen = React.lazy(() =>
  import("./ForgetPasswordScreen")
);

const ForgetPasswordScreenWrapper = (props) => (
  <Suspense fallback={<Text>Loading...</Text>}>
    <LazyForgetPasswordScreen {...props} />
  </Suspense>
);
const mapStateToProps = (state) => {
  return {
    token: accessTokenSelector(state),
    pending: pendingSelector(state),
    error: errorSelector(state),
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    forgotPassword: (payload) => dispatch(forgotPasswordAction(payload)),
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
)(ForgetPasswordScreenWrapper);

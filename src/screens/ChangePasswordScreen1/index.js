import { connect } from "react-redux";
// import ChangePasswordScreen1 from './ChangePasswordScreen1';
import {
  accessTokenSelector,
  pendingSelector,
  errorSelector,
} from "../../store/selectors/userSelectors";
import { changePasswordAction } from "../../store/actions/userActions";
import React, { Suspense } from "react";
import { Text } from "react-native";
const LazyChangePasswordScreen1 = React.lazy(() =>
  import("./ChangePasswordScreen1")
);

const ChangePasswordScreen1Wrapper = (props) => (
  <Suspense fallback={<Text>Loading...</Text>}>
    <LazyChangePasswordScreen1 {...props} />
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
    changePassword: (payload) => dispatch(changePasswordAction(payload)),
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
)(ChangePasswordScreen1Wrapper);

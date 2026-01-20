import { connect } from "react-redux";
// import SigninScreen from './SigninScreen';
import {
  accessTokenSelector,
  pendingSelector,
  errorSelector,
} from "../../store/selectors/userSelectors";
import { loginAction } from "../../store/actions/userActions";
import React, { Suspense } from "react";
import { Text } from "react-native";
const LazySigninScreen = React.lazy(() => import("./SigninScreen"));

const SigninScreenWrapper = (props) => {
  console.log('props', props)
  return(
  <Suspense fallback={<Text>Loading...</Text>}>
  {/* <Text>Loading...</Text> */}
    <LazySigninScreen {...props} />
  </Suspense>
)};

const mapStateToProps = (state) => {
  return {
    token: accessTokenSelector(state),
    pending: pendingSelector(state),
    error: errorSelector(state),
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    login: (payload) => dispatch(loginAction(payload)),
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
)(SigninScreenWrapper);

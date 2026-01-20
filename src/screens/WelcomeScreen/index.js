import { connect } from "react-redux";
// import WelcomeScreen from './WelcomeScreen';
import {
  accessTokenSelector,
} from "../../store/selectors/userSelectors";
import {
  getUserDetailsAction,
} from "../../store/actions/userActions";
import React, { Suspense } from "react";
import { Text } from "react-native";
const LazyWelcomeScreen = React.lazy(() => import("./WelcomeScreen"));
console.log("calling welcome index")

const WelcomeScreenWrapper = (props) => (
  <Suspense fallback={<Text>Loading...</Text>}>
    <LazyWelcomeScreen {...props} />
  </Suspense>
);

const mapStateToProps = (state) => {
  return {
    token: accessTokenSelector(state),
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getUserDetails: (payload) => dispatch(getUserDetailsAction(payload)),
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
)(WelcomeScreenWrapper);

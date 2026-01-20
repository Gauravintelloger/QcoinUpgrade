import { connect } from "react-redux";
// import NotFoundScreen from './NotFoundScreen';
import {
  userProfileSelector,
  accessTokenSelector,
  userDetailsSelector,
  userReportSelector,
} from "../../store/selectors/userSelectors";
import {
  getUserProfileAction,
  userReportAction,
} from "../../store/actions/userActions";
import React, { Suspense } from "react";
import { Text } from "react-native";
const LazyNotFoundScreen = React.lazy(() => import("./NotFoundScreen"));

const NotFoundScreenWrapper = (props) => (
  <Suspense fallback={<Text>Loading...</Text>}>
    <LazyNotFoundScreen {...props} />
  </Suspense>
);

const mapStateToProps = (state) => {
  return {
    token: accessTokenSelector(state),
  };
};

const mapDispatchToProps = (dispatch) => {
  return {};
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
)(NotFoundScreenWrapper);

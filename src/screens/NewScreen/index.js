import { connect } from "react-redux";
// import NewScreen from './NewScreen';
import React, { Suspense } from "react";
const LazyNewScreen = React.lazy(() => import("./NewScreen"));

const NewScreenWrapper = (props) => (
  <Suspense fallback={<Text>Loading...</Text>}>
    <LazyNewScreen {...props} />
  </Suspense>
);
import {
  userProfileSelector,
  accessTokenSelector,
  userDetailsSelector,
  userReportSelector,
} from "../../store/selectors/userSelectors";
import {
  getUserDetailsAction,
  userReportAction,
} from "../../store/actions/userActions";
import { Text } from "react-native";
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
)(NewScreenWrapper);

import { connect } from "react-redux";
// import PublicationScreen from './PublicationScreen';
import {
  accessTokenSelector,
  pendingSelector,
  errorSelector,
} from "../../store/selectors/userSelectors";
import { changePasswordAction } from "../../store/actions/userActions";
import React, { Suspense } from "react";
import { Text } from "react-native";
const LazyPublicationScreen = React.lazy(() => import("./PublicationScreen"));

const PublicationScreenWrapper = (props) => (
  <Suspense fallback={<Text>Loading...</Text>}>
    <LazyPublicationScreen {...props} />
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
)(PublicationScreenWrapper);

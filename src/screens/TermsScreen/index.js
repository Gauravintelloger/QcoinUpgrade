import { connect } from "react-redux";
// import TermsScreen from './TermsScreen';
import {
  accessTokenSelector,
  pendingSelector,
  errorSelector,
} from "../../store/selectors/userSelectors";
import { changePasswordAction } from "../../store/actions/userActions";
import React, { Suspense } from "react";
import { Text } from "react-native";
const LazyTermsScreen = React.lazy(() => import("./TermsScreen"));

const TermsScreenWrapper = (props) => (
  <Suspense fallback={<Text>Loading...</Text>}>
    <LazyTermsScreen {...props} />
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
)(TermsScreenWrapper);

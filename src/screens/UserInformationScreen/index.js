import { connect } from "react-redux";
// import UserInformationScreen from './UserInformationScreen';
import {
  accessTokenSelector,
  pendingSelector,
  errorSelector,
  userProfileSelector,
} from "../../store/selectors/userSelectors";
import { changePasswordAction } from "../../store/actions/userActions";
import React, { Suspense } from "react";
import { Text } from "react-native";
const LazyUserInformationScreen = React.lazy(() =>
  import("./UserInformationScreen")
);

const LazyUserInformationWrapper = (props) => (
  <Suspense fallback={<Text>Loading...</Text>}>
    <LazyUserInformationScreen {...props} />
  </Suspense>
);

const mapStateToProps = (state) => {
  return {
    userProfile: userProfileSelector(state),
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
)(LazyUserInformationWrapper);

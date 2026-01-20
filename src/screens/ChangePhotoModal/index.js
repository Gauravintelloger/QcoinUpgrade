import { connect } from "react-redux";
// import ChangePhotoModal from './ChangePhotoModal';
import {
  accessTokenSelector,
  pendingSelector,
  errorSelector,
} from "../../store/selectors/userSelectors";
import {
  changePasswordAction,
  updateUserImageAction,
} from "../../store/actions/userActions";
import React, { Suspense } from "react";
import { Text } from "react-native";
const LazyChangePhotoModal = React.lazy(() => import("./ChangePhotoModal"));

const ChangePhotoModalScreenWrapper = (props) => (
  <Suspense fallback={<Text>Loading...</Text>}>
    <LazyChangePhotoModal {...props} />
  </Suspense>
);
const mapStateToProps = (state) => {
  return {};
};

const mapDispatchToProps = (dispatch) => {
  return {
    updateUserImage: (payload) => dispatch(updateUserImageAction(payload)),
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
)(ChangePhotoModalScreenWrapper);

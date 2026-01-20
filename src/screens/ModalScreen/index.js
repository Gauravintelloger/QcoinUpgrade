import { connect } from "react-redux";
// import ModalScreen from './ModalScreen';
import {
  accessTokenSelector,
  pendingSelector,
  errorSelector,
} from "../../store/selectors/userSelectors";
import { changePasswordAction } from "../../store/actions/userActions";
import React, { Suspense } from "react";
import { Text } from "react-native";
const LazyModalScreen = React.lazy(() => import("./ModalScreen"));

const ModalScreenWrapper = (props) => (
  <Suspense fallback={<Text>Loading...</Text>}>
    <LazyModalScreen {...props} />
  </Suspense>
);
const mapStateToProps = (state) => {
  return {};
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
)(ModalScreenWrapper);

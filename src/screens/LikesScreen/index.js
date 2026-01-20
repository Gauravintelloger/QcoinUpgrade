import { connect } from "react-redux";
// import LikesScreen from './LikesScreen';
import { changePasswordAction } from "../../store/actions/userActions";
import { likesForPostSelector } from "../../store/selectors/postsSelectors";
import { getLikesForPostAction } from "../../store/actions/postsActions";
import React, { Suspense } from "react";
import { Text } from "react-native";
const LazyLikesScreen = React.lazy(() => import("./LikesScreen"));

const LikesScreenWrapper = (props) => (
  <Suspense fallback={<Text>Loading...</Text>}>
    <LazyLikesScreen {...props} />
  </Suspense>
);

const mapStateToProps = (state) => {
  return {
    likesForPost: likesForPostSelector(state),
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getLikesForPost: (payload) => dispatch(getLikesForPostAction(payload)),
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
)(LikesScreenWrapper);

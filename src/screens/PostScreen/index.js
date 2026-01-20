import React, { Suspense } from "react";
import { Text } from "react-native";
import { connect } from "react-redux";
// import PostScreen from './PostScreen';
const LazyPostScreen = React.lazy(() => import("./PostScreen"));

const PostScreenWrapper = (props) => (
  <Suspense fallback={<Text>Loading...</Text>}>
    <LazyPostScreen {...props} />
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
)(PostScreenWrapper);

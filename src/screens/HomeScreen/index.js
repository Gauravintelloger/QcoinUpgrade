import { connect } from "react-redux";
// import HomeScreen from './HomeScreen';
import {
  accessTokenSelector,
  pendingSelector,
  errorSelector,
  userProfileSelector,
} from "../../store/selectors/userSelectors";
import { changePasswordAction } from "../../store/actions/userActions";
import { getPostsAction } from "../../store/actions/postsActions";
import { allPostsSelector } from "../../store/selectors/postsSelectors";
import { tagedUserSelector } from "../../store/selectors/searchSelectors";
import React, { Suspense } from "react";
import { Text } from "react-native";
const LazyHomeScreen = React.lazy(() => import("./HomeScreen"));

const HomeScreenWrapper = (props) => (
  <Suspense fallback={<Text>Loading...</Text>}>
    <LazyHomeScreen {...props} />
  </Suspense>
);
const mapStateToProps = (state) => {
  return {
    allPosts: allPostsSelector(state),
    userProfile: userProfileSelector(state),
    tagedUser: tagedUserSelector(state),
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getPosts: (payload) => dispatch(getPostsAction(payload)),
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
)(HomeScreenWrapper);

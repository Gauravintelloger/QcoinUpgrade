import { connect } from "react-redux";
// import RedeemScreen from './RedeemScreen';
import {
  accessTokenSelector,
  pendingSelector,
  errorSelector,
  userByIdIndexSelector,
  userDetailsSelector,
  userProfileSelector,
} from "../../store/selectors/userSelectors";
import {
  changePasswordAction,
  getUserProfileAction,
  getUserDetailsAction,
} from "../../store/actions/userActions";
import {
  allPostsSelector,
  postsByUserIdSelector,
} from "../../store/selectors/postsSelectors";
import { getPostsAction } from "../../store/actions/postsActions";
import React, { Suspense } from "react";
import { Text } from "react-native";
const LazyRedeemScreen = React.lazy(() => import("./RedeemScreen"));

const RedeemScreenWrapper = (props) => (
  <Suspense fallback={<Text>Loading...</Text>}>
    <LazyRedeemScreen {...props} />
  </Suspense>
);

const mapStateToProps = (state) => {
  return {
    token: accessTokenSelector(state),
    allPosts: allPostsSelector(state),
    userByIdIndex: userByIdIndexSelector(state),
    postsByUserId: postsByUserIdSelector(state),
    userProfile: userProfileSelector(state),
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getPosts: (payload) => dispatch(getPostsAction(payload)),
    getUserProfile: (payload) => dispatch(getUserProfileAction(payload)),
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
)(RedeemScreenWrapper);

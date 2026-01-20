import { connect } from "react-redux";
// import CommentsScreen from './CommentsScreen';
import {
  getCommentsForPostAction,
  createCommentForPostAction,
  deleteCommentForPostAction,
} from "../../store/actions/commentActions";
import { deleteCommentsAction } from "../../store/actions/deleteCommentsAction";
import { commentsForPostselector } from "../../store/selectors/commentsSelectors";
import { userProfileSelector } from "../../store/selectors/userSelectors";
import { getPostsAction } from "../../store/actions/postsActions";
import React, { Suspense } from "react";
import { Text } from "react-native";
const LazyCommentsScreen = React.lazy(() => import(".//CommentsScreen"));

const CommentsScreenWrapper = (props) => (
  <Suspense fallback={<Text>Loading...</Text>}>
    <LazyCommentsScreen {...props} />
  </Suspense>
);

const mapStateToProps = (state) => {
  return {
    commentsForPost: commentsForPostselector(state),
    userProfile: userProfileSelector(state),
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getCommentsForPost: (payload) =>
      dispatch(getCommentsForPostAction(payload)),
    getPosts: (payload) => dispatch(getPostsAction(payload)),
    createCommentForPost: (payload) =>
      dispatch(createCommentForPostAction(payload)),
    deleteCommentForPost: (payload) =>
      dispatch(deleteCommentForPostAction(payload)),
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
)(CommentsScreenWrapper);

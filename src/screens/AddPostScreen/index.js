import { connect } from "react-redux";
// import AddPostScreen from './AddPostScreen';
import {
  accessTokenSelector,
  pendingSelector,
  errorSelector,
} from "../../store/selectors/userSelectors";
import { changePasswordAction } from "../../store/actions/userActions";
import {
  tagedUserSelector,
  reasonsSelector,
  createPostSelector,
} from "../../store/selectors/searchSelectors";
import {
  getReasonsAction,
  createPostAction,
  tagUserAction,
} from "../../store/actions/searchActions";
import React, { Suspense } from "react";
import { Text } from "react-native";

const LazyAddPostScreen = React.lazy(() => import("./AddPostScreen"));

const AddPostScreenWrapper = (props) => (
  <Suspense fallback={<Text>Loading...</Text>}>
    <LazyAddPostScreen {...props} />
  </Suspense>
);

const mapStateToProps = (state) => {
  return {
    token: accessTokenSelector(state),
    pending: pendingSelector(state),
    error: errorSelector(state),
    tagedUser: tagedUserSelector(state),
    reasons: reasonsSelector(state),
    createPost: createPostSelector(state),
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    changePassword: (payload) => dispatch(changePasswordAction(payload)),
    getReasons: (payload) => dispatch(getReasonsAction(payload)),
    createPostAction: (payload) => dispatch(createPostAction(payload)),
    tagUser: (payload) => dispatch(tagUserAction(payload)),
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
)(AddPostScreenWrapper);

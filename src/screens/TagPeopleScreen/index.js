import { connect } from "react-redux";
// import TagPeopleScreen from './TagPeopleScreen';
import { searchAction, tagUserAction } from "../../store/actions/searchActions";
import {
  usersSelector,
  pendingSelector,
  successSelector,
  tagedUserSelector,
} from "../../store/selectors/searchSelectors";
import { userProfileSelector } from "../../store/selectors/userSelectors";
import React, { Suspense } from "react";
import { Text } from "react-native";
const LazyTagPeopleScreen = React.lazy(() => import("./TagPeopleScreen"));

const TagPeopleScreenWrapper = (props) => (
  <Suspense fallback={<Text>Loading...</Text>}>
    <LazyTagPeopleScreen {...props} />
  </Suspense>
);

const mapStateToProps = (state) => {
  return {
    users: usersSelector(state),
    pending: pendingSelector(state),
    success: successSelector(state),
    tagedUser: tagedUserSelector(state),
    userProfile: userProfileSelector(state),
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    search: (payload) => dispatch(searchAction(payload)),
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
)(TagPeopleScreenWrapper);

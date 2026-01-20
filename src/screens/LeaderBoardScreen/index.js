import { connect } from "react-redux";
// import LeaderBoardScreen from './LeaderBoardScreen';
import {
  userProfileSelector,
  accessTokenSelector,
  userDetailsSelector,
  userReportSelector,
} from "../../store/selectors/userSelectors";
import { getLeaderBoardAction } from "../../store/actions/leaderBoardActions";
import { usersSelector } from "../../store/selectors/leaderBoardSelectors";
import React, { Suspense } from "react";
import { Text } from "react-native";
const LazyLeaderBoardScreen = React.lazy(() => import("./LeaderBoardScreen"));

const LeaderBoardScreenWrapper = (props) => (
  <Suspense fallback={<Text>Loading...</Text>}>
    <LazyLeaderBoardScreen {...props} />
  </Suspense>
);
const mapStateToProps = (state) => {
  return {
    token: accessTokenSelector(state),
    users: usersSelector(state),
    userProfile: userProfileSelector(state),
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getLeaderBoard: (payload) => dispatch(getLeaderBoardAction(payload)),
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
)(LeaderBoardScreenWrapper);

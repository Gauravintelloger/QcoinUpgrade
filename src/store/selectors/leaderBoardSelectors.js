import { createSelector } from 'reselect';

const leaderBoardsState = state => state.leaderBoard;

export const usersSelector = createSelector(
  leaderBoardsState,
  leaderBoard => leaderBoard.get('users')
);

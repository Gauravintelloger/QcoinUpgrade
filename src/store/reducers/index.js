import { combineReducers } from 'redux';
import user from './userReducer';
import posts from './postsReducer';
import search from './searchReducer';
import leaderBoard from './leaderBoardReducer';
import comments from './commentsReducer';
import notification from './notificationReducer';

export default combineReducers({
  user,
  posts,
  search,
  leaderBoard,
  comments,
  notification,
});
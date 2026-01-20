import { createSelector } from 'reselect';

const commentsState = state => state.comments;

export const commentsForPostselector = createSelector(
  commentsState,
  comments => comments.get('commentsForPost')
);

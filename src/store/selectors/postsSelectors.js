import { createSelector } from 'reselect';

const postsState = state => state.posts;

export const allPostsSelector = createSelector(
    postsState,
    posts => posts.get('allPosts')
);


export const postsByUserIdSelector = createSelector(
    postsState,
    posts => posts.get('postsByUserId')
);

export const likesForPostSelector = createSelector(
    postsState,
    posts => posts.get('likesForPost')
);

export const postsByIdSelector = createSelector(
    postsState,
    posts => posts.get('postsById')
);

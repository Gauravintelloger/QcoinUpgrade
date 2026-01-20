import {createSelector} from 'reselect';

const searchState = state => state.search;

export const pendingSelector = createSelector(
  searchState,
  search => search.get('pending'),
);

export const successSelector = createSelector(
  searchState,
  search => search.get('success'),
);

export const usersSelector = createSelector(
  searchState,
  search => search.get('users'),
);

export const tagedUserSelector = createSelector(
  searchState,
  search => search.get('tagedUser'),
);

export const reasonsSelector = createSelector(
  searchState,
  search => search.get('reasons'),
);

export const createPostSelector = createSelector(
  searchState,
  search => search.get('createPost'),
);

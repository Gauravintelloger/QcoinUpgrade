import { createSelector } from 'reselect';

const userState = state => state.user;

export const pendingSelector = createSelector(
  userState,
  user => user.get('pending')
);

export const successSelector = createSelector(
  userState,
  user => user.get('success')
);

export const accessTokenSelector = createSelector(
  userState,
  user => user.get('accessToken')
);
export const tokenTypeSelector = createSelector(
  userState,
  user => user.get('tokenType')
);
export const errorSelector = createSelector(
  userState,
  user => user.get('error')
);

export const userDetailsSelector = createSelector(
  userState,
  user => user.get('userDetails')
);

export const errorsSelector = createSelector(
  userState,
  user => user.get('errors')
);

export const userLayerSelector = createSelector(
  userState,
  user => user.get('userLayer')
);


export const userProfileSelector = createSelector(
  userState,
  user => user.get('userProfile')
);
export const updateUserSelector = createSelector(
  userState,
  user => user.get('updateUser')
);
export const resetPasswordSelector = createSelector(
  userState,
  user => user.get('resetPassword')
);

export const addPhoneSelector = createSelector(
  userState,
  user => user.get('addPhone')
);

export const verifyPhoneSelector = createSelector(
  userState,
  user => user.get('verifyPhone')
);

export const contactFormSelector = createSelector(
  userState,
  user => user.get('contactForm')
);

export const userReportSelector = createSelector(
  userState,
  user => user.get('userReport')
);

export const selectedIndexSelector = createSelector(
  userState,
  user => user.get('selected')
);


export const userByIdIndexSelector = createSelector(
  userState,
  user => user.get('userById')
);


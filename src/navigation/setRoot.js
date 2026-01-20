// setRoot.js
import { CommonActions } from '@react-navigation/native';
import store from '../store';
import screenIds from './screenIds';  // Good – assuming this file exports them correctly
console.log("screenIds-setRoot", screenIds);

let navigatorRef;




export const setTopLevelNavigator = (navigator) => {
  navigatorRef = navigator;
};

const dispatch = (action) => {
  if (navigatorRef) {
    navigatorRef.dispatch(action);
  }
};

export const resetRoot = () => {
  // REMOVED: setDefaultOptions – it doesn't exist and was causing the crash

  const user = store.getState().user?.get('userProfile');
  // profileTabLabel not used in route names – safe to keep or remove
  dispatch(
    CommonActions.reset({
      index: 0,
      routes: [
        {
          name: 'AuthenticatedTabs',
          state: {
            routes: [
              { name: screenIds.HOME_SCREEN },
              { name: screenIds.LEADER_BOARD_SCREEN },
              { name: screenIds.NOTIFICATION_SCREEN },
              {
                name: 'Profile',  // or screenIds.PROFILE_SCREEN if you have one
                params: { myProfile: true },
              },
            ],
            index: 3,
          },
        },
      ],
    })
  );
};

export const goToLogin = () => {
  dispatch(
    CommonActions.reset({
      index: 0,
      routes: [{ name: screenIds.SIGNIN_SCREEN }],
    })
  );
};

export const setRootToWelcome = () => {
  console.log("calling setRoot")
  dispatch(
    CommonActions.reset({
      index: 0,
      routes: [{ name: screenIds.WELCOME_SCREEN }],
    })
  );
};

const setRoot = () => {
  setRootToWelcome();
};

export default setRoot;
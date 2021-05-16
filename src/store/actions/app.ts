import { Dispatch } from 'redux';
import { login, API_SUCCESS } from '../../utils/api';
import { APP_INITIALIZED } from './actionTypes';
import { authReset, authSuccess } from './auth';
import { userReset, userUpdate } from './user';
import store from '../store';

const appInitialzed = () => {
  return {
    type: APP_INITIALIZED,
  }
}


const appStart = () => {
  return async (dispatch: Dispatch) => {
    const state = store.getState();
    const apiToken = state.auth.apiToken;
    const isAuthenticated = state.auth.isAuthenticated;

    // Check to see if we have an existing apiToken
    if (apiToken && !isAuthenticated) {
      // Attempt to login using apiToken
      const { status, userData } = await login({ apiToken });
      console.log('appstart', status, userData);

      if (status === API_SUCCESS) {
        // Update user on success
        dispatch(authSuccess(apiToken));
        dispatch(userUpdate(userData));
      } else {
        // Restart app on fail
        // appRestart()(dispatch);
      }
    }
    // TODO:: Should I reset when no apiToken ???
    //else {
      //appRestart()(dispatch);
    //}

    dispatch(appInitialzed());
  }
}

const appRestart = () => {
  return async (dispatch: Dispatch) => {
    dispatch(authReset());
    dispatch(userReset());
  }
}

export {
  appInitialzed,
  appRestart,
  appStart,
}
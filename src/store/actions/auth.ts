import * as actionTypes from './actionTypes';

export const authSuccess = (apiToken: string) => {
  return {
    type: actionTypes.AUTH_SUCCESS,
    apiToken: apiToken,
  };
};

export const authFail = () => {
  return {
    type: actionTypes.AUTH_FAIL,
  };
};

export const authReset = () => {
  return {
    type: actionTypes.AUTH_RESET,
  };
};

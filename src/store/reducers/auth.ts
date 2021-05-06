import {
  AUTH_FAIL,
  AUTH_RESET,
  AUTH_SUCCESS,
  AuthAction,
} from '../actions/actionTypes';

export interface AuthState {
  apiToken: string | null;
}

const initialState: AuthState = {
  apiToken: null,
};

const authSuccess = (state: AuthState, { apiToken = '' }: AuthAction) => {
  return {
    ...state,
    apiToken,
    message: null,
  };
};

const authFail = (state: AuthState) => {
  return { ...state, apiToken: null };
};

const authReset = () => {
  return initialState;
};

const reducer = (state = initialState, action: AuthAction): AuthState => {
  switch (action.type) {
    case AUTH_SUCCESS:
      return authSuccess(state, action);
    case AUTH_FAIL:
      return authFail(state);
    case AUTH_RESET:
      return authReset();
    default:
      return state;
  }
};

export default reducer;

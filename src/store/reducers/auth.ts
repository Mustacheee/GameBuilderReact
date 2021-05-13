import {
  AUTH_FAIL,
  AUTH_RESET,
  AUTH_SUCCESS,
  AuthAction,
} from '../actions/actionTypes';

interface AuthState {
  apiToken: string | null;
  isAuthenticated: boolean;
}

const initialState: AuthState = {
  apiToken: null,
  isAuthenticated: false,
};

const authSuccess = (state: AuthState, { apiToken = '' }: AuthAction) => {
  return {
    ...state,
    apiToken,
    isAuthenticated: true,
  };
};

const authFail = (state: AuthState) => {
  return {
    ...state,
    apiToken: null,
    isAuthenticated: false
  };
};

const authReset = () => {
  return initialState;
};

const authReducer = (state = initialState, action: AuthAction): AuthState => {
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

export default authReducer;

export { authReducer };
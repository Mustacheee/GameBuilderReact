import { AppAction, AppState } from "../../types";
import { APP_INITIALIZED } from "../actions/actionTypes";

const initialState: AppState = {
  isInitialized: false,
}

const appInitialized = (state: AppState, _action: AppAction) => {
  return {
    ...state,
    isInitialized: true,
  }
}

const appReducer = (state = initialState, action: AppAction): AppState => {
  switch (action.type) {
    case APP_INITIALIZED:
      return appInitialized(state, action);
    default:
      return state;
  }
}

export default appReducer;

export { appReducer };
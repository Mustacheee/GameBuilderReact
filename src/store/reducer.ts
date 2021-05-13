import { combineReducers } from 'redux';
import {
  appReducer,
  authReducer,
  userReducer,
} from './reducers';

const rootReducer = combineReducers({
  app: appReducer,
  auth: authReducer,
  user: userReducer,
});

export default rootReducer;

export type RootState = ReturnType<typeof rootReducer>;
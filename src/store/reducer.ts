import { combineReducers } from 'redux';
import authReducer from './reducers/auth';

const rootReducer = combineReducers({
    auth: authReducer,
});

export default rootReducer;
export type RootState = ReturnType<typeof rootReducer>;
import { IUser } from '../../types';
import {
  USER_UPDATE,
  USER_RESET,
  UserAction,
} from '../actions/actionTypes';

const INITIAL_USER_STATE: IUser = {
  email: '',
  firstName: '',
  id: '',
  lastName: '',
  username: '',
  games: [],
};

const userUpdate = (state: IUser, { user }: UserAction) => {
  return { ...state, ...user};
};

const userReducer = (state = INITIAL_USER_STATE, action: UserAction): IUser => {
  switch (action.type) {
    case USER_UPDATE:
      return userUpdate(state, action);
    case USER_RESET:
      return INITIAL_USER_STATE;
    default:
      return state;
  }
};

export default userReducer;

export { userReducer, INITIAL_USER_STATE };

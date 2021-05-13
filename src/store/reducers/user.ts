import { UserState } from '../../types';
import { USER_UPDATE, USER_RESET, UserAction } from '../actions/actionTypes';

const initialState: UserState = {
  email: '',
  firstName: '',
  lastName: '',
  username: '',
};

const userUpdate = (state: UserState, { user }: UserAction) => {
  return { ...state, ...user }
}

const userReducer = (state = initialState, action: UserAction): UserState => {
  switch (action.type) {
    case USER_UPDATE:
      return userUpdate(state, action);
    case USER_RESET:
      return initialState;
    default:
      return state;
  }
};

export default userReducer;

export { userReducer };
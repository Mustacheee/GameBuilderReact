import { User } from '../../types';
import { USER_RESET, USER_UPDATE } from './actionTypes';

const userReset = () => {
  return {
    type: USER_RESET,
  }
}

const userUpdate = (userProps: User) => {
  console.log(userProps)
  return {
    type: USER_UPDATE,
    user: userProps,
  }
}

export {
  userReset,
  userUpdate,
};
import { UserState } from "../../types";

export const APP_INITIALIZED = 'APP_INITIALIZED';

export const AUTH_SUCCESS = 'AUTH_SUCCESS';
export const AUTH_FAIL = 'AUTH_FAIL';
export const AUTH_RESET = 'AUTH_RESET';
export interface AuthAction {
    type: typeof AUTH_SUCCESS | typeof AUTH_FAIL | typeof AUTH_RESET;
    apiToken?: string;
}

export const USER_UPDATE = 'USER_UPDATE';
export const USER_RESET = 'USER_RESET';

export interface UserAction {
    type: typeof USER_UPDATE | typeof USER_RESET;
    user: UserState,
}


export const GAME_ADD_CATEGORY = 'GAME_ADD_CATEGORY';
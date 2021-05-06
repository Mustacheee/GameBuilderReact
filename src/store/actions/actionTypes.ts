export const AUTH_SUCCESS = 'AUTH_SUCCESS';
export const AUTH_FAIL = 'AUTH_FAIL';
export const AUTH_RESET = 'AUTH_RESET';

export interface AuthAction {
    type: typeof AUTH_SUCCESS | typeof AUTH_FAIL | typeof AUTH_RESET;
    apiToken?: string;
}

// export interface AuthFailAction {
//     type: typeof AUTH_FAIL;
// }

// export interface AuthResetAction {
//     type: typeof AUTH_RESET;
// }

// export type AuthAction = AuthSuccessAction | AuthFailAction | AuthResetAction;
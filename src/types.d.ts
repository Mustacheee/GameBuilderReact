// TODO:: Move all types and interfaces here

import { APP_INITIALIZED } from './store/actions/actionTypes';

export interface UserState {
  email: string;
  firstName: string;
  lastName: string;
  username: string;
}

export interface AppState {
  isInitialized: boolean;
}

export interface AppAction {
  type: typeof APP_INITIALIZED;
}

export interface Game {
  categories: Category[];
  id: string;
  name: string;
}

export interface Category {
  id: string;
  name: string;
}
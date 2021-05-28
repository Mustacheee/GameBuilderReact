// TODO:: Move all types and interfaces here

import { Action } from 'redux';
import { APP_INITIALIZED } from './store/actions/actionTypes';

export interface ChannelAction extends Action {
  payload: any;
}

export type User = {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  username: string;
  games?: Game[],
};

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
  columns: 6;
}

export interface Category {
  id: string;
  name: string;
  gameId: string;
  questions?: Question[];
}

export interface Question {
  id: string;
  text: string;
  answer: string;
}

export type ViewProps = {
  setHeaderTitle: (title: string) => void;
  setMenuItems: (items: Element | null) => void;
}
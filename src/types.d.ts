// TODO:: Move all types and interfaces here

import { Action } from 'redux';
import { APP_INITIALIZED } from './store/actions/actionTypes';

export interface ChannelAction extends Action {
  payload: any;
}

export type IUser = {
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

export interface IGame {
  categories: Category[];
  id: string;
  name: string;
  config?: GameConfig | null;
}

export interface ICategory {
  id: string;
  name: string;
  gameId: string;
  questions?: Question[];
}

export interface IQuestion {
  id: string;
  text: string;
  answer: string;
}

export interface IGameConfig {
  id: string;
  columnCount: number;
  gameId: string;
  qsPerColumn: number;
}

export type ViewProps = {
  setHeaderTitle: (title: string) => void;
  setMenuItems: (items: Element | null) => void;
}
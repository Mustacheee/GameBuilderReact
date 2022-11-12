import { APP_INITIALIZED } from './store/actions/actionTypes';

export interface ChannelAction {
  type: any;
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

export interface IGame {
  categories: ICategory[];
  id: string;
  name: string;
  config?: IGameConfig | null;
}

export interface ICategory {
  id: string;
  name: string;
  gameId: string;
  questions?: IQuestion[];
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
  setMenuItems: (items: Element | null) => void;
}
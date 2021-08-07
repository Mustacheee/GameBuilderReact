import ViewGame from './ViewGame';

export default ViewGame;

export { ViewGame };

export interface ViewGameForm {
  category: {
    name: string;
  };
}

export interface GameConfigForm {
  gameConfig: {
    qs_per_column: number;
    column_count: number;
  };
}

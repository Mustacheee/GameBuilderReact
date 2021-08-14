import { Paper } from '@material-ui/core';
import React from 'react';
import styles from './Game.module.scss';
import { goToViewGame } from '../../utils/navigation';
import { IGame } from '../../types';

type GameProps = {
  game: IGame;
};

const Game = ({ game }: GameProps): JSX.Element => {
  return (
    <Paper
      key={game.id}
      className={styles.game}
      onClick={() => goToViewGame(game.id, history)}
    >
      {game.name}
    </Paper>
  );
};

export default Game;

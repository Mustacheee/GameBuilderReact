import { Paper } from '@material-ui/core';
import React from 'react';
import styles from './Game.module.scss';
import { goToViewGame } from '../../utils/navigation';
import { IGame } from '../../types';
import { useHistory } from 'react-router-dom';

type GameProps = {
  game: IGame;
  className?: string;
};

const MAX_CATEGORIES = 5;

const Game = ({ game, className = '' }: GameProps): JSX.Element => {
  const history = useHistory();
console.log(game)
  return (
    <Paper
      key={game.id}
      className={`${styles.container} ${className}`}
      onClick={() => goToViewGame(game.id, history)}
    >
      <h2>{game.name}</h2>

      <h4>Categories</h4>

      <div className={styles.categories}>
        {game.categories?.slice(0, MAX_CATEGORIES)?.map((category) => {
          return <div key={category.id}>{category.name}</div>;
        })}

        {game.categories?.length > MAX_CATEGORIES ? <p>...</p> : null}
      </div>
    </Paper>
  );
};

export default Game;

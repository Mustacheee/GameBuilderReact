import React, { FunctionComponent, useLayoutEffect } from 'react';
import { RootState } from '../../store/reducer';
import styles from './Dashboard.module.scss';
import { connect } from 'react-redux';
import { goToViewGame } from '../../utils/navigation';
import { useHistory } from 'react-router-dom';
import { Game, ViewProps } from '../../types';
import { Dispatch } from 'redux';

type DashboardProps = ViewProps & {
  username: string;
  games: Game[];
};

const Dashboard: FunctionComponent<DashboardProps> = ({
  username,
  setHeaderTitle,
  games,
}) => {
  useLayoutEffect(() => {
    setHeaderTitle(`Welcome back ${username}`);
  }, [username, setHeaderTitle]);

  const history = useHistory();

  return (
    <div className={styles.container}>
      <div className={styles.games}>
        {games.map((game) => {
          return (
            <div
              key={game.id}
              className={styles.game}
              onClick={() => goToViewGame(game.id, history)}
            >
              {game.name}
            </div>
          );
        })}
      </div>

      <div className={styles.post}>
        aaaaaaa
      </div>
    </div>
  );
};

const mapStateToProps = (state: RootState) => {
  return {
    apiToken: state.auth.apiToken || '',
    username: state.user.firstName || 'New User',
    games: state.user.games || [],
  };
};

const mapDispatchToProps = (dispatch: Dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);

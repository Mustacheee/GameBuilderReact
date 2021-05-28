import React, {
  FunctionComponent,
  useContext,
  useEffect,
  useLayoutEffect,
  useState,
} from 'react';
import { RootState } from '../../store/reducer';
import styles from './Dashboard.module.scss';
import { connect } from 'react-redux';
import Button from '../../components/Button';
import { goToCreateGame, goToViewGame } from '../../utils/navigation';
import { Link, useHistory } from 'react-router-dom';
import { GAME_CREATE } from '../../utils/routes';
import useChannel from '../../utils/hooks/useChannel';
import {
  ChannelAction,
  Game,
  User,
  Category as CategoryType,
  ViewProps,
} from '../../types';
import { Dispatch } from 'redux';
import { INITIAL_USER_STATE, userReducer } from '../../store/reducers';
import { ChannelContext } from '../../utils/contexts';

type DashboardProps = ViewProps & {
  apiToken: string;
  user: Partial<User>;
  games: Game[];
};

interface DashboardInfo {
  user: User;
  games: Game[];
}

const Dashboard: FunctionComponent<DashboardProps> = ({
  apiToken,
  user,
  setHeaderTitle,
  games,
}) => {
  const { firstName } = user;

  useLayoutEffect(() => {
    setHeaderTitle(`Welcome back ${firstName}`);
  }, [firstName, setHeaderTitle]);

  const channel = useContext(ChannelContext);
  const history = useHistory();

  return (
    <div className={styles.container}>
      <div className={styles.games}>
        {games.map((game, index) => {
          return (
            <div
              key={index}
              className={styles.game}
              onClick={() => goToViewGame(game.id, history)}
            >
              {game.name}
            </div>
          );
        })}
      </div>
    </div>
  );
};

const mapStateToProps = (state: RootState) => {
  return {
    apiToken: state.auth.apiToken || '',
    user: {
      firstName: state.user.firstName,
    },
    games: state.user.games || [],
  };
};

const mapDispatchToProps = (dispatch: Dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);

import React, { FunctionComponent } from 'react';
import { RootState } from '../../store/reducer';
import styles from './Dashboard.module.scss';
import { connect } from 'react-redux';
import Button from '../../components/Button';
import { goToCreateGame } from '../../utils/navigation';
import { Link } from 'react-router-dom';
import { GAME_CREATE } from '../../utils/routes';
import useChannel from '../../utils/hooks/useChannel';
import { ChannelAction, Game, User } from '../../types';
import { Dispatch } from 'redux';
import { INITIAL_USER_STATE } from '../../store/reducers';

type DashboardProps = {
  apiToken: string;
  user: Partial<User>;
};

interface DashboardInfo {
  user: User;
  games: Game[];
}

const initialValues: DashboardInfo = {
  user: INITIAL_USER_STATE,
  games: [],
};

const dashboardReducer = (
  state: DashboardInfo,
  { type, payload }: ChannelAction
) => {
  console.log(payload, type);

  switch (type) {
    case 'phx_reply':
      const user = payload?.response?.user || initialValues.user;
      const games = payload?.response?.games || initialValues.games;
      return { ...state, games, user };
    default:
      return state;
  }
};

const Dashboard: FunctionComponent<DashboardProps> = ({
  apiToken,
  user,
}) => {
  const [{ games }] = useChannel<DashboardInfo>(
    `user:${apiToken}`,
    dashboardReducer,
    initialValues
  );

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        Welcome {user.firstName || 'New User'}
      </div>
      <Link to={GAME_CREATE} className={styles.link}>
        <Button onClick={goToCreateGame}>Create Game</Button>
      </Link>

      <div className={styles.games}>
        {games.map((game, index) => {
          return <div key={index} className={styles.game}>{game.name}</div>;
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
  };
};

const mapDispatchToProps = (dispatch: Dispatch) => {
  return {
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);

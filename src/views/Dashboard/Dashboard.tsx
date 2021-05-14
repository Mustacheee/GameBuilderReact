import React, { FunctionComponent } from 'react';
import { RootState } from '../../store/reducer';
import styles from './Dashboard.module.scss';
import { connect } from 'react-redux';
import Button from '../../components/Button';
import { goToCreateGame } from '../../utils/navigation';
import { Link } from 'react-router-dom';
import { GAME_CREATE } from '../../utils/routes';
import useChannel from '../../utils/hooks/useChannel';
import { ChannelAction, User } from '../../types';

type DashboardProps = {
  apiToken: string;
}

interface DashboardInfo {
  user: User;
}

const initialValues: DashboardInfo = {
  user: {
    email: '',
    firstName: '',
    games: [],
    lastName: '',
    username: '',
  },
}

const dashboardReducer = (state: DashboardInfo, {type, payload}: ChannelAction) => {
  return state;
}

const Dashboard: FunctionComponent<DashboardProps> = ({
  apiToken,
}) => {
  const [ dashboardState ] = useChannel<DashboardInfo>(`user:${apiToken}`, dashboardReducer, initialValues);

  return (
    <div className={styles.container}>
      <Link to={GAME_CREATE} className={styles.link}>
        <Button onClick={goToCreateGame}>Create Game</Button>
      </Link>
    </div>
  );
}

const mapStateToProps = (state: RootState) => {
  return {
    apiToken: state.auth.apiToken || '',
  };
}

export default connect(mapStateToProps)(Dashboard);
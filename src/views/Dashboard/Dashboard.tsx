import React, { FunctionComponent } from 'react';
import { RootState } from '../../store/reducer';
import styles from './Dashboard.module.scss';
import { connect } from 'react-redux';
import Button from '../../components/Button';
import { goToCreateGame } from '../../utils/navigation';
import { Link } from 'react-router-dom';
import { GAME_CREATE } from '../../utils/routes';

type DashboardProps = {

}

const Dashboard: FunctionComponent<DashboardProps> = ({ }) => {
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

  };
}

export default connect(mapStateToProps)(Dashboard);
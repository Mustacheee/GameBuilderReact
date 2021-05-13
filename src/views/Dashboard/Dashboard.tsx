import React, { FunctionComponent } from 'react';
import { RootState } from '../../store/reducer';
import styles from './Dashboard.module.scss';
import { connect } from 'react-redux';
type DashboardProps = {

}

const Dashboard: FunctionComponent<DashboardProps> = ({ }) => {
  return (
    <div className={styles.container}>
      Dashboard
    </div>
  );
}

const mapStateToProps = (state: RootState) => {
  return {

  };
}

export default connect(mapStateToProps)(Dashboard);
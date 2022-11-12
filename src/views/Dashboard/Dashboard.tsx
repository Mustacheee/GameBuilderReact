import styles from './Dashboard.module.scss';
import Game from '../../components/Game';
import { useUserContext } from '../../store/contexts/UserContext';

const Dashboard = () => {
  const { user } = useUserContext();

  return (
    <div className={styles.container}>
      <div className={styles.games}>
        {user?.games?.map((game) => {
          return <Game game={game} className={styles.game} />;
        })}
      </div>
    </div>
  );
};

export default Dashboard;

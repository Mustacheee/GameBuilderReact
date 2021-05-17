import React, { FunctionComponent } from 'react';
import { connect } from 'react-redux';
import { useHistory } from 'react-router';
import { RootState } from '../../store/reducer';
import { Category as CategoryType } from '../../types';
import { deleteCategory } from '../../utils/api';
import { goToViewCategory } from '../../utils/navigation';
import Button from '../Button';
import styles from './Category.module.scss';

type CategoryProps = {
  category: CategoryType;
  apiToken: string;
};

const Category: FunctionComponent<CategoryProps> = ({ apiToken, category }) => {
  const history = useHistory();

  const onClickDelete = async () => {
    await deleteCategory(category.gameId, category.id, apiToken);
  }

  return (
    <div
      className={styles.container}
      onClick={() => goToViewCategory(category.gameId, category.id, history)}
    >
      <div className={styles.name}>{category.name}</div>
      <div className={styles.actions}>
        <Button onClick={onClickDelete}>Delete</Button>
      </div>
    </div>
  );
};

const mapStateToProps = (state: RootState) => {
  return {
    apiToken: state.auth.apiToken || '',
  }
}

export default connect(mapStateToProps)(Category);

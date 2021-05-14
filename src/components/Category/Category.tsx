import React, { FunctionComponent } from 'react';
import { connect } from 'react-redux';
import { RootState } from '../../store/reducer';
import { Category as CategoryType } from '../../types';
import { deleteCategory } from '../../utils/api';
import Button from '../Button';
import styles from './Category.module.scss';

type CategoryProps = {
  category: CategoryType;
  apiToken: string;
};

const Category: FunctionComponent<CategoryProps> = ({ apiToken, category }) => {

  const onClickDelete = async () => {
    await deleteCategory(category.gameId, category.id, apiToken);
  }

  return (
    <div
      className={styles.container}
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

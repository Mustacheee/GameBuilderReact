import { connect } from 'react-redux';
import React, { FunctionComponent, useState } from 'react';
import { useParams } from 'react-router';
import { RootState } from '../../store/reducer';
import { API_SUCCESS, createCategory } from '../../utils/api';
import styles from './ViewGame.module.scss';
import { Button } from '../../components/Button';
import { Formik, FormikHelpers } from 'formik';
import { TextField } from '@material-ui/core';
import { ViewGameForm } from '.';
import useChannel from '../../utils/hooks/useChannel';
import { Game, Category as CategoryType } from '../../types';
import Category from '../../components/Category';

type ViewGameProps = {
  apiToken: string;
};

const initialState: Game = {
  categories: [],
  id: '',
  name: '',
};

const gameReducer = (state: Game, { type, payload }: any) => {
  console.log(type, payload)
  switch (type) {
    case 'phx_reply':
      const newState = payload?.response || initialState;
      return newState;
    case 'new_category':
      const category = payload?.category;
      if (category) {
        return { ...state, categories: [...state.categories, category] };
      }
      break;
    case 'delete_category':
      const categoryId = payload?.category?.id;
      return {
        ...state,
        categories: state.categories.filter(({ id }) => id !== categoryId),
      };
  }

  return state;
};

const ViewGame: FunctionComponent<ViewGameProps> = ({ apiToken }) => {
  const { gameId } = useParams<{ gameId: string }>();
  const [isAddCategory, setIsAddCategory] = useState(false);
  const [{ categories = [], name = '' }] = useChannel(
    `game:${gameId}`,
    gameReducer,
    initialState
  );

  const toggleAddCategory = () => setIsAddCategory(!isAddCategory);

  const onSubmit = async (
    values: ViewGameForm,
    { setFieldError, setFieldValue }: FormikHelpers<ViewGameForm>
  ) => {
    const { status, errors = {} } = await createCategory(
      gameId,
      values,
      apiToken
    );

    if (status === API_SUCCESS) {
      setFieldValue('category[name]', '');
      return;
    }

    Object.entries(errors).forEach(([field, fieldErrors]: [string, any]) => {
      setFieldError(`category[${field}]`, fieldErrors[0]);
    });
  };

  const initialValues: ViewGameForm = { category: { name: '' } };

  return (
    <div className={styles.container}>
      <Formik onSubmit={onSubmit} initialValues={initialValues}>
        {({ errors, handleChange, handleSubmit, touched, values }) => {
          return (
            <form onSubmit={handleSubmit}>
              <div className={styles.infoBlock}>
                <span className={styles.label}>Name:</span>
                <span className={styles.value}>{name}</span>

                <div className={styles.categories}>
                  {categories.map((category: CategoryType, index) => {
                    return <Category category={category} key={index} />;
                  })}
                </div>

                <Button onClick={toggleAddCategory}>
                  {isAddCategory ? 'Close' : 'Add category'}
                </Button>

                {isAddCategory && (
                  <>
                    <TextField
                      error={
                        Boolean(touched.category?.name) &&
                        Boolean(errors.category?.name)
                      }
                      fullWidth
                      helperText={
                        Boolean(errors.category?.name) && errors.category?.name
                      }
                      id="category[name]"
                      label="Category Name"
                      name="category[name]"
                      onChange={handleChange}
                      value={values.category?.name}
                    />

                    <Button type="submit">Create Category</Button>
                  </>
                )}
              </div>
            </form>
          );
        }}
      </Formik>
    </div>
  );
};

const mapStateToProps = (state: RootState) => {
  return {
    apiToken: state.auth.apiToken || '',
  };
};

export default connect(mapStateToProps)(ViewGame);

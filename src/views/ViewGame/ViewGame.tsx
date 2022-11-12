import React, { useState } from 'react';
import { useParams } from 'react-router';
import { API_SUCCESS, createCategory } from '../../utils/api';
import styles from './ViewGame.module.scss';
import { Button } from '../../components/Button';
import { Formik, FormikHelpers } from 'formik';
import { Fab, TextField } from '@material-ui/core';
import { GameConfigForm, ViewGameForm } from '.';
import useChannel from '../../utils/hooks/useChannel';
import { IGame, ICategory } from '../../types';
import Category from '../../components/Category';
import AddIcon from '@material-ui/icons/Add';
import CloseIcon from '@material-ui/icons/Close';
import { gameConfigSchema } from './validationSchema';

const DEFAULT_COLUMN_COUNT = 3;
const DEFAULT_QS_PER_COLUMN = 3;

const initialState: IGame = {
  categories: [],
  id: '',
  name: '',
  config: {
    id: '',
    columnCount: DEFAULT_COLUMN_COUNT,
    gameId: '',
    qsPerColumn: DEFAULT_QS_PER_COLUMN,
  },
};

const colorScheme = ['blue', 'yellow', 'purple', 'green'];

const gameReducer = (state: IGame, { type, payload }: any) => {
  let category: ICategory | undefined;

  switch (type) {
    case 'phx_reply':
      const newState = payload?.response || initialState;
      newState.config = payload?.response.config || initialState.config;
      console.log(payload?.response);
      return newState;
    case 'new_category':
      if (category) {
        return { ...state, categories: [...state.categories, category] };
      }
      break;
    case 'delete_category':
      category = payload?.category;
      const categoryId = category?.id;
      return {
        ...state,
        categories: state.categories.filter(({ id }) => id !== categoryId),
      };
    case 'category_details':
      // category = payload?.response?.category;
      // const index = state.categories.findIndex(({ id }) => id === category?.id);
      // if (category && index >= 0) {
      //   return {
      //     ...state,
      //     categories: state.categories.splice(index, 1, category),
      //   }
      // }

      return state;
  }

  return state;
};

const ViewGame = () => {
  const { gameId = '' } = useParams<{ gameId: string }>();
  const [isAddCategory, setIsAddCategory] = useState(false);
  const [{ categories = [], name = '' }, channel] = useChannel(
    `game:${gameId}`,
    gameReducer,
    initialState
  );

  const toggleAddCategory = () => setIsAddCategory(!isAddCategory);

  const onSubmit = async (
    values: ViewGameForm,
    { setFieldError, setFieldValue }: FormikHelpers<ViewGameForm>
  ) => {
    const { status, errors = {} } = await createCategory(gameId, values);

    if (status === API_SUCCESS) {
      setFieldValue('category[name]', '');
      return;
    }

    Object.entries(errors).forEach(([field, fieldErrors]: [string, any]) => {
      setFieldError(`category[${field}]`, fieldErrors[0]);
    });
  };

  const initialValues: ViewGameForm = {
    category: { name: '' },
  };

  const gameConfigValues: GameConfigForm = {
    gameConfig: {
      qs_per_column: DEFAULT_QS_PER_COLUMN,
      column_count: DEFAULT_COLUMN_COUNT,
    },
  };

  const { gameConfig } = gameConfigValues;
  console.log('asd');
  return (
    <div className={styles.container}>
      <div className={styles.categories}>
        {categories.map((category: ICategory, index) => {
          const roundNumber = Math.floor(index / gameConfig.qs_per_column + 1);
          return (
            <Category
              style={{ backgroundColor: colorScheme[roundNumber - 1] }}
              category={category}
              key={category.id}
              gameChannel={channel}
            />
          );
        })}
      </div>

      <Formik onSubmit={onSubmit} initialValues={initialValues}>
        {({ errors, handleChange, handleSubmit, touched, values }) => {
          return (
            <form onSubmit={handleSubmit}>
              <div className={styles.infoBlock}>
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
                  </>
                )}
              </div>

              <Button type="submit">Submit</Button>
            </form>
          );
        }}
      </Formik>

      <Formik
        onSubmit={(
          values: GameConfigForm,
          { setFieldError, setFieldValue }: FormikHelpers<GameConfigForm>
        ) => {
          console.log('hiiiiii!!!', values);
        }}
        initialValues={gameConfigValues}
        validationSchema={gameConfigSchema}
      >
        {({ errors, handleChange, handleSubmit, touched, values }) => {
          return (
            <form onSubmit={handleSubmit}>
              <div className={styles.configureForm}>
                <TextField
                  error={
                    Boolean(touched.gameConfig?.column_count) &&
                    Boolean(errors.gameConfig?.column_count)
                  }
                  fullWidth
                  helperText={
                    Boolean(errors.gameConfig?.column_count) &&
                    errors.gameConfig?.column_count
                  }
                  id="GameConfig[column_count]"
                  label="Number of Categories (per Round)"
                  name="GameConfig[column_count]"
                  onChange={handleChange}
                  value={values.gameConfig?.column_count}
                />

                <TextField
                  error={
                    Boolean(touched.gameConfig?.qs_per_column) &&
                    Boolean(errors.gameConfig?.qs_per_column)
                  }
                  fullWidth
                  helperText={
                    Boolean(errors.gameConfig?.qs_per_column) &&
                    errors.gameConfig?.qs_per_column
                  }
                  id="GameConfig[qs_per_column]"
                  label="Questions Per Category"
                  name="GameConfig[qs_per_column]"
                  onChange={handleChange}
                  value={values.gameConfig?.qs_per_column}
                />

                <Button type="submit">Submit</Button>
              </div>
            </form>
          );
        }}
      </Formik>

      <Fab
        color="primary"
        aria-label={isAddCategory ? 'close add category' : 'add category'}
        onClick={toggleAddCategory}
      >
        {isAddCategory ? <CloseIcon /> : <AddIcon />}
      </Fab>
    </div>
  );
};

export default ViewGame;

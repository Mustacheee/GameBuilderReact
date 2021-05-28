import { connect } from 'react-redux';
import React, { FunctionComponent, useState, SyntheticEvent } from 'react';
import { useHistory, useParams } from 'react-router';
import { RootState } from '../../store/reducer';
import { API_SUCCESS, createCategory } from '../../utils/api';
import styles from './ViewGame.module.scss';
import { Button } from '../../components/Button';
import { Formik, FormikHelpers } from 'formik';
import {
  AppBar,
  Menu,
  MenuItem,
  TextField,
  Toolbar,
  Typography,
} from '@material-ui/core';
import { ViewGameForm } from '.';
import useChannel from '../../utils/hooks/useChannel';
import { Game, Category as CategoryType } from '../../types';
import Category from '../../components/Category';
import { Menu as MenuIcon } from '@material-ui/icons';
import KeyboardArrowLeftIcon from '@material-ui/icons/KeyboardArrowLeft';

type ViewGameProps = {
  apiToken: string;
};

const initialState: Game = {
  categories: [],
  id: '',
  name: '',
  columns: 6,
};

const gameReducer = (state: Game, { type, payload }: any) => {
  console.log(type, payload);
  let category: CategoryType | undefined;

  switch (type) {
    case 'phx_reply':
      const newState = payload?.response || initialState;
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

const ViewGame: FunctionComponent<ViewGameProps> = ({ apiToken }) => {
  const { gameId } = useParams<{ gameId: string }>();
  const [isAddCategory, setIsAddCategory] = useState(false);
  const [{ categories = [], name = '' }, channel] = useChannel(
    `game:${gameId}`,
    gameReducer,
    initialState
  );
  const [anchorEl, setAnchorEl] = useState<Element | null>(null);

  const history = useHistory();

  const toggleAddCategory = () => setIsAddCategory(!isAddCategory);

  const handleClick = (event: SyntheticEvent) => {
    setAnchorEl(event.target as HTMLElement);
  };

  const handleClose = () => setAnchorEl(null);

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
      <AppBar position="sticky">
        <Toolbar>
          <KeyboardArrowLeftIcon onClick={() => history.goBack()}/>

          <Typography variant="h6" className={styles.title}>
            {name}
          </Typography>

          <MenuIcon
            aria-controls="menu"
            aria-haspopup="true"
            aria-label="menu"
            onClick={handleClick}
          />

          <Menu
            id="menu"
            anchorEl={anchorEl}
            keepMounted
            open={Boolean(anchorEl)}
            onClose={handleClose}
          >
            <MenuItem>Profile</MenuItem>
            <MenuItem onClick={toggleAddCategory}>
              {isAddCategory ? 'Close' : 'Add category'}
            </MenuItem>
          </Menu>
        </Toolbar>
      </AppBar>

      <div className={styles.categories}>
        {categories.map((category: CategoryType, index) => {
          return (
            <Category category={category} key={index} gameChannel={channel} />
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

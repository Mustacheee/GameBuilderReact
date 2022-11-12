import React from 'react';
import styles from './CreateGame.module.scss';
import { Formik } from 'formik';
import validationSchema from './validationSchema';
import Button from '../../components/Button';
import { TextField } from '@material-ui/core';
import { createGame } from '../../utils/api';
import { CreateGameForm } from './';
import { goToViewGame } from '../../utils/navigation';
import { useNavigate } from 'react-router';

const CreateGame = () => {
  const history = useNavigate();

  const initialValues: CreateGameForm = {
    game: { name: '' },
  };

  const onSubmit = async (values: CreateGameForm) => {
    const { data = {} } = await createGame(values);
    const { id: gameId } = data;

    if (gameId) {
      goToViewGame(gameId, history);
    }
  };

  return (
    <div className={styles.container}>
      <Formik
        onSubmit={onSubmit}
        initialValues={initialValues}
        validationSchema={validationSchema}
      >
        {({ errors, handleChange, handleSubmit, touched, values }) => {
          return (
            <form onSubmit={handleSubmit}>
              <TextField
                error={
                  Boolean(touched.game?.name) && Boolean(errors.game?.name)
                }
                fullWidth
                helperText={Boolean(errors.game?.name) && errors.game?.name}
                id="name"
                label="Name"
                name="game[name]"
                onChange={handleChange}
                value={values.game.name}
              />
              <Button type="submit">Create</Button>
            </form>
          );
        }}
      </Formik>
    </div>
  );
};

export default CreateGame;

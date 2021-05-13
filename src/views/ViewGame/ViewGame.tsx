import { connect } from 'react-redux';
import React, {
  FunctionComponent,
  useContext,
  useEffect,
  useState,
} from 'react';
import { useParams } from 'react-router';
import { RootState } from '../../store/reducer';
import { API_SUCCESS, createCategory, viewGame } from '../../utils/api';
import styles from './ViewGame.module.scss';
import { Button } from '../../components/Button';
import { Formik, FormikHelpers } from 'formik';
import { TextField } from '@material-ui/core';
import { ViewGameForm } from '.';
import { SocketContext } from '../../utils/contexts';

type ViewGameProps = {
  apiToken: string;
};

interface Category {
  id: string;
  name: string;
}

const ViewGame: FunctionComponent<ViewGameProps> = ({ apiToken }) => {
  const { gameId } = useParams<{ gameId: string }>();
  const [categories, setCategories] = useState([]);
  const [name, setName] = useState('');
  const [isAddCategory, setIsAddCategory] = useState(false);

  const socket = useContext(SocketContext);
  console.log(socket);

  useEffect(() => {
    const getDetails = async () => {
      const response = await viewGame(gameId, apiToken);
      console.log('qqqwe', response);
      const { status, data } = response;

      if (status === API_SUCCESS) {
        const { categories = [], name = '' } = data;
        setCategories(categories);
        setName(name);

        const channel = socket.channel('game:lobby');
        channel.onMessage = (event, payload) => {
          console.log('event', event, 'payload', payload);
          return payload;
        };

        channel
          .join()
          .receive('ok', (messages: any) =>
            console.log('catching up', messages)
          )
          .receive('error', (reason: any) => console.log('failed join', reason))
          .receive('timeout', (err = '') =>
            console.log('Networking issue. Still waiting...', err)
          );

        return () => channel.leave();
      }
    };

    getDetails();
  }, [apiToken, gameId]);

  const toggleAddCategory = () => setIsAddCategory(!isAddCategory);

  const onSubmit = async (
    values: ViewGameForm,
    { setFieldError }: FormikHelpers<ViewGameForm>
  ) => {
    console.log('submit', values);
    const response = await createCategory(gameId, values, apiToken);
    console.log(response);
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
                  {categories.map((category: Category, index) => {
                    return (
                      <div className={styles.category} key={index}>
                        {category.name}
                      </div>
                    );
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

import React, { FunctionComponent } from 'react';
import styles from './Login.module.scss';
import validationSchema from './validationSchema';
import { Formik, FormikHelpers } from 'formik';
import { TextField, Button } from '@material-ui/core';
import { login } from '../../utils/api';
import { connect } from 'react-redux';
import { authSuccess, authFail } from '../../store/actions/auth';
import { Dispatch } from 'redux';

interface LoginForm {
  email: string;
  password: string;
}

type LoginProps = {
  loginFailed: () => void;
  loginSuccess: (apiToken: string) => void;
}

const Login: FunctionComponent<LoginProps> = ({
  loginFailed,
  loginSuccess,
}) => {
  const initialValues: LoginForm = { email: '', password: '' };

  const onSubmit = async (values: LoginForm, { setFieldError }: FormikHelpers<LoginForm>) => {
    const { status, token, message = '' } = await login(values);

    if (status === 'success') {
      loginSuccess(`Bearer ${token}`);
      return;
    }

    loginFailed();
    setFieldError('email', message)
  }

  return (
    <div className={styles.container}>
      <Formik
        initialValues={initialValues}
        onSubmit={onSubmit}
        validationSchema={validationSchema}
      >
        {({
          errors,
          handleChange,
          handleSubmit,
          touched,
          values,
        }) => {
          return (
            <form onSubmit={handleSubmit}>
              <TextField
                error={Boolean(touched.email) && Boolean(errors.email)}
                fullWidth
                helperText={Boolean(errors.email) && errors.email}
                id="email"
                label="Email"
                name="email"
                onChange={handleChange}
                value={values.email}
              />

              <TextField
                error={Boolean(touched.password) && Boolean(errors.password)}
                fullWidth
                helperText={Boolean(touched.password) && errors.password}
                id="password"
                label="Password"
                name="password"
                onChange={handleChange}
                type="password"
                value={values.password}
              />

              <Button type="submit" fullWidth>
                Login
              </Button>
            </form>
          );
        }}
      </Formik>
    </div>
  );
};

const mapDispatchToProps = (dispatch: Dispatch) => {
  return {
    loginSuccess: (apiToken: string) => dispatch(authSuccess(apiToken)),
    loginFailed: () => dispatch(authFail()),
  };
}

export default connect(null, mapDispatchToProps)(Login);

import React from 'react';
import styles from './Login.module.scss';
import validationSchema from './validationSchema';
import { Formik } from 'formik';
import { TextField, Button } from '@material-ui/core';

interface LoginForm {
  email: string;
  password: string;
}

const Login = () => {
  const initialValues: LoginForm = { email: '', password: '' };

  const onSubmit = (values: LoginForm) => {
    console.log(values);
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

export default Login;

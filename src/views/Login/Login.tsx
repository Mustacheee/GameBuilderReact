import React from 'react';
import styles from './Login.module.scss';
import { TextField, Button } from '@material-ui/core';

const Login = () => {
  return (
    <div className={styles.container}>
      <TextField fullWidth label="Email" />
      <TextField fullWidth label="Password" type="password" />

      <Button type="submit" fullWidth>
        Login
      </Button>
    </div>
  );
};

export default Login;

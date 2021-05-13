import React, { FunctionComponent } from 'react';
import styles from './Button.module.scss';
import { Button as MaterialButton, ButtonProps as MaterialProps } from '@material-ui/core';

interface ButtonProps extends MaterialProps { };

const Button: FunctionComponent<ButtonProps> = (props: ButtonProps) => {
  return (
    <MaterialButton
      {...props}
      classes={{
        label: styles.label,
        root: styles.root
      }}
    >
      {props.children}
    </MaterialButton>
  );
}

export default Button;
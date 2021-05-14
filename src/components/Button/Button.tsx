import React, { FunctionComponent } from 'react';
import styles from './Button.module.scss';
import { Button as MaterialButton, ButtonProps as MaterialProps } from '@material-ui/core';

interface ButtonProps extends MaterialProps {
  rootClass?: string;
};

const Button: FunctionComponent<ButtonProps> = ({
  rootClass,
  ...props
}: ButtonProps) => {

  return (
    <MaterialButton
      classes={{
        label: styles.label,
        root: rootClass || styles.root,
      }}
      {...props}
    >
      {props.children}
    </MaterialButton>
  );
}

export default Button;
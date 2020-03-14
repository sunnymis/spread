import React from 'react';
import cx from 'classnames';
import styles from './button.module.scss';

interface ButtonProps {
  text: string;
  secondary?: boolean;
  disabled?: boolean;
}

function Button(props: ButtonProps & React.ButtonHTMLAttributes<HTMLButtonElement>) {
  const buttonStyles = cx(
    styles.button,
    props.disabled && styles.disabled,
    props.secondary && styles.secondary,
  )

  return (
    <button
      className={buttonStyles}
      {...props}
    >
      {props.text}
    </button>
  )
}

export default Button


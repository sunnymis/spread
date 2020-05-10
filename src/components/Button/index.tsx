import React from "react";
import cx from "classnames";
import styles from "./button.module.scss";
import omit from "lodash/omit";

interface ButtonProps {
  text: string;
  secondary?: boolean;
  disabled?: boolean;
  styles?: string;
}

function Button(
  props: ButtonProps & React.ButtonHTMLAttributes<HTMLButtonElement>
) {
  const buttonStyles = cx(
    styles.button,
    props.disabled && styles.disabled,
    props.secondary && styles.secondary,
    props.styles
  );

  const buttonProps = omit(props, ["secondary"]);

  return (
    <button className={buttonStyles} {...buttonProps}>
      {props.text}
    </button>
  );
}

export default Button;

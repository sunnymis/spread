import React from "react";
import { Field, FieldConfig } from "formik";
import styles from "./input.module.scss";

interface InputProps {
  placeholder?: string;
  label: string;
}

function Input(props: InputProps & FieldConfig) {
  return (
    <div className={styles.container}>
      <span className={styles.label}>{props.label}</span>
      <Field className={styles.input} type="text" {...props} />
    </div>
  );
}

export default Input;

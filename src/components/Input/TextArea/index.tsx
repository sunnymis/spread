import React from "react";
import { Field, FieldConfig } from "formik";
import styles from "../input.module.scss";

interface TextAreaProps {
  placeholder?: string;
  label: string;
}

function TextArea(props: TextAreaProps & FieldConfig) {
  return (
    <div className={styles.container}>
      <span className={styles.label}>{props.label}</span>
      <Field
        rows="4"
        component="textarea"
        className={styles.textarea}
        {...props}
      />
    </div>
  );
}

export default TextArea;

import React, { useState } from "react";
import { Formik, Form, ErrorMessage } from "formik";
import { useHistory } from "react-router-dom";
import Input from "../../components/Input";
import Button from "../../components/Button";
import styles from "./login.module.scss";
import logIn from "../../firebase/login";
interface FormValues {
  email: string;
  password: string;
}

export default function LogInForm(props: any) {
  const [errors, setErrors] = useState({ message: null });
  let history = useHistory();

  const handleLogInSubmit = async (formValues: FormValues) => {
    const { email, password } = formValues;
    try {
      const response = await logIn(email, password);

      console.log("Response", response);
      if (response.user) {
        localStorage.setItem("spreadUserId", response.user.uid);
        history.push("/restaurants");
      }
    } catch (error) {
      console.log("Error", error);
      setErrors(error);
    }
  };
  const initialValues = {
    email: "",
    password: "",
  };

  return (
    <Formik enableReinitialize initialValues={initialValues} onSubmit={handleLogInSubmit}>
      {() => (
        <Form>
          <Input label="Email" type="text" name="email" />
          <Input label="Password" type="password" name="password" />
          <ErrorMessage name="name" component="div" />
          {errors.message ? <div className={styles.errorMessage}>{errors.message}</div> : null}
          <div className={styles.submit}>
            <Button type="submit" text="Log In" />
          </div>
        </Form>
      )}
    </Formik>
  );
}

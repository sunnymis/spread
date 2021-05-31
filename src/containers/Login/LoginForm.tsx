import React from "react";
import { Formik, Form, ErrorMessage } from "formik";
import Input from "../../components/Input";
import Button from "../../components/Button";
import styles from "./login.module.scss";

export default function LogInForm(props: any) {
  const handleLogInSubmit = (event: any) => {
    event.preventDefault();

    console.log("login", event);
    // login(loginForm.email, loginForm.password)
    //   .then((success) => {
    //     localStorage.setItem("spreadUserId", success.user.uid);
    //     props.history.push("/");
    //   })
    //   .catch((error) => {
    //     setError(error);
    //   });
  };

  return (
    <Formik enableReinitialize initialValues={{}} onSubmit={handleLogInSubmit}>
      {() => (
        <Form>
          <Input label="Email" type="text" name="email" />
          <Input label="Password" type="password" name="password" />
          <ErrorMessage name="name" component="div" />
          <div className={styles.submit}>
            <Button type="submit" text="Log In" />
          </div>
        </Form>
      )}
    </Formik>
  );
}

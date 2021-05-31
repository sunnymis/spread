import React from "react";
import { Formik, Form, ErrorMessage } from "formik";
import Input from "../../components/Input";
import Button from "../../components/Button";
import styles from "./login.module.scss";

export default function SignUpForm(props: any) {
  const handleCreateAccountSubmit = (event: any) => {
    console.log("Account created", event);
    // createAccount(createAccountForm.email, createAccountForm.password)
    //   .then((success) => {
    //     localStorage.setItem("spreadUserId", success.user.uid);
    //     props.history.push("/");
    //   })
    //   .catch((error) => {
    //     setError(error);
    //   });
  };

  return (
    <Formik enableReinitialize initialValues={{}} onSubmit={handleCreateAccountSubmit}>
      {() => (
        <Form>
          <Input label="Email" type="text" name="email" />
          <Input label="Password" type="password" name="password" />
          <ErrorMessage name="name" component="div" />
          <div className={styles.submit}>
            <Button type="submit" text="Sign Up" />
          </div>
        </Form>
      )}
    </Formik>
  );
}

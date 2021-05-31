import React, { useState } from "react";
import LoginForm from "./LoginForm";
import SignUpForm from "./SignUpForm";
import Footer from "./Footer";
import styles from "./login.module.scss";

export default function LogIn(props: any) {
  const [isLoggingIn, setIsLoggingIn] = useState(true);

  return (
    <div className={styles.container}>
      <h1 className={styles.appName}>Spread</h1>
      <h2 className={styles.header}>{isLoggingIn ? "Login" : "Create an account"}</h2>
      {isLoggingIn ? <LoginForm {...props} /> : <SignUpForm {...props} />}
      <Footer isLoggingIn={isLoggingIn} onClick={setIsLoggingIn} />
    </div>
  );
}

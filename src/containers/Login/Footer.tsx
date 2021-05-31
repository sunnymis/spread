import React from "react";
import styles from "./login.module.scss";

export default function Footer(props: any) {
  const { isLoggingIn, onClick } = props;

  return isLoggingIn ? (
    <p className={styles.footerContainer}>
      {` Don't have an account? `}
      <span className={styles.footerText} onClick={() => onClick(false)}>{` Sign Up`}</span>
    </p>
  ) : (
    <p className={styles.footerContainer}>
      Already have an account?
      <span className={styles.footerText} onClick={() => onClick(true)}>{` Sign In`}</span>
    </p>
  );
}

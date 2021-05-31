import React from "react";
import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom";
import Button from "../../components/Button";
import signOut from "../../firebase/signout";
import styles from "./home.module.scss";

export default function Home() {
  let history = useHistory();

  const logout = async () => {
    try {
      await signOut();

      localStorage.removeItem("spreadUserId");
      history.push("/login");
    } catch (error) {
      console.log("error signing out");
    }
  };

  return (
    <>
      <Link to="/restaurants">Restaurants</Link>
      <div className={styles.logout}>
        <Button text="Log out" onClick={logout} />
      </div>
    </>
  );
}

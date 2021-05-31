import React from "react";
import { Link } from "react-router-dom";
import Button from "../../components/Button";
import firebase from "../../firebase";

const Home: React.FC = () => {
  const logout = async () => {
    try {
      const response = firebase.auth().signOut();
      console.log(response);

      localStorage.removeItem("spreadUserId");
    } catch (error) {
      console.log("error signing out");
    }
  };

  return (
    <>
      <Link to="/restaurants">Restaurants</Link>
      <div>
        <Button text="Log out" onClick={logout} />
      </div>
    </>
  );
};

export default Home;

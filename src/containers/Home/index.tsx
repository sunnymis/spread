import React from "react";
import { Link } from "react-router-dom";
import Button from "../../components/Button";
import signOut from "../../firebase/signout";

const Home: React.FC = () => {
  const logout = async () => {
    try {
      const response = await signOut();
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

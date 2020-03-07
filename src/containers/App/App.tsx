import React, { Dispatch, useEffect } from "react";
import "./App.css";
import { compose } from "redux";
import { connect } from "react-redux";
import { Action, SetRestaurant, DeleteRestaurant, FetchRestaurants } from "../../actions";
import { AppState } from "../../store";
import { Restaurant } from "../Restaurants";
import Restaurants from "../Restaurants";

interface Props {
  restaurants: Restaurant[];
  onAddClick(): void;
  onDeleteClick(): void;
}

const App: React.FC<Props> = ({ restaurants, onAddClick, onDeleteClick }) => {
  useEffect(() => {}, []);

  return (
    <div className="App">
      <Restaurants restaurants={restaurants} onAddClick={onAddClick} onDeleteClick={onDeleteClick} />
    </div>
  );
};

export const mapStateToProps = (state: AppState) => ({
  restaurants: state.app.restaurants
});

export const mapDispatchToProps = (dispatch: Dispatch<Action>) => {
  const newRestaurant: Restaurant = {
    id: "1",
    name: "New Restaurant",
    location: "Brooklyn",
    rating: 5,
    tags: ["chinese"],
    description: "coolio place",
    images: ["link-to-img3", "link-to-second-img4"]
  };

  return {
    foadRestaurants: () => dispatch(FetchRestaurants("id-of-firebase")),
    onAddClick: () => dispatch(SetRestaurant(newRestaurant, { hi: "world" })),
    onDeleteClick: () => dispatch(DeleteRestaurant("0"))
  };
};

export default compose(connect(mapStateToProps, mapDispatchToProps))(App);

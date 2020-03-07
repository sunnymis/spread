import React, { Dispatch } from "react";
import "./App.css";
import { compose } from "redux";
import { connect } from "react-redux";
import { Action, SetRestaurant, DeleteRestaurant } from "./actions";
import { AppState } from "./store";
import { Restaurant } from "./types";

interface Props {
  restaurants: Restaurant[];
  onAddClick(): void;
  onDeleteClick(): void;
}

const App: React.FC<Props> = ({ restaurants, onAddClick, onDeleteClick }) => {
  return (
    <div className="App">
      {restaurants.map(r => (
        <div>
          <p>{r.name}</p>
          <p>{r.description}</p>
          <p>{r.rating}</p>
          <p>{r.location}</p>
          <p>{r.name}</p>
          <pre>{JSON.stringify(r.tags)}</pre>
          <pre>{JSON.stringify(r.images)}</pre>
        </div>
      ))}

      <button onClick={onAddClick}>Add Restaurant</button>
      <button onClick={onDeleteClick}>Delete Restaurant</button>
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
    onAddClick: () => dispatch(SetRestaurant(newRestaurant)),
    onDeleteClick: () => dispatch(DeleteRestaurant("0"))
  };
};

export default compose(connect(mapStateToProps, mapDispatchToProps))(App);

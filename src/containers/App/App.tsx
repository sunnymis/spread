import React, { useEffect } from "react";
import "./App.css";
import { compose } from "redux";
import { connect } from "react-redux";
import { SetRestaurant, DeleteRestaurant, FetchRestaurants, fetchAllRestaurants } from "../../actions";
import { AppState } from "../../store";
import { Restaurant } from "../Restaurants";
import Restaurants from "../Restaurants";

interface Props {
  fetchAll(docId: string): void;
  restaurants: Restaurant[];
  restaurantsLoading: boolean;
  onAddClick(): void;
  onDeleteClick(): void;
}

const App: React.FC<Props> = ({ fetchAll, restaurants, restaurantsLoading, onAddClick, onDeleteClick }) => {
  useEffect(() => {
    fetchAll("n23qMAUSzDR5GcPgQmlarnK0Ok43");
  }, []);

  return (
    <div className="App">
      {restaurantsLoading ? (
        <div>Loading Restaurants...</div>
      ) : (
        <Restaurants restaurants={restaurants} onAddClick={onAddClick} onDeleteClick={onDeleteClick} />
      )}
    </div>
  );
};

export const mapStateToProps = (state: AppState) => ({
  restaurantsLoading: state.app.restaurants.isFetching,
  restaurants: state.app.restaurants.items
});

export const mapDispatchToProps = (dispatch: any) => {
  // todo figure out how to type this dispatch
  const newRestaurant: Restaurant = {
    id: "1",
    name: "New Restaurant",
    location: "Brooklyn",
    rating: 5,
    tags: ["chinese"],
    description: "coolio place",
    images: ["link-to-img3", "link-to-second-img4"],
    docId: "something"
  };

  return {
    fetchAll: (id: string) => dispatch(fetchAllRestaurants(id)),
    loadRestaurants: () => dispatch(FetchRestaurants("id-of-firebase")),
    onAddClick: () => dispatch(SetRestaurant(newRestaurant)),
    onDeleteClick: () => dispatch(DeleteRestaurant("0"))
  };
};

export default compose(connect(mapStateToProps, mapDispatchToProps))(App);

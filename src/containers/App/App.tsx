import React, { useEffect } from "react";
import "./App.css";
import { compose } from "redux";
import { connect } from "react-redux";
import { AppState } from "../../store";
import Restaurants from "../Restaurants";
import getRestaurantsByUserId from "../../firebase/getRestaurantsByUserId";
import addRestaurant from "../../firebase/addRestaurant";
import deleteRestaurant from "../../firebase/deleteRestaurant";

interface Props {
  fetchAll(docId: string): void;
  restaurants: Restaurant[];
  restaurantsLoading: boolean;
  onAddClick(restaurant: Restaurant): void;
  onDeleteClick(id: string): void;
}

const App: React.FC<Props> = ({ fetchAll, restaurants, restaurantsLoading, onAddClick, onDeleteClick }) => {
  useEffect(() => {
    fetchAll("n23qMAUSzDR5GcPgQmlarnK0Ok43");
  }, []);


  const handleOnAddClick = (restaurant: Restaurant) => {
    onAddClick(restaurant);
  }

  const handleOnDeleteClick = (id: string) => {
    onDeleteClick(id);
  }

  return (
    <div className="App">
      {restaurantsLoading ? (
        <div>Loading Restaurants...</div>
      ) : (
          <Restaurants restaurants={restaurants} onAddClick={handleOnAddClick} onDeleteClick={onDeleteClick} />
        )}
    </div>
  );
};

export const mapStateToProps = (state: AppState) => ({
  restaurantsLoading: state.app.restaurants.isFetching,
  restaurants: state.app.restaurants.items
});

export const mapDispatchToProps = (dispatch: any) => {
  return {
    fetchAll: (id: string) => dispatch(getRestaurantsByUserId(id)),
    onAddClick: (restaurant: Restaurant) => dispatch(addRestaurant(restaurant)),
    onDeleteClick: (id: string) => dispatch(deleteRestaurant(id))
  };
};

export default compose(connect(mapStateToProps, mapDispatchToProps))(App);

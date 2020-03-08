import React, { useEffect } from "react";
import "./App.css";
import { compose } from "redux";
import { connect } from "react-redux";
import { DeleteRestaurant } from "../../actions";
import { AppState } from "../../store";
import Restaurants from "../Restaurants";
import getRestaurantsByUserId from "../../firebase/getRestaurantsByUserId";
import addRestaurant from "../../firebase/addRestaurant";

interface Props {
  fetchAll(docId: string): void;
  restaurants: Restaurant[];
  restaurantsLoading: boolean;
  onAddClick(restaurant: Restaurant): void;
  onDeleteClick(): void;
}

const App: React.FC<Props> = ({ fetchAll, restaurants, restaurantsLoading, onAddClick, onDeleteClick }) => {
  useEffect(() => {
    fetchAll("n23qMAUSzDR5GcPgQmlarnK0Ok43");
  }, []);


  const handleOnAddClick = (restaurant: Restaurant) => {
    onAddClick(restaurant);
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
    onDeleteClick: () => dispatch(DeleteRestaurant("0"))
  };
};

export default compose(connect(mapStateToProps, mapDispatchToProps))(App);

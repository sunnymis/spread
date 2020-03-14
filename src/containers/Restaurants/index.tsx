import React, { useEffect, useState } from "react";
import { compose } from "redux";
import { connect } from "react-redux";

import { AppState } from "../../store";
import getRestaurantsByUserId from "../../firebase/getRestaurantsByUserId";
import addRestaurant from "../../firebase/addRestaurant";
import deleteRestaurant from "../../firebase/deleteRestaurant";
import updateRestaurant from "../../firebase/updateRestaurant";
import Form from './Form';
import List from './List';

import { FormValues } from './Form';

interface Props {
  restaurants: Restaurant[];
  isLoading: boolean;
  getRestaurantsByUserId(docId: string): void;
  addRestaurant(restaurant: Restaurant): void;
  deleteRestaurant(id: string): void;
  updateRestaurant(restaurant: Restaurant): void;
}

const Restaurants: React.FC<Props> = (props) => {
  const {
    restaurants,
    isLoading,
    getRestaurantsByUserId,
    addRestaurant,
    deleteRestaurant,
    updateRestaurant,
  } = props;

  const initialValues: FormValues = {
    name: '',
    location: '',
    rating: 0,
    description: '',
  }
  const [formValues, setFormValues] = useState(initialValues);
  const [editingRestaurant, setEditingRestaurant] = useState<string | undefined>(undefined);
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    getRestaurantsByUserId("n23qMAUSzDR5GcPgQmlarnK0Ok43");
  }, []); // eslint-disable react-hooks/exhaustive-deps

  const handleOnEditClick = (restaurant: Restaurant) => {
    setEditingRestaurant(restaurant.docId)
    setFormValues(restaurant)
    setShowForm(true)
  }

  const reset = () => {
    setShowForm(false);
    setEditingRestaurant(undefined);
    setFormValues(initialValues)
  }

  const handleOnSubmit = (restaurant: Restaurant) => {
    if (editingRestaurant) {
      updateRestaurant(restaurant)
    } else {
      addRestaurant(restaurant);
    }

    reset();
  }

  if (isLoading) {
    return <h1>Loading Restaurants...</h1>
  }

  if (showForm) {
    // todo cancel button should clear form values 
    return (
      <div>
        <Form
          editingRestaurant={editingRestaurant}
          formValues={formValues}
          onSubmit={handleOnSubmit}
        />
        <button onClick={reset}>CANCEL</button>
      </div>
    )
  }

  return (
    <div className="App">
      <List restaurants={restaurants} onEditClick={handleOnEditClick} onDeleteClick={deleteRestaurant} />
      <button onClick={() => setShowForm(true)}>ADD NEW</button>
    </div>
  );
};

export const mapStateToProps = (state: AppState) => ({
  isLoading: state.restaurants.isFetching,
  restaurants: state.restaurants.items
});

export const mapDispatchToProps = (dispatch: any) => {
  return {
    getRestaurantsByUserId: (id: string) => dispatch(getRestaurantsByUserId(id)),
    addRestaurant: (restaurant: Restaurant) => dispatch(addRestaurant(restaurant)),
    deleteRestaurant: (id: string) => dispatch(deleteRestaurant(id)),
    updateRestaurant: (restaurant: Restaurant) => dispatch(updateRestaurant(restaurant)),
  };
};

export default compose(connect(mapStateToProps, mapDispatchToProps))(Restaurants);

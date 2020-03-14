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
  fetchAll(docId: string): void;
  restaurants: Restaurant[];
  restaurantsLoading: boolean;
  onAddClick(restaurant: Restaurant): void;
  onDeleteClick(id: string): void;
  onEditClick(restaurant: Restaurant): void;
}

const Restaurants: React.FC<Props> = ({ fetchAll, restaurants, restaurantsLoading, onAddClick, onDeleteClick, onEditClick }) => {
  const initialValues: FormValues = {
    name: 'my_restaurant',
    location: 'upper east side',
    rating: 5,
    description: 'great. v good.'
  }
  const [formValues, setFormValues] = useState(initialValues);
  const [isEditing, setIsEditing] = useState(false);
  const [editingDocId, setEditingDocId] = useState('');
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    fetchAll("n23qMAUSzDR5GcPgQmlarnK0Ok43");
  }, []); // eslint-disable react-hooks/exhaustive-deps

  const handleOnEditClick = (restaurant: Restaurant) => {
    setIsEditing(true);
    setEditingDocId(restaurant.docId || '')
    setFormValues(restaurant)
  }

  const handleOnAddClick = (restaurant: Restaurant) => {
    onAddClick(restaurant);
    setShowForm(false);
  }

  if (restaurantsLoading) {
    return <h1>Loading Restaurants...</h1>
  }

  if (showForm) {
    return (
      <div>
        <Form
          isEditing={isEditing}
          editingDocId={editingDocId}
          formValues={formValues}
          onAddClick={handleOnAddClick}
          onEditClick={onEditClick}
          onSetIsEditing={() => setIsEditing(false)}
        />
        <button onClick={() => setShowForm(false)}>CANCEL</button>
      </div>
    )
  }

  return (
    <div className="App">
      <List restaurants={restaurants} onEditClick={handleOnEditClick} onDeleteClick={onDeleteClick} />
      <button onClick={() => setShowForm(true)}>ADD NEW</button>
    </div>
  );
};

export const mapStateToProps = (state: AppState) => ({
  restaurantsLoading: state.restaurants.isFetching,
  restaurants: state.restaurants.items
});

export const mapDispatchToProps = (dispatch: any) => {
  return {
    fetchAll: (id: string) => dispatch(getRestaurantsByUserId(id)),
    onAddClick: (restaurant: Restaurant) => dispatch(addRestaurant(restaurant)),
    onDeleteClick: (id: string) => dispatch(deleteRestaurant(id)),
    onEditClick: (restaurant: Restaurant) => dispatch(updateRestaurant(restaurant)),
  };
};

export default compose(connect(mapStateToProps, mapDispatchToProps))(Restaurants);

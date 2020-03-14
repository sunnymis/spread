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

import { FormValues } from '../Restaurants/Form';

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

  useEffect(() => {
    fetchAll("n23qMAUSzDR5GcPgQmlarnK0Ok43");
  }, []); // eslint-disable react-hooks/exhaustive-deps

  const handleOnEditClick = (restaurant: Restaurant) => {
    setIsEditing(true);
    setEditingDocId(restaurant.docId || '')
    setFormValues(restaurant)
  }

  return (
    <div className="App">
      <Form
        isEditing={isEditing}
        editingDocId={editingDocId}
        formValues={formValues}
        onAddClick={onAddClick}
        onEditClick={onEditClick}
        onSetIsEditing={() => setIsEditing(false)}
      />
      {restaurantsLoading ? (
        <div>Loading Restaurants...</div>
      ) : (
          <List restaurants={restaurants} onEditClick={handleOnEditClick} onDeleteClick={onDeleteClick} />
        )}
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

import React, { useEffect, useState } from "react";
import "./App.css";
import { compose } from "redux";
import { connect } from "react-redux";
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { AppState } from "../../store";
import Restaurants from "../Restaurants";
import getRestaurantsByUserId from "../../firebase/getRestaurantsByUserId";
import addRestaurant from "../../firebase/addRestaurant";
import deleteRestaurant from "../../firebase/deleteRestaurant";
import updateRestaurant from "../../firebase/updateRestaurant";

interface Props {
  fetchAll(docId: string): void;
  restaurants: Restaurant[];
  restaurantsLoading: boolean;
  onAddClick(restaurant: Restaurant): void;
  onDeleteClick(id: string): void;
  onEditClick(restaurant: Restaurant): void;
}

interface FormValues {
  name: string;
  location: string;
  rating: number;
  description: string;
}

const App: React.FC<Props> = ({ fetchAll, restaurants, restaurantsLoading, onAddClick, onDeleteClick, onEditClick }) => {
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
  }, []);

  const handleOnEditClick = (restaurant: Restaurant) => {
    setIsEditing(true);
    setEditingDocId(restaurant.docId || '')
    setFormValues(restaurant)
  }

  return (
    <div className="App">
      <Formik
        enableReinitialize
        initialValues={formValues}
        onSubmit={(values, actions) => {
          if (isEditing) {
            const newRestaurant = {
              ...values,
              docId: editingDocId
            };
            onEditClick(newRestaurant)
          } else {
            onAddClick({ ...values });
          }
        }}
      >
        {
          ({ isSubmitting }) => (
            <Form>
              <Field type="text" name="name" />
              <Field type="text" name="location" />
              <Field type="text" name="rating" />
              <Field type="text" name="description" />
              <ErrorMessage name="name" component="div" />
              {
                isEditing ? (
                  <button type="submit">Submit Edit </button>
                ) : (
                    <button type="submit" disabled={isSubmitting}>Submit New </button>
                  )
              }
              {isEditing && (
                <button type="button" onClick={() => setIsEditing(false)}>Stop Edit</button>
              )}
            </Form>
          )
        }
      </Formik>
      {restaurantsLoading ? (
        <div>Loading Restaurants...</div>
      ) : (
          <Restaurants restaurants={restaurants} onEditClick={handleOnEditClick} onDeleteClick={onDeleteClick} />
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
    onDeleteClick: (id: string) => dispatch(deleteRestaurant(id)),
    onEditClick: (restaurant: Restaurant) => dispatch(updateRestaurant(restaurant)),
  };
};

export default compose(connect(mapStateToProps, mapDispatchToProps))(App);

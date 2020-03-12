import React, { useEffect } from "react";
import "./App.css";
import { compose } from "redux";
import { connect } from "react-redux";
import { Formik, Form, Field, ErrorMessage } from 'formik';
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

interface FormValues {
  name: string;
  location: string;
  rating: number;
  description: string;
}

const App: React.FC<Props> = ({ fetchAll, restaurants, restaurantsLoading, onAddClick, onDeleteClick }) => {
  useEffect(() => {
    fetchAll("n23qMAUSzDR5GcPgQmlarnK0Ok43");
  }, []);

  const handleOnDeleteClick = (id: string) => {
    onDeleteClick(id);
  }

  const initialValues: FormValues = {
    name: 'my_restaurant',
    location: 'upper east side',
    rating: 5,
    description: 'great. v good.'

  }

  return (
    <div className="App">
      <Formik
        initialValues={initialValues}
        onSubmit={(values, actions) => {
          console.log('values', values);
          console.log('actions', actions);
          onAddClick({ ...values });
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
              <button type="submit" disabled={isSubmitting}>Submit</button>
            </Form>
          )
        }
      </Formik>
      {restaurantsLoading ? (
        <div>Loading Restaurants...</div>
      ) : (
          <Restaurants restaurants={restaurants} onDeleteClick={onDeleteClick} />
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

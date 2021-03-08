import React, { useEffect, useState } from "react";
import { compose } from "redux";
import { connect } from "react-redux";
import { AppState } from "../../store";
import getRestaurantsByUserId from "../../firebase/getRestaurantsByUserId";
import addRestaurant from "../../firebase/addRestaurant";
import Form from "./Form";
import List from "./List";
import styles from "./restaurants.module.scss";
import { FormValues } from "./Form";

interface Props {
  restaurants: Restaurant[];
  isLoading: boolean;
  getRestaurantsByUserId(docId: string): void;
  addRestaurant(restaurant: Restaurant): void;
}

const Restaurants: React.FC<Props> = (props) => {
  const { restaurants, isLoading, getRestaurantsByUserId, addRestaurant } = props;

  const initialValues: FormValues = {
    name: "",
    location: "",
    rating: 0,
    description: "",
    tags: "",
  };
  const [formValues, setFormValues] = useState(initialValues);
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    getRestaurantsByUserId("n23qMAUSzDR5GcPgQmlarnK0Ok43");
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const reset = () => {
    setShowForm(false);
    setFormValues(initialValues);
  };

  const handleOnSubmit = (restaurant: Restaurant) => {
    if (typeof restaurant.tags !== "string") {
      return;
    }

    let tags = restaurant.tags.split(" ");

    addRestaurant({
      ...restaurant,
      tags,
    });

    reset();
  };

  if (isLoading) {
    return <h1>Loading Restaurants...</h1>;
  }

  return (
    <div className={styles.app}>
      {showForm ? (
        <div>
          <Form formValues={formValues} onSubmit={handleOnSubmit} onCancel={reset} />
        </div>
      ) : (
        <div>
          <List restaurants={restaurants} />
          <button className={styles.addButton} onClick={() => setShowForm(true)}>
            <i className="material-icons md-48">add</i>
          </button>
        </div>
      )}
    </div>
  );
};

export const mapStateToProps = (state: AppState) => ({
  isLoading: state.restaurants.isFetching,
  restaurants: state.restaurants.items,
});

export const mapDispatchToProps = (dispatch: any) => {
  return {
    getRestaurantsByUserId: (id: string) => dispatch(getRestaurantsByUserId(id)),
    addRestaurant: (restaurant: Restaurant) => dispatch(addRestaurant(restaurant)),
  };
};

export default compose(connect(mapStateToProps, mapDispatchToProps))(Restaurants);

import { ThunkDispatch } from "redux-thunk";
import { AppState } from "../store";
import firebase from "../firebase";
import { AddRestaurant, Action } from "../actions";
import getRestaurantsByUserId from './getRestaurantsByUserId';

export default function (restaurant: Restaurant) {
  return (dispatch: ThunkDispatch<AppState, undefined, Action>) => {
    dispatch(AddRestaurant('TODO REMOVE THIS STRING'));

    const restaurants = firebase
      .firestore()
      .collection(`restaurants/users/n23qMAUSzDR5GcPgQmlarnK0Ok43`);

    restaurants
      .add({
        ...restaurant
      })
      .then(result => {
        dispatch(getRestaurantsByUserId('n23qMAUSzDR5GcPgQmlarnK0Ok43'));
      });
  };
}

import { ThunkDispatch } from "redux-thunk";
import { AppState } from "../store";
import firebase from "../firebase";
import { ReceivedRestaurants, Action } from "../actions";

export default function (restaurant: Restaurant) {
  return (dispatch: ThunkDispatch<AppState, undefined, Action>) => {

    const restaurants = firebase
      .firestore()
      .collection(`restaurants/users/n23qMAUSzDR5GcPgQmlarnK0Ok43`);

    restaurants
      .add({
        ...restaurant
      })
      .then(result => {
        dispatch(ReceivedRestaurants([restaurant]));
      });
  };
}

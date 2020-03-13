import { ThunkDispatch } from "redux-thunk";
import { AppState } from "../store";
import firebase from "../firebase";
import { receivedRestaurants, Action } from "../actions";

export default function (restaurant: Restaurant) {
  return (dispatch: ThunkDispatch<AppState, undefined, Action>) => {

    firebase
      .firestore()
      .collection(`restaurants/users/n23qMAUSzDR5GcPgQmlarnK0Ok43`)
      .add({
        ...restaurant
      })
      .then(result => {
        // TODO figure out if you can just return a restaurant object
        // directly from the result object instead of the docId hack.
        // The docId hack here is because adding a restaurant to state 
        // without a docId won't let you delete it. 

        let newRestaurant = {
          ...restaurant,
          docId: result.id
        };
        dispatch(receivedRestaurants([newRestaurant]));
      });
  };
}

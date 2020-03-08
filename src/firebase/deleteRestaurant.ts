import { ThunkDispatch } from "redux-thunk";
import { AppState } from "../store";
import firebase from "../firebase";
import { DeleteRestaurant, Action } from "../actions";

export default function (docId: string) {
  return (dispatch: ThunkDispatch<AppState, undefined, Action>) => {
    firebase
      .firestore()
      .collection('restaurants/users/n23qMAUSzDR5GcPgQmlarnK0Ok43')
      .doc(docId)
      .delete()
      .then(() => {
        console.log('deleted', docId);
        dispatch(DeleteRestaurant(docId));
      });
  };
}

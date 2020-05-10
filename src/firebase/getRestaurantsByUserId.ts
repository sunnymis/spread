import { ThunkDispatch } from "redux-thunk";
import { AppState } from "../store";
import firebase from "../firebase";
import {
  fetchRestaurants,
  receivedRestaurants,
  Action,
} from "../store/actions";

export default function (id: string) {
  return (dispatch: ThunkDispatch<AppState, undefined, Action>) => {
    dispatch(fetchRestaurants(id));

    firebase
      .firestore()
      .collection(`restaurants/users/${id}`)
      .get()
      .then((snapshot) => {
        const allRestaurants = snapshot.docs.map((r) => {
          const data = r.data() as Restaurant;

          return {
            ...data,
            docId: r.id,
          };
        });

        dispatch(receivedRestaurants(allRestaurants));
      });
  };
}

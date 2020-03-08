import { ThunkDispatch } from "redux-thunk";
import { AppState } from "../store";
import firebase from "../firebase";
import { FetchRestaurants, ReceivedRestaurants, Action } from "../actions";

export default function (id: string) {
  return (dispatch: ThunkDispatch<AppState, undefined, Action>) => {
    dispatch(FetchRestaurants(id));

    firebase
      .firestore()
      .collection(`restaurants/users/${id}`)
      .get()
      .then(snapshot => {
        const allRestaurants = snapshot.docs.map(r => {
          const data = r.data() as Restaurant;

          return {
            ...data,
            docId: r.id
          };
        });

        dispatch(ReceivedRestaurants(allRestaurants));
      });
  };
}

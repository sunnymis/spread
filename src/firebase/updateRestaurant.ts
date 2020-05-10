import { ThunkDispatch } from "redux-thunk";
import { AppState } from "../store";
import firebase from "../firebase";
import { editRestaurant, Action } from "../store/actions";

export default function (restaurant: Restaurant) {
  return (dispatch: ThunkDispatch<AppState, undefined, Action>) => {
    let restaurantWithoutImages = { ...restaurant, images: [] };

    firebase
      .firestore()
      .collection(`restaurants/users/n23qMAUSzDR5GcPgQmlarnK0Ok43`)
      .doc(restaurant.docId)
      .update({
        ...restaurantWithoutImages,
      })
      .then(result => {
        console.log('result?', result);
        // TODO figure out if you can just return a restaurant object
        // directly from the result object instead of the docId hack.
        // The docId hack here is because adding a restaurant to state 
        // without a docId won't let you delete it. 
        dispatch(editRestaurant(restaurant));
      });

    console.log('restaurt images', restaurant.images);
    restaurant.images?.forEach((img: any) => {
      console.log('img', img);
      firebase
        .storage()
        .ref()
        .child(`images/users/n23qMAUSzDR5GcPgQmlarnK0Ok43/${restaurant.docId}/${img.name}`)
        .put(img)
    });
  };
}

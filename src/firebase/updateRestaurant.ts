import firebase from "../firebase";
import { Restaurant } from "../types/restaurant";

export default function (restaurant: Restaurant, documentId: string) {
  let restaurantWithoutImages = { ...restaurant, images: [] };

  firebase
    .firestore()
    .collection(`restaurants/users/n23qMAUSzDR5GcPgQmlarnK0Ok43`)
    .doc(documentId)
    .update({
      ...restaurantWithoutImages,
    })
    .then((result) => {
      console.log("result?", result);
    });

  console.log("restaurt images", restaurant.images);

  restaurant.images?.forEach((img: any) => {
    console.log("img", img);
    firebase
      .storage()
      .ref()
      .child(`images/users/n23qMAUSzDR5GcPgQmlarnK0Ok43/${documentId}/${img.name}`)
      .put(img);
  });
}

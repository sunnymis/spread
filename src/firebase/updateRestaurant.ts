import firebase from "../firebase";
import { Restaurant } from "../types/restaurant";

export default async function (restaurant: Restaurant, documentId: string) {
  await uploadImages(restaurant, documentId);
  await updateRestaurant(restaurant, documentId);
}

const updateRestaurant = async (restaurant: Restaurant, documentId: string) => {
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
};

const uploadImages = async (restaurant: Restaurant, documentId: string) => {
  restaurant.images?.forEach((img) => {
    return firebase
      .storage()
      .ref()
      .child(`images/users/n23qMAUSzDR5GcPgQmlarnK0Ok43/${documentId}/${img.name}`)
      .put(img);
  });
};

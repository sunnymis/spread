import firebase from "../firebase";
import { Restaurant } from "../types/restaurant";
import getCurrentUser from "../util/getCurrentUser";

export default async function (restaurant: Restaurant, documentId: string) {
  await uploadImages(restaurant, documentId);
  await updateRestaurant(restaurant, documentId);
}

const updateRestaurant = async (restaurant: Restaurant, documentId: string) => {
  let restaurantWithoutImages = { ...restaurant, images: [] };

  firebase
    .firestore()
    .collection(`restaurants/users/${getCurrentUser()}`)
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
      .child(`images/users/${getCurrentUser()}/${documentId}/${img.name}`)
      .put(img);
  });
};

import firebase from "../firebase";

export default function (restaurant: Restaurant) {
  let restaurantWithoutImages = { ...restaurant, images: [] };

  firebase
    .firestore()
    .collection(`restaurants/users/n23qMAUSzDR5GcPgQmlarnK0Ok43`)
    .doc(restaurant.docId)
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
      .child(`images/users/n23qMAUSzDR5GcPgQmlarnK0Ok43/${restaurant.docId}/${img.name}`)
      .put(img);
  });
}

import firebase from "../firebase";
import omit from "lodash/omit";
import isEmpty from "lodash/isEmpty";
import isUndefined from "lodash/isUndefined";

export default function (restaurant: Restaurant) {
  const restaurantsToUpload = omit(restaurant, "images");
  console.log("adding restaurant", restaurant);
  let thumbnailImage = "";

  if (!isEmpty(restaurant.images) && !isUndefined(restaurant.images)) {
    let name = restaurant.images[0].name;
    thumbnailImage = `images/users/n23qMAUSzDR5GcPgQmlarnK0Ok43/${name}`;
  }

  firebase
    .firestore()
    .collection(`restaurants/users/n23qMAUSzDR5GcPgQmlarnK0Ok43`)
    .add({
      ...restaurantsToUpload,
      thumbnailImage,
    })
    .then((result) => {
      // TODO figure out if you can just return a restaurant object
      // directly from the result object instead of the docId hack.
      // The docId hack here is because adding a restaurant to state
      // without a docId won't let you delete it.
      // let newRestaurant = {
      //   ...restaurant,
      //   docId: result.id,
      //   thumbnailImage,
      // };
    });

  restaurant.images?.forEach((img: any) => {
    firebase
      .storage()
      .ref()
      .child(`images/users/n23qMAUSzDR5GcPgQmlarnK0Ok43/${img.name}`)
      .put(img);
  });
}

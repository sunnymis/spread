import firebase from "../firebase";
import omit from "lodash/omit";
import isEmpty from "lodash/isEmpty";
import isUndefined from "lodash/isUndefined";
import { Restaurant } from "../types/restaurant";
import getCurrentUser from "../util/getCurrentUser";

export default async function (restaurant: Restaurant) {
  await addToFirebase(restaurant);
}

const addToFirebase = async (restaurant: Restaurant) => {
  const restaurantsToUpload = omit(restaurant, "images");
  console.log("adding restaurant", restaurant);
  let thumbnailImage = "";

  if (!isEmpty(restaurant.images) && !isUndefined(restaurant.images)) {
    let name = restaurant.images[0].name;
    thumbnailImage = `images/users/${getCurrentUser()}/${name}`;
  }

  firebase
    .firestore()
    .collection(`restaurants/users/${getCurrentUser()}`)
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
    firebase.storage().ref().child(`images/users/${getCurrentUser()}/${img.name}`).put(img);
  });
};

import firebase from "../firebase";
import { Restaurant, RestaurantDTO } from "../types/restaurant";

export default async function (userId: string): Promise<RestaurantDTO[]> {
  const restaruants = await firebase.firestore().collection(`restaurants/users/${userId}`).get();

  return restaruants.docs.map((restaurantDocument) => {
    return {
      restaurant: restaurantDocument.data() as Restaurant,
      documentId: restaurantDocument.id,
    };
  });
}

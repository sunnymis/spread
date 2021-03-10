import { FormValues, Restaurant } from "../types/restaurant";

export default function (restaurant: Restaurant): FormValues {
  const restaurantWithoutFields = {
    ...restaurant,
    id: undefined,
    docId: undefined,
  };

  return {
    ...restaurantWithoutFields,
    tags: restaurant.tags.join(" "),
  };
}

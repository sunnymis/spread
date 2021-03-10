import { omit } from "lodash";
import { FormValues, Restaurant } from "../types/restaurant";

export default function (restaurant: Restaurant): FormValues {
  const restaurantWithoutFields = omit(restaurant, ["id", "docId"]);

  return {
    ...restaurantWithoutFields,
    tags: restaurant.tags.join(" "),
  };
}

import { FormValues, Restaurant } from "../types/restaurant";

export default function (restaurant: Restaurant): FormValues {
  return {
    ...restaurant,
    tags: restaurant.tags.join(" "),
  };
}

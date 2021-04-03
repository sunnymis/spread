import { FormValues, Restaurant } from "../types/restaurant";

export default function (formValues: FormValues): Restaurant {
  return {
    ...formValues,
    tags: formValues.tags.split(" "),
  };
}

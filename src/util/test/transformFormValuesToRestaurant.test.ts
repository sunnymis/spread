import { FormValues, Restaurant } from "../../types/restaurant";
import transformFormValuesToRestaurant from "../transformFormValuesToRestaurant";

describe("#transformFormValuesToRestaurant", () => {
  const formValues: FormValues = {
    name: "joes pizza",
    location: "greenwich village",
    rating: 5,
    description: "amazing pizza spot",
    tags: "pizza italian",
  };

  it("transforms the data correctly", () => {
    const result = transformFormValuesToRestaurant(formValues);

    expect(result).toEqual({
      name: "joes pizza",
      location: "greenwich village",
      rating: 5,
      description: "amazing pizza spot",
      tags: ["pizza", "italian"],
    });
  });
});

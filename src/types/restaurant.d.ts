interface Image {
  name: string;
  data: string;
}
interface Restaurant {
  name: string;
  location: string;
  rating: number;
  description: string;
  id?: string;
  // todo figure out a better way to handle the tags type
  // the form takes tags as a string so FormValues type must be a string
  // but on submit we pass the entire FormValues to the
  // addRestaurant function which expects a restaurant.
  // We modify the tags to be an array. So now tags is both
  // a string (in the form) an array of strings (for the restaurant) to go to firebase
  tags: string | string[];
  images?: File[] | Image[];
  docId?: string;
}

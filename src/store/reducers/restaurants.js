import { SET_RESTAURANTS, SET_RESTAURANT_IMAGES } from '../actions/restaurants';

export const restaurantsReducer = (restaurants = [], action) => {
  if (action.type === SET_RESTAURANTS) return action.payload;

  return restaurants;
};

export const selectedRestaurantImagesReducer = (images = [], action) => {
  if (action.type === SET_RESTAURANT_IMAGES) return action.payload;

  return images;
};

import { SET_RESTAURANTS } from '../actions/restaurants';

export const restaurantsReducer = (restaurants = [], action) => {
  if (action.type === SET_RESTAURANTS) return action.payload;

  return restaurants;
};

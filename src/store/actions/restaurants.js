export const SET_RESTAURANTS = 'SET_RESTAURANTS';
export const SET_RESTAURANT_IMAGES = 'SET_RESTAURANT_IMAGES';

export const setRestaurants = ({ payload }) => ({
  type: SET_RESTAURANTS,
  payload,
});

export const setRestaurantImages = ({ payload }) => ({
  type: SET_RESTAURANT_IMAGES,
  payload,
});

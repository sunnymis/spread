import {
  API_REQUEST,
  GET_RESTAURANTS,
  GET_RESTAURANT_IMAGES,
  DELETE_RESTAURANT,
} from '../actions/api';
import getRestaurants from './getRestaurants';
import getRestaurantImages from './getRestaurantImages';
import deleteRestaurant from './deleteRestaurant';

export const api = ({ dispatch }) => next => action => {
  next(action);

  if (action.type === API_REQUEST) {
    switch (action.request) {
      case GET_RESTAURANTS:
        getRestaurants(dispatch, action);
        break;
      case GET_RESTAURANT_IMAGES:
        getRestaurantImages(dispatch, action);
        break;
      case DELETE_RESTAURANT:
        deleteRestaurant(dispatch, action);
        break;
    }
  }
};

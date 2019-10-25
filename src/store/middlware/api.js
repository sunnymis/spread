import {
  API_REQUEST,
  GET_RESTAURANTS,
  GET_RESTAURANT_IMAGES,
} from '../actions/api';
import getRestaurants from './getRestaurants';
import getRestaurantImages from './getRestaurantImages';

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
    }
  }
};

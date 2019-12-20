import { useDispatch, useSelector } from 'react-redux';
import { toggleLoader } from '../../store/actions/ui';
import {
  setRestaurants,
  setRestaurantImages,
} from '../../store/actions/restaurants';
import {
  apiRequest,
  GET_RESTAURANTS,
  GET_RESTAURANT_IMAGES,
  DELETE_RESTAURANT,
} from '../../store/actions/api';

export const useRestaurantsActions = () => {
  const dispatch = useDispatch();
  const restaurants = useSelector(state => state.restaurants);

  const fetchRestaurants = () => {
    if (restaurants.length > 0) return;

    dispatch(
      toggleLoader({
        loaderVisible: true,
      })
    );

    dispatch(
      apiRequest({
        request: GET_RESTAURANTS,
        onSuccess: fetchRestaurantsSuccess,
      })
    );
  };

  const fetchRestaurantImages = docId => {
    dispatch(
      apiRequest({
        request: GET_RESTAURANT_IMAGES,
        onSuccess: fetchRestaurantImagesSuccess,
        meta: {
          docId,
        },
      })
    );
  };

  const deleteRestaurant = docId => {
    dispatch(
      apiRequest({
        request: DELETE_RESTAURANT,
        onSuccess: deleteRestaurantSuccess,
        meta: {
          docId,
        },
      })
    );
  };

  const fetchRestaurantsSuccess = restaurants => {
    dispatch(
      setRestaurants({
        payload: restaurants,
      })
    );
  };

  const fetchRestaurantImagesSuccess = images => {
    dispatch(
      setRestaurantImages({
        payload: images,
      })
    );
  };

  const deleteRestaurantSuccess = () => {
    dispatch(
      apiRequest({
        request: GET_RESTAURANTS,
        onSuccess: fetchRestaurantsSuccess,
      })
    );
  };

  return {
    fetchRestaurants,
    fetchRestaurantImages,
    deleteRestaurant,
  };
};

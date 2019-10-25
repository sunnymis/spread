import { useDispatch, useSelector } from 'react-redux';
import { toggleLoader } from '../../store/actions/ui';
import { setRestaurants } from '../../store/actions/restaurants';
import { apiRequest, GET_RESTAURANTS } from '../../store/actions/api';

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

  const fetchRestaurantsSuccess = restaurants => {
    dispatch(
      setRestaurants({
        payload: restaurants,
      })
    );
  };

  return {
    fetchRestaurants,
  };
};

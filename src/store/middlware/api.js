import { API_REQUEST, GET_RESTAURANTS } from '../actions/api';
import { toggleLoader } from '../actions/ui';
import firebase from 'firebase';

export const api = ({ dispatch }) => next => action => {
  next(action);

  if (action.type === API_REQUEST) {
    const { onSuccess } = action.meta;

    if (action.request === GET_RESTAURANTS) {
      const userId = localStorage.getItem('spreadUserId');

      firebase
        .firestore()
        .collection(`restaurants/users/${userId}`)
        .get()
        .then(snapshot => {
          const allRestaurants = snapshot.docs.map(r => ({
            ...r.data(),
            docId: r.id,
          }));

          dispatch(
            toggleLoader({
              loaderVisible: false,
              trigger: 'useRestaurantsActions',
            })
          );
          onSuccess(allRestaurants);
        });
      // add catch
    }
  }
};

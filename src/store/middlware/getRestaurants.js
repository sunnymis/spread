import { toggleLoader } from '../actions/ui';
import firebase from 'firebase';

export default function(dispatch, action) {
  const userId = localStorage.getItem('spreadUserId');
  const { onSuccess } = action.meta;

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

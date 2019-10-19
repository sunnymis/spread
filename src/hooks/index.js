import { useState, useEffect } from 'react';
import { firebase } from '../firebase';
import get from 'lodash/get';

export const useRestaurants = selectedRestaurant => {
  const [restaurants, setRestaurants] = useState([]);

  useEffect(() => {
    console.log('rerunning useRestaurnts');
    const userId = localStorage.getItem('spreadUserId');

    console.log('userId', userId);
    firebase
      .firestore()
      .collection(`restaurants/users/${userId}`)
      .get()
      .then(snapshot => {
        console.log(snapshot);
        const allRestaurants = snapshot.docs.map(r => ({
          ...r.data(),
          docId: r.id,
        }));

        console.log('fetched data');
        if (JSON.stringify(allRestaurants) !== JSON.stringify(restaurants)) {
          console.log('data changed');
          setRestaurants(allRestaurants);
        }
      });
  }, [restaurants]);

  return { restaurants, setRestaurants };
};

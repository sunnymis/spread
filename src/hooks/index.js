import { useState, useEffect } from 'react';
import { firebase } from '../firebase';
import get from 'lodash/get';

export const useRestaurants = selectedRestaurant => {
  const [restaurants, setRestaurants] = useState([]);

  useEffect(() => {
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

        if (JSON.stringify(allRestaurants) !== JSON.stringify(restaurants)) {
          setRestaurants(allRestaurants);
        }
      });
  }, [restaurants]);

  return { restaurants, setRestaurants };
};

import { useState, useEffect } from 'react';
import { firebase } from '../firebase';

export const useRestaurants = selectedRestaurant => {
  const [restaurants, setRestaurants] = useState([]);


  useEffect(() => {
    console.log('rerunning useRestaurnts');
    const restaurantsFromDb = firebase
      .firestore()
      .collection('restaurants')
      .get()
      .then((snapshot) => {
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
}

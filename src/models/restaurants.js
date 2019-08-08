import { Firebase, FirebaseRef } from '../lib/firebase';
import initState from '../store/restaurants';

export default {
  state: {
    restaurants: initState.restaurants,
  },
  reducers: {
    replaceRestaurants(state, payload) {
      let restaurants = [];
      // Pick out the props I need
      if (payload && typeof payload === 'object') {
        restaurants = payload.map(item => ({
          id: item.id,
          title: item.title,
          description: item.description,
          tags: item.tags,
          image: item.image,
          stars: item.stars,
        }));
      }

      return { ...state, restaurants };
    },
  },
  effects: () => ({
    getRestaurants() {
      if (Firebase === null) return () => new Promise(resolve => resolve());

      return new Promise(resolve => FirebaseRef.child('restaurants')
        .on('value', (snapshot) => {
          const data = snapshot.val() || [];
          console.log('daaattaa', data);
          this.replaceRestaurants(data);
          return resolve();
        })).catch((err) => { throw err.message; });
    },
  }),
};

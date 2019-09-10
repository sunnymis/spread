import React from 'react';
import { useRestaurants } from '../../hooks';
import { Link } from "react-router-dom";

export default function RestaurantList(props) {
  const { restaurants, setRestaurants } = useRestaurants();
  
  return (
    <div>
      <h1>Restaurant List</h1>
      {
        restaurants.map(r => (
          <Link to={{
            pathname: '/restaurants/one',
            state: {
              ...r
            }
          }}>
            {r.name}
          </Link>
        ))
      }
    </div>
  )
}

const handleOnNavigationBack = (newRestaurant) => {
  // TOOD - figure out how to refresh the list of restaurants 
  // when you navigate back to list after adding new restaurant
  console.log('handleonnavigaitonback')
}

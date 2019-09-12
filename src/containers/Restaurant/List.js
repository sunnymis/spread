import React from 'react';
import { useRestaurants } from '../../hooks';
import { Link } from "react-router-dom";
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';


export default function RestaurantList(props) {
  const { restaurants, setRestaurants } = useRestaurants();

  function goToDetailsView(restaurant) {
    props.history.push('/restaurants/one', restaurant);
  }
  
  return (
    <div>
      <h1>Restaurant List</h1>
      <List component="nav" aria-label="secondary mailbox folder">
      {
        restaurants.map(r => (
          <div>
            <ListItem
            button
              selected={false}
              onClick={event => goToDetailsView(r)}
            >
              <ListItemText primary={r.name} />
            </ListItem>            
            <Divider variant="middle" component="li" />
          </div>
        ))
      }
      </List>
    </div>
  )
}

const handleOnNavigationBack = (newRestaurant) => {
  // TOOD - figure out how to refresh the list of restaurants 
  // when you navigate back to list after adding new restaurant
  console.log('handleonnavigaitonback')
}

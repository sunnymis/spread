import React from 'react';
import { styled } from '@material-ui/styles';
import List from '@material-ui/core/List';
import ListItem from '../../components/ListItem';
import Divider from '@material-ui/core/Divider';
import { useRestaurants } from '../../hooks';

export default function RestaurantList(props) {
  const { restaurants } = useRestaurants();

  function goToDetailsView(restaurant) {
    props.history.push('/restaurants/one', restaurant);
  }

  const H1 = styled('h1')({
    paddingLeft: '16px',
  });

  return (
    <div>
      <H1>Restaurants</H1>
      <List>
        {restaurants.map(r => (
          <div>
            <ListItem
              rating={r.rating}
              text={r.name}
              tags={r.tags}
              image={r.photos && r.photos[0]}
              onClick={event => goToDetailsView(r)}
            />
            <Divider variant="middle" component="li" />
          </div>
        ))}
      </List>
    </div>
  );
}

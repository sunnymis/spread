import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { styled } from '@material-ui/styles';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import ListItem from '../../components/ListItem';
import FormModal from './FormModal';
import { useRestaurantsActions } from '../../hooks/commands/useRestaurantsActions';

export default function RestaurantList(props) {
  const [open, setOpen] = useState(false);
  const { fetchRestaurants } = useRestaurantsActions();
  const restaurants = useSelector(state => state.restaurants);

  useEffect(() => {
    fetchRestaurants();
  }, []);

  function goToDetailsView(restaurant) {
    props.history.push('/restaurants/one', restaurant);
  }

  const handleOnAddClick = () => {
    setOpen(true);
  };

  const handleOnClose = () => {
    setOpen(false);
  };

  const H1 = styled('h1')({
    paddingLeft: '16px',
  });

  const StyledFab = styled(Fab)({
    position: 'fixed',
    bottom: '24px',
    right: '24px',
  });

  const getImage = restaurant => {
    if (!restaurant.images || restaurant.images.length === 0) {
      return null;
    }

    return restaurant.images[0].data;
  };

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
              image={getImage(r)}
              onClick={event => goToDetailsView(r)}
            />
            <Divider variant="middle" component="li" />
          </div>
        ))}
      </List>
      <StyledFab color="primary" onClick={handleOnAddClick}>
        <AddIcon />
      </StyledFab>
      <FormModal
        title="Add New Restaurant"
        open={open}
        onClose={handleOnClose}
      />
    </div>
  );
}

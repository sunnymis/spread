import React from 'react';
import PropTypes from 'prop-types';
import { Image } from 'react-native';
import {
  Container,
  Content,
  Card,
  CardItem,
  Body,
  H3,
  List,
  ListItem,
  Text,
  Header,
  Left,
  Right,
  Button,
  Icon,
  Title,
} from 'native-base';
import { errorMessages } from '../../../constants/messages';
import Error from '../UI/Error';
import Spacer from '../UI/Spacer';

const RestaurantView = ({ error, restaurants, restaurantId, }) => {
  console.log('RESTAURANTS', restaurants)
  // Error
  if (error) return <Error content={`Error is: ${error}`} />;

  // Get this restaurant from all restaurants
  let restaurant = null;
  if (restaurantId && restaurants) {
    restaurant = restaurants.find(item => parseInt(item.id, 10) === parseInt(restaurantId, 10));
  }

  // Restaurant not found
  if (!restaurant) return <Error content={`Error is: ${errorMessages.notFound}` } />;

  // Build Ingredients listing
  const ingredients = Object.keys(restaurant.tags).map(item => (
    <ListItem key={item} rightIcon={{ style: { opacity: 0 } }}>
      <Text>{item}</Text>
    </ListItem>
  ));

  return (
    <Container>
      <Header>
        <Left>
          <Button transparent>
            <Icon name="arrow-back" />
          </Button>
        </Left>
        <Body>
          <Title>Header</Title>
        </Body>
        <Right>
          <Button transparent>
            <Icon name="menu" />
          </Button>
        </Right>
      </Header>
      <Content padder>
        
        <Image source={{ uri: restaurant.image }} style={{ height: 300, width: null, flex: 1 }} />

        <Spacer size={25} />
        <H3>{restaurant.title}</H3>
        <Text>
          by
          {' '}
          {restaurant.author}
        </Text>
        <Spacer size={15} />

        <Card>
          <CardItem header bordered>
            <Text>About this restaurant</Text>
          </CardItem>
          <CardItem>
            <Body>
              <Text>{restaurant.description}</Text>
            </Body>
          </CardItem>
        </Card>

        <Card>
          <CardItem header bordered>
            <Text>Tags</Text>
          </CardItem>
          <CardItem>
            <Content>
              <List>{ingredients}</List>
            </Content>
          </CardItem>
        </Card>
        <Spacer size={20} />
      </Content>
    </Container>
  );
};

RestaurantView.propTypes = {
  error: PropTypes.string,
  restaurantId: PropTypes.string.isRequired,
  restaurants: PropTypes.arrayOf(PropTypes.shape()).isRequired,
};

RestaurantView.defaultProps = {
  error: null,
};

export default RestaurantView;

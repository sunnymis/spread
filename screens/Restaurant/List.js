import React from 'react';
import { ScrollView, TouchableOpacity, Text } from 'react-native';
import {
  H1,
  H2,
  Card,
  CardItem,
  Body,
  Container,
  Header,
  Left,
  Button,
  Icon,
  Right,
  Title,
} from 'native-base';
import { useRestaurants } from '../../hooks';

export default function RestaurantList(props) {
  const { restaurants, setRestaurants } = useRestaurants();
  return (
    <ScrollView>
      <Container>
        <H1>Restaurant List</H1>
        {
          restaurants.map(r => (
            <TouchableOpacity
              key={r.name}
              onPress={() => props.navigation.navigate('Restaurant', { details: r })} >
              <Card>
                <CardItem>
                  <Body>
                    <H2 >{r.name}</H2>
                  </Body>
                </CardItem>
              </Card>
            </TouchableOpacity>
          ))
        }
      </Container>
    </ScrollView>
  )
}

const handleOnNavigationBack = (newRestaurant) => {
  // TOOD - figure out how to refresh the list of restaurants 
  // when you navigate back to list after adding new restaurant
  console.log('handleonnavigaitonback')
}

const LeftIcon = (navigation) => {
  return (
    <Button onPress={() => navigation.goBack()} transparent>
      <Icon style={{fontSize: 40, color: '#fff' }} name="arrow-back" />
    </Button>
  );
};

const RightIcon = (navigation) => {
  return (
   <Button onPress={() => navigation.navigate('AddNewRestaurant', { onNavigationBack: handleOnNavigationBack })} transparent>
      <Icon style={{fontSize: 40, color: '#fff' }} name="add" />
    </Button>
  );
};

RestaurantList.navigationOptions = (props) => {
  const {
    navigation
  } = props;
  return {
    headerLeft: LeftIcon(navigation),
    headerRight: RightIcon(navigation),
  }
}

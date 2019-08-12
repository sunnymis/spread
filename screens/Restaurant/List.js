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

export default function RestaurantList(props) {
  return (
    <ScrollView>
      <Container>

        <H1>Restaurant List</H1>

        <TouchableOpacity onPress={() => props.navigation.navigate('Restaurant')} >
          <Card>
            <CardItem>
              <Body>
                <H2 >Restaurants</H2>
              </Body>
            </CardItem>
          </Card>
        </TouchableOpacity>
      </Container>
     
    </ScrollView>
  )
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
    <Button onPress={() => navigation.navigate('AddNewRestaurant')} transparent>
      <Icon style={{fontSize: 40, color: '#fff' }} name="add" />
    </Button>
  );
};

RestaurantList.navigationOptions = ({ navigation }) => {
  return {
    headerLeft: LeftIcon(navigation),
    headerRight: RightIcon(navigation),
  }
}

import React from 'react';
import { ScrollView, TouchableOpacity } from 'react-native';
import {
  H1,
  H2,
  Card,
  CardItem,
  Body,
} from 'native-base';

export default function RestaurantList(props) {
  return (
    <ScrollView>
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
    </ScrollView>
  )
}

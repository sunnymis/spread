import React from 'react';
import { createAppContainer, createStackNavigator } from 'react-navigation';

import HomeScreen from '../screens/HomeScreen';
import LinksScreen from '../screens/LinksScreen';
import RestaurantsList from '../screens/Restaurant/List';
import RestaurantSingle from '../screens/Restaurant/Single';
import AddNewRestaurant from '../screens/AddNewRestaurant';

export default createAppContainer(
  createStackNavigator({
    Home: HomeScreen,
    Links: LinksScreen,
    Restaurants: RestaurantsList,
    Restaurant: RestaurantSingle,
    AddNewRestaurant,
  },
  {
    initialRouteName: 'Home',
    defaultNavigationOptions: {
      headerStyle: {
        height: 100,
        backgroundColor: '#00AEFF',
        color: '#fff',
      },
      headerTintColor: '#fff',
    },
  }),
);

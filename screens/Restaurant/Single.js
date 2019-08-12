import React from 'react';
import { ScrollView, TouchableOpacity, Image } from 'react-native';
import {
  H1,
  Button,
  Icon,
} from 'native-base';

export default function Restaurant(props) {
  return (
    <ScrollView>
      <H1>Restaurant</H1>
      <Image
        style={{width: 100, height: 100 }}
        source={{ uri: 'https://images.unsplash.com/photo-1559978137-8c560d91e9e1?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9' }}
      />
      <Image
        style={{width: 50, height: 50 }}
        source={{uri: 'https://facebook.github.io/react-native/img/tiny_logo.png'}}
      />
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
    <Button onPress={() => navigation.navigate('EditRestaurant')} transparent>
      <Icon style={{fontSize: 30, color: '#fff' }} type="MaterialIcons" name="edit" />
    </Button>
  );
};

Restaurant.navigationOptions = ({ navigation }) => {
  return {
    headerLeft: LeftIcon(navigation),
    headerRight: RightIcon(navigation),
  }
}

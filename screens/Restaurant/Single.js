import React from 'react';
import { ScrollView, TouchableOpacity, Image } from 'react-native';
import {
  H1,
  H2,
  Button,
  Icon,
  Text,
} from 'native-base';

export default function Restaurant(props) {
  const {
    name,
    location,
    tags,
  } = props.navigation.state.params.details

  return (
    <ScrollView>
      <H1>{name}</H1>
      <H2>{location}</H2>
        {
          tags.map((t,i) => <Text key={i}>{t}</Text>)
        }
      <Image
        style={{width: 100, height: 100 }}
        source={{ uri: 'https://images.unsplash.com/photo-1559978137-8c560d91e9e1?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9' }}
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

import React from 'react';
import { ScrollView, TouchableOpacity } from 'react-native';
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
  Text,
  Title,
} from 'native-base';

export default function EditRestaurant(props) {
  return (
    <ScrollView>
      <Container>
        <H1>Edit Restaurant</H1>
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
    <Button hasText transparent>
      <Text>Cancel</Text>
    </Button>
  );
};


EditRestaurant.navigationOptions = ({ navigation }) => {
  return {
    headerLeft: LeftIcon(navigation),
    headerRight: RightIcon(navigation),
  }
}

import React from 'react';
import { ScrollView, TouchableOpacity, Image, View } from 'react-native';
import {
  H1,
  H2,
  Button,
  Icon,
  Text,
  Container,
} from 'native-base';
import { useRestaurants } from '../../hooks';
import { firebase } from '../../firebase';

export default function Restaurant(props) {
  const { restaurants, setRestaurants } = useRestaurants();
  const {
    name,
    location,
    description,
    tags,
    docId,
  } = props.navigation.state.params.details

  const deleteRestaurant = () => {
    firebase
      .firestore()
      .collection('restaurants')
      .doc(docId)
      .delete()
      .then(() => {
        setRestaurants([...restaurants])
      })
  }

  return (
    <ScrollView>
      <H1>{name}</H1>
      <H2>{location}</H2>
        {
          tags && (tags.map((t,i) => <Text key={i}>{t}</Text>))
        }
      <H2>{description}</H2>
      <Image
        style={{width: 100, height: 100 }}
        source={{ uri: 'https://images.unsplash.com/photo-1559978137-8c560d91e9e1?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9' }}
      />
      <Button onPress={() => deleteRestaurant()} transparent>
        <Icon style={{fontSize: 30, color: '#000' }} type="MaterialIcons" name="delete" />
      </Button>
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
    <View>
      <Button onPress={() => navigation.navigate('EditRestaurant', { details: navigation.state.params.details })} transparent>
        <Icon style={{fontSize: 30, color: '#fff' }} type="MaterialIcons" name="edit" />
      </Button>
      <Button onPress={() => deleteRestaurant(navigation.state.params)} transparent>
        <Icon style={{fontSize: 30, color: '#fff' }} type="MaterialIcons" name="delete" />
      </Button>
    </View>
  );
};

Restaurant.navigationOptions = ({ navigation }) => {
  return {
    headerLeft: LeftIcon(navigation),
    headerRight: RightIcon(navigation),
  }
}

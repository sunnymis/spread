import React, { useState } from 'react';
import { ScrollView, TouchableOpacity } from 'react-native';
import {
  H1,
  Form,
  Input,
  Label,
  Container,
  Button,
  Icon,
  Text,
  Item,
  CheckBox,
  ListItem,
  Body,
} from 'native-base';
import firebase from 'firebase'
import '@firebase/firestore';
import { useRestaurants } from '../../hooks';


export default function AddNewRestaurant(props) {
  const [name, setName] = useState("");
  const [location, setLocation] = useState("");
  const [description, setDescription] = useState("");
  const [tags, setTags] = useState([])
  const { restaurants, setRestaurants } = useRestaurants()

  const hasTag = (tag) => tags.includes(tag)
  const toggleTag = (tag) => {
    if (hasTag(tag)) {
      setTags(tags.filter(t => t != tag))
    } else {
      setTags([
        ...tags,
        tag
      ])
    }
  }

  const database = firebase.firestore();

  const submit = () => {
    const restaurantCollection = database.collection('restaurants');
    const newRestaurant = {
      name,
      location,
      description,
      tags,
    }
    restaurantCollection.add(newRestaurant)
    .then(() => {
      setName("");
      setLocation("");
      setDescription("");
      setTags([]);
      console.log(props.navigation.state.params)
      setRestaurants([
        ...restaurants,
        newRestaurant,
      ])
      props.navigation.state.params.onNavigationBack(newRestaurant)
      props.navigation.goBack()
    });
  };

  return (
    <ScrollView>
      <Container>
        <H1>Add New Restaurant</H1>
        <Form>
          <Item floatingLabel>
            <Label>Name</Label>
            <Input
              onChangeText={(name) => setName(name)}
              value={name}
            />
          </Item>
          <Item floatingLabel last>
            <Label>Location</Label>
            <Input
              onChangeText={(location) => setLocation(location)}
              value={location}
            />
          </Item>
          <Item floatingLabel last>
            <Label>Description</Label>
            <Input
              onChangeText={(description) => setDescription(description)}
              value={description}
            />
          </Item>
          <ListItem onPress={() => toggleTag("pizza")}>
            <CheckBox checked={hasTag("pizza")} />
            <Body>
              <Text>Pizza</Text>
            </Body>
          </ListItem>
          <ListItem onPress={() => toggleTag("burgers")}>
            <CheckBox checked={hasTag("burgers")} />
            <Body>
              <Text>Burgers</Text>
            </Body>
          </ListItem>
          <Button onPress={() => submit()}>
            <Text>Click Me!</Text>
          </Button>
        </Form>
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


AddNewRestaurant.navigationOptions = ({ navigation }) => {
  return {
    headerLeft: LeftIcon(navigation),
    headerRight: RightIcon(navigation),
  }
}

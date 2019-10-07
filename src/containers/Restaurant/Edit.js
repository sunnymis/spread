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
import { firebase } from '../../firebase';
import { useRestaurants } from '../../hooks';

export default function EditRestaurant(props) {
  const details = props.navigation.state.params.details;
  const [name, setName] = useState(details.name);
  const [location, setLocation] = useState(details.location);
  const [description, setDescription] = useState(details.description);
  const [tags, setTags] = useState(details.tags || []);
  const docId = details.docId;
  const { restaurants, setRestaurants } = useRestaurants();

  const hasTag = tag => {
    if (!tags) {
      return false;
    }
    return tags.includes(tag);
  };
  const toggleTag = tag => {
    if (hasTag(tag)) {
      setTags(tags.filter(t => t != tag));
    } else {
      setTags([...tags, tag]);
    }
  };

  const submit = () => {
    firebase
      .firestore()
      .collection('restaurants')
      .doc(docId)
      .update({
        name,
        location,
        description,
        tags,
      })
      .then(() => {
        setName(name);
        setLocation(location);
        setDescription(description);
        setTags(tags);
        setRestaurants([...restaurants]);
        props.navigation.state.params.onNavigationBack(newRestaurant);
        props.navigation.goBack();
      });
  };

  return (
    <ScrollView>
      <Container>
        <H1>Add New Restaurant</H1>
        <Form>
          <Item floatingLabel>
            <Label>Name</Label>
            <Input onChangeText={name => setName(name)} value={name} />
          </Item>
          <Item floatingLabel last>
            <Label>Location</Label>
            <Input
              onChangeText={location => setLocation(location)}
              value={location}
            />
          </Item>
          <Item floatingLabel last>
            <Label>Description</Label>
            <Input
              onChangeText={description => setDescription(description)}
              value={description}
            />
          </Item>
          <ListItem onPress={() => toggleTag('pizza')}>
            <CheckBox checked={hasTag('pizza')} />
            <Body>
              <Text>Pizza</Text>
            </Body>
          </ListItem>
          <ListItem onPress={() => toggleTag('burgers')}>
            <CheckBox checked={hasTag('burgers')} />
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
  );
}

const LeftIcon = navigation => {
  return (
    <Button onPress={() => navigation.goBack()} transparent>
      <Icon style={{ fontSize: 40, color: '#fff' }} name="arrow-back" />
    </Button>
  );
};

const RightIcon = navigation => {
  return (
    <Button onPress={() => navigation.goBack()} hasText transparent>
      <Text>Cancel</Text>
    </Button>
  );
};

EditRestaurant.navigationOptions = ({ navigation }) => {
  return {
    headerLeft: LeftIcon(navigation),
    headerRight: RightIcon(navigation),
  };
};

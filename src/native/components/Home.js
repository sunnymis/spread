import React from 'react';
import {
  Container, Content, H2, Card, CardItem, 
} from 'native-base';
import { Actions } from 'react-native-router-flux';
import { TouchableOpacity } from 'react-native';
import Spacer from './UI/Spacer';

const onPress = item => Actions.restaurants({ params: item });

const Home = () => {
  const cards = () => {
    const categories = [
      'Restaurant',
      'Travel',
      'TV/Movies',
      'Concerts',
      'Recipes',
      'Activities',
    ];

    return categories.map(c => (
      <TouchableOpacity key={c} onPress={() => onPress(c)} style={{ flex: 1 }}>
        <Card>
          <CardItem>
            <H2>{c}</H2>
          </CardItem>
        </Card>
      </TouchableOpacity>
    ));
  };

  return (
    <Container>
      <Content padder>
        <Spacer size={30} />
      
        <Container>
          {cards()}
        </Container>
        
      </Content>
    </Container>
  );
};

export default Home;

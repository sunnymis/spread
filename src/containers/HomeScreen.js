import React from 'react';
import styled from 'styled-components/macro'


export default function HomeScreen(props) {
  return (
    <div>
      <div>
        <div onClick={() => console.log('Restaurants')}>
          <Title>Restaurants</Title>
        </div>
      </div>
    </div>
  );
}

const Title = styled.h1`
  font-size: 1.5em;
  text-align: center;
  color: palevioletred;
`;



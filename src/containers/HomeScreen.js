import React from 'react';
import { styled } from '@material-ui/styles';
import Grid from '@material-ui/core/Grid';
import CategoryCard from '../components/CategoryCard';
import { CATEGORIES } from './constants';
import AppBar from '../components/AppBar';

const StyledHomeScreen = styled('div')({
  flexGrow: 1,
  padding: '48px',
});

export default function HomeScreen(props) {
  return (
    <React.Fragment>
      <AppBar {...props} />
      <StyledHomeScreen>
        <Grid container spacing={3} direction="row" flexWrap="wrap">
          {CATEGORIES.map(category => (
            <Grid item xs={6} sm={6}>
              <CategoryCard
                title={category.title}
                background={category.background}
              />
            </Grid>
          ))}
        </Grid>
      </StyledHomeScreen>
    </React.Fragment>
  );
}

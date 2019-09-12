import React from 'react';
import styled from 'styled-components/macro'
import { makeStyles } from '@material-ui/core/styles';

import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import { Link } from "react-router-dom";

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
}));

export default function HomeScreen(props) {
  const classes = useStyles();


  return (
    <div className={classes.root}>
      <Grid container spacing={3}
      container
      direction="row"
      flexWrap="wrap"
      >
        <Grid
        flexBasis="calc(50% - 40px)" 
        justifyContent="center"
        flexDirection="column"
        item xs={12} sm={6}>
          <Link to={{
            pathname: '/restaurants/',
          }}>
            <Paper className={classes.paper}>Restaurants</Paper>
          </Link>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Paper className={classes.paper}>TV/Movies</Paper>
        </Grid>        
      </Grid>
    </div>

  );
}

const Title = styled.h1`
  font-size: 1.5em;
  text-align: center;
  color: palevioletred;
`;



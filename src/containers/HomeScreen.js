import React from 'react';
import classnames from 'classnames';
import styled from 'styled-components/macro'
import { makeStyles } from '@material-ui/core/styles';

import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import { Link } from "react-router-dom";

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    padding: theme.spacing(6),
  },
  paper: {
    paddingTop: theme.spacing(10),
    paddingBottom: theme.spacing(10),
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(2),
    textAlign: 'center',
    color: '#fff',
    fontWeight: 'bold',
    background: 'linear-gradient(45deg, #FF8E53 30%,#FE6B8B  90%)',
  },
  paperTwo: {
    background: 'linear-gradient(45deg, rgb(33, 150, 243) 30%, rgb(33, 203, 243) 90%)'
  },
  paperThree: {
    background: 'linear-gradient(45deg, #30cfd0 0%, #330867 100%)',
  },
  paperFour: {
    background:'linear-gradient(45deg, #43e97b 0%, #38f9d7 100%)',
  },
  link: {
    textDecoration: 'none',
  },
}));

export default function HomeScreen(props) {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Grid
        container
        spacing={3}
        direction="row"
        flexWrap="wrap"
      >
        <Grid
          item
          xs={6}
          sm={6}
        >
          <Link to={{
            pathname: '/restaurants/',
          }}
          className={classes.link}
          >
            <Paper elevation={10} elevation={10} className={classes.paper}>Restaurants</Paper>
          </Link>
        </Grid>
        <Grid 
          item
          xs={6}
          sm={6}
        >
          <Paper elevation={10} className={classnames(classes.paper, classes.paperTwo)}>TV/Movies</Paper>
        </Grid>        
        <Grid 
          item
          xs={6}
          sm={6}
        >
          <Paper elevation={10} className={classnames(classes.paper, classes.paperThree)}>Recipes</Paper>
        </Grid>        
        <Grid 
          item
          xs={6}
          sm={6}
        >
          <Paper elevation={10}  className={classnames(classes.paper, classes.paperFour)}>Activites</Paper>
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



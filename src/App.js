import React from 'react';
import HomeScreen from './containers/HomeScreen';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { createBrowserHistory } from 'history';
import RestaurantList from './containers/Restaurant/List';
import RestaurantSingle from './containers/Restaurant/Single';
import { AppBar } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';

function App() {
  const useStyles = makeStyles(theme => ({
    root: {
      flexGrow: 1,
    },
    menuButton: {
      marginRight: theme.spacing(2),
    },
    title: {
      flexGrow: 1,
    },
    appBar: {
      backgroundColor: '#00AEFF',
    },
  }));

  const classes = useStyles();

  return (
    <Router history={createBrowserHistory()}>
      <div>
        <AppBar position="static" className={classes.appBar}>
          <Toolbar>
            <IconButton
              edge="start"
              className={classes.menuButton}
              color="inherit"
              aria-label="menu"
            >
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" className={classes.title}>
              Spread
            </Typography>
            <Button color="inherit">Login</Button>
          </Toolbar>
        </AppBar>

        <Switch>
          <Route path="/" exact component={HomeScreen} />
          <Route exact path="/restaurants/" component={RestaurantList} />
          <Route exact path="/restaurants/one" component={RestaurantSingle} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;

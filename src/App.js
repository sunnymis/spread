import React, { useState } from 'react';
import HomeScreen from './containers/HomeScreen';
import LogIn from './containers/LogIn';
import { Router, Route, Switch, Redirect } from 'react-router-dom';
import { createBrowserHistory } from 'history';
import RestaurantList from './containers/Restaurant/List';
import RestaurantSingle from './containers/Restaurant/Single';

import firebase from 'firebase';

function App() {
  const [loggedIn] = useState(false);

  const userLoggedIn = () => {
    console.log('firebase.auth().currentUser', firebase.auth().currentUser);
    return localStorage.getItem('spreadUserId') !== null;
  };

  const PrivateRoute = ({ children, component, ...rest }) => {
    console.log('component', component);
    console.log('userLoggedIn()', userLoggedIn());
    return userLoggedIn() ? (
      <Route component={component} {...rest} />
    ) : (
      <Redirect
        to={{
          pathname: '/login',
        }}
        {...rest}
      />
    );
  };

  return (
    <Router history={createBrowserHistory()}>
      <div>
        <Switch>
          <Route path="/login" exact component={LogIn} />
          <PrivateRoute path="/" exact component={HomeScreen} />
          <PrivateRoute exact path="/restaurants/" component={RestaurantList} />
          <PrivateRoute
            exact
            path="/restaurants/one"
            component={RestaurantSingle}
          />
        </Switch>
      </div>
    </Router>
  );
}

export default App;

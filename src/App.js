import React, { useState, useContext, useEffect } from 'react';
import HomeScreen from './containers/HomeScreen';
import LogIn from './containers/LogIn';
import { Router, Route, Switch, Redirect } from 'react-router-dom';
import { createBrowserHistory } from 'history';
import RestaurantList from './containers/Restaurant/List';
import RestaurantSingle from './containers/Restaurant/Single';
import firebase from 'firebase';

import { AuthContext } from './containers/Auth';

function App(props) {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        setCurrentUser(user);
        setLoading(false);
      } else {
        setCurrentUser(null);
        setLoading(false);
      }
    });
  }, [currentUser]);

  const PrivateRoute = ({ component: Component, user, ...rest }) => {
    console.log('context', user);
    return (
      <Route
        {...rest}
        render={props =>
          user ? (
            <Component {...props} {...rest} />
          ) : (
            <Redirect to={{ pathname: '/login' }} />
          )
        }
      />
    );
  };

  console.log('currentUser  ', currentUser);
  return loading ? (
    <h1>LOADING</h1>
  ) : (
    <AuthContext.Provider value={{ currentUser }}>
      <AuthContext.Consumer>
        {({ currentUser: cu }) => (
          <Router history={createBrowserHistory()}>
            <Switch>
              <PrivateRoute user={cu} path="/" exact component={HomeScreen} />
              <PrivateRoute
                exact
                path="/restaurants/"
                component={RestaurantList}
              />
              <PrivateRoute
                exact
                path="/restaurants/one"
                component={RestaurantSingle}
              />
              <Route path="/login" exact component={LogIn} />
            </Switch>
          </Router>
        )}
      </AuthContext.Consumer>
    </AuthContext.Provider>
  );
}

export default App;

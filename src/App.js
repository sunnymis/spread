import React, { useState, useContext, useEffect } from 'react';
import HomeScreen from './containers/HomeScreen';
import Login from './containers/Login/index';
import { Router, Route, Switch, Redirect } from 'react-router-dom';
import { createBrowserHistory } from 'history';
import RestaurantList from './containers/Restaurant/List';
import RestaurantSingle from './containers/Restaurant/Single';
import firebase from 'firebase';
import { useLoading } from './hooks/queries/useUI';

import { AuthContext } from './containers/Auth';

function App(props) {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const reduxLoading = useLoading();

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

  return reduxLoading ? (
    <h1>REDUX LOADING</h1>
  ) : loading ? (
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
                user={cu}
                path="/restaurants/"
                component={RestaurantList}
              />
              <PrivateRoute
                exact
                user={cu}
                path="/restaurants/one"
                component={RestaurantSingle}
              />
              <Route path="/login" user={cu} exact component={Login} />
            </Switch>
          </Router>
        )}
      </AuthContext.Consumer>
    </AuthContext.Provider>
  );
}

export default App;

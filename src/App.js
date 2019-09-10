import React from 'react';
import HomeScreen from './containers/HomeScreen';
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";
import { createBrowserHistory } from "history";
import RestaurantList from './containers/Restaurant/List';
import RestaurantSingle from './containers/Restaurant/Single';

import { firebase } from './firebase';

function App() {
  console.log(firebase)
  return (
    <Router history={createBrowserHistory()}>
      <div>
        <nav>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/restaurants/">Restaurants</Link>
            </li>
            <li>
              <Link to="/users/">Users</Link>
            </li>
          </ul>
        </nav>

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

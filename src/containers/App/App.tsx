import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";

import Restaurants from "../Restaurants";
import RestaurantDetails from "../Restaurants/Details";

const App: React.FC = () => {
  return (
    <div>
      <Router>
        <Switch>
          <Route exact path="/restaurants">
            <Restaurants />
          </Route>
          <Route path="/restaurants/:id">
            <RestaurantDetails />
          </Route>
        </Switch>
      </Router>
    </div>
  );
};

export default App;

// todo create a no match 404 page

import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import Restaurants from "../Restaurants";
import Home from "../Home";
import RestaurantDetails from "../Restaurants/Details";

const App: React.FC = () => {
  return (
    <div>
      <Router>
        <Switch>
          <Route exact path="/">
            <Home />
          </Route>
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

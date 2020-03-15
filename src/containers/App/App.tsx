import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";

import Restaurants from "../Restaurants";

const App: React.FC = () => {
  return (
    <div>
      <Router>
        <Switch>
          <Route path="/restaurants">
            <Restaurants />
          </Route>
        </Switch>
      </Router>
    </div>
  );
};

export default App;

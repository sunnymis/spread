import React from "react";
import "./App.css";
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";

import Restaurants from "../Restaurants";

const App: React.FC = () => {
  return (
    <div className="App">
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

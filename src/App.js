import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Messenger from "./pages/messenger/Messenger";
import Home from "./pages/home/Home";

export default class App extends React.Component {
  render() {
    return (
      <Router>
        <Switch>
          <Route path="/chat">
            <Messenger />
          </Route>
          <Route path="/">
            <Home />
          </Route>
        </Switch>
      </Router>
    );
  }
}

import React from "react";
import './App.css';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Messenger from "./pages/messenger/Messenger";
import Home from "./pages/home/Home";

import AppBar from "./components/navbar/NavBar";

import { createMuiTheme } from "@material-ui/core/styles";
import { ThemeProvider } from "@material-ui/styles";

const theme = createMuiTheme({
  palette: {
    primary: {
      // Purple and green play nicely together.
      main: "#ffffff",
    },
    secondary: {
      // This is green.A700 as hex.
      main: "#6800b3",
    },
  },
});

export default class App extends React.Component {
  render() {
    return (
      <ThemeProvider theme={theme}>
        <div className="App">
          <AppBar />
          <div className="Router">
            <Router>
              <Switch>
                <Route path="/chat">
                  <Messenger />
                </Route>
                <Route path="/chat/:roomId">
                  <Messenger />
                </Route>
                <Route path="/">
                  <Home />
                </Route>
              </Switch>
            </Router>
          </div>
        </div>
      </ThemeProvider>
    );
  }
}

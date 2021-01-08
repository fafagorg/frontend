import React from "react";
import './App.css';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import * as ROUTES from "./constants/routes";
import Messenger from "./pages/messenger/Messenger";
import Home from "./pages/home/Home";

import NavBar from "./components/navigation/NavBar";

import { createMuiTheme } from "@material-ui/core/styles";
import { ThemeProvider } from "@material-ui/styles";
import {withHistory} from "./components/navigation/history";


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

class App extends React.Component {
  render() {
    console.log(this.props)
    return (
      <ThemeProvider theme={theme}>
        <div className="App">
          <NavBar history={this.props.history}/>
          <div className="Router">
            <Router history={this.props.history}>
              <Switch>
                <Route exact path={ROUTES.CHAT} component={Messenger} />
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

export default withHistory(App);
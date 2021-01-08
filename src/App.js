import React from "react";
import './App.css';
import { Router, Route } from "react-router-dom";
import * as ROUTES from "./constants/routes";
import Messenger from "./pages/messenger/Messenger";
import Search from "./pages/products/Search";
import Home from "./pages/home/Home";

import NavBar from "./components/navigation/NavBar";

import { createMuiTheme } from "@material-ui/core/styles";
import { ThemeProvider } from "@material-ui/styles";
import { withHistory } from "./components/navigation/history";


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
          <NavBar />
          <div className="Router">
            <Router history={this.props.history}>
              <Route exact path={ROUTES.HOME} component={Home} />
              <Route exact path={ROUTES.CHAT} component={Messenger} />
              <Route path={ROUTES.CHAT + "/:roomId"} component={Messenger} />
              <Route exact path={ROUTES.SEARCH} component={Search} />
            </Router>
          </div>
        </div>
      </ThemeProvider>
    );
  }
}

export default withHistory(App);
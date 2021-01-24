import React from "react";
import './App.css';
import { Router, Route } from "react-router-dom";
import * as ROUTES from "./constants/routes";
import Messenger from "./pages/messenger/Messenger";
import Profile from "./pages/profile/Profile";
import Search from "./pages/products/Search";
import Product from "./pages/singleProduct/Product";
import ClientProducts from "./pages/clientProducts/Product";
import Home from "./pages/home/Home";
import Reviews from "./pages/reviews/ReviewList";
import './bootstrap.min.css';


import NavBar from "./components/navigation/NavBar";

import { createMuiTheme } from "@material-ui/core/styles";
import { ThemeProvider } from "@material-ui/styles";
import { withHistory } from "./components/navigation/history";

// Redux
import { connect } from 'react-redux'



const theme = createMuiTheme({
  palette: {
    primary: {
      // Purple and green play nicely together.
      main: "#6800b3",
      //main: "#40d0be", // WP color
    },
    secondary: {
      // This is green.A700 as hex.
      main: "#ffffff",
    },
  },
});

class App extends React.Component {
  render() {
    return (
      <ThemeProvider theme={theme}>
        <div className="App">
          <NavBar />
          <div className="Router" align="center">
            <Router history={this.props.history}>
              <Route exact path={ROUTES.HOME} component={Home} />
              <Route exact path={ROUTES.SEARCH} component={Search} />
              <Route exact path={ROUTES.PRODUCT} component={Product} />
              <Route exact path={ROUTES.CLIENTPRODUCTS} component={ClientProducts} />
              {this.props.userToken &&
                <>
                  <Route exact path={ROUTES.USER_PROFILE} component={Profile} />
                  <Route path={ROUTES.REVIEWS + "/:listType" + "/:id"} component={Reviews} />
                  <Route exact path={ROUTES.CHAT} component={Messenger} />
                </>
              }
            </Router>
          </div>
        </div>
      </ThemeProvider>
    );
  }
}

function mapStateToProps(state) {
  return {
    userToken: state.userToken
  }
}

export default connect(mapStateToProps)(withHistory(App));
import React from "react";
import { Link, withRouter } from "react-router-dom";

 class Home extends React.Component {
  render() {
    return (
      <>
      <h1>Home page</h1>
      <Link to="/chat">Ir a chat</Link>
      <br></br>
      <Link to="/chat/1-2-4">Ir a chat del producto 4 del usuario 2</Link>
      <br></br>
      <Link to="/search">Search</Link>
      </>
    );
  }
}

export default withRouter(Home)
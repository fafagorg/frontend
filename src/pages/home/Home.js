import React from "react";
import { Link, withRouter } from "react-router-dom";

 class Home extends React.Component {
  render() {
    return (
      <>
      <Link to="/chat">Ir a chat</Link>
      <br></br>
      <Link to="/chat/1-2-4">Ir a chat del producto 4 del usuario 2</Link>
      </>
    );
  }
}

export default withRouter(Home)
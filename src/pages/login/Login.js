import React, { useState } from "react";
import Login from "../../components/auth/login/login";

import { Link, withRouter } from "react-router-dom";

 class Login_View extends React.Component {
  render() {
    return (
      <>
      <Login></Login>

      </>
    );
  }
}

export default withRouter(Login_View)
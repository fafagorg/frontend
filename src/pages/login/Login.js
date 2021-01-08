import React, { useState } from "react";
import Login from "../../components/auth/login/login";
import Register from "../../components/auth/register/register";
import { Link, withRouter } from "react-router-dom";

 class Login_View extends React.Component {
  render() {
    return (
      <>
      <Register></Register>

      </>
    );
  }
}

export default withRouter(Login_View)
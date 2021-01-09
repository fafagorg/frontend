import React from "react";
import * as AuthService from "../../../services/auth";
import Cookies from "universal-cookie";

export default class Login extends React.Component {
  constructor(props) {
    super(props)
    this.state = {username: '',
                  password: '',
                  errors: {
                    username: '', 
                    password: '',
                    login: ''
                  }};


    var users = AuthService.getUsers()
    users.then(x=>{
      console.log(x)
    })

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <label>
          Username:
          <input type="text" value={this.state.username} name='username' onChange={this.handleChange} />
        </label>
        <label>
          Password
          <input type="password" value={this.state.password} name='password' onChange={this.handleChange}/>
        </label>
        <input type="submit" value="Submit" />
        {this.state.errors.login.length>0 && (
          <div class="error">{this.state.errors.login} </div>)}
      </form>
      
    );
  }
}


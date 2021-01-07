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
  handleChange(event) {
    var name = event.target.name
    this.setState({[name] : event.target.value});
  }

  handleSubmit(event) {
    event.preventDefault();

    AuthService.login({
      username: this.state.username,
      password: this.state.password
    }).then(res=>{
      var token = res.token
      new Cookies().set('access_token', token)
    }).catch(err=>{
      this.setState({errors: {login: 'Username or password are wrong'}})
    })
    //event.preventDefault();
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
        {true == true && (
          <div class="error">{this.state.errors.login} </div>)}
      </form>
      
    );
  }
}


import React, { Component } from 'react';

export default class Register extends React.Component {
  constructor(props) {
    super(props)
    this.state = {username: '',
                  password: '',
                  confirmPassword: '',
                  name: '',
                  surname: '',
                  email: '',
                  phone: '',
                  errors: {
                    username: '', 
                    password: '',
                    confirmPassword: '',
                    name: '',
                    surname: '',
                    email: '',
                    phone: '',
                    register: ''
                  }};
    
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  emailValidation(email){
    if (
      /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(
        email,
      )
    ) {
      return '';
    }
    if (email.trim() === '') {
      return 'Email is required';
    }
    return 'Please enter a valid email';
  };

  nameValidation(name){
    if (name.trim() === '') {
      return 'Name is required';
    }
    return '';
  };

  nameValidation(name){
    if (name.trim() === '') {
      return 'Name is required';
    }
    return '';
  };

  passwordValidation(password, confirmPassword){
    if (password === confirmPassword) {
      return 'Password doesn\'t match';
    }
    return '';
  };


  handleChange(event) {
    var res
    const name = event.target.name
    const value = event.target.value

    this.setState({[name] : [value]});
    if(name === 'email'){
      res = this.emailValidation(value)
      this.setState({errors: {email: [res]}})
    }
    if(name==='password'){
      var confirmPassword = this.state.confirmPassword[0]
      if(confirmPassword){
        res = this.passwordValidation(value, confirmPassword)
        this.setState({errors: {confirmPassword: [res]}})
      }
    }
    if(name==='confirmPassword'){
      var password = this.state.password[0]
      if(password){
        res = this.passwordValidation(password, value)
        this.setState({errors: {confirmPassword: [res]}})
      }

    }
  }

  handleSubmit(event) {
    event.preventDefault();

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
        <label>
          Confirm Password
          <input type="password" value={this.state.confirmPassword} name='confirmPassword' onChange={this.handleChange}/>
        </label>

        {this.state.errors.confirmPassword!=undefined && (
          <div class="error">{this.state.errors.confirmPassword} </div>)}

        <label>
          Name:
          <input type="text" value={this.state.name} name='name' onChange={this.handleChange} />
        </label>
        <label>
          Surname:
          <input type="text" value={this.state.surname} name='surname' onChange={this.handleChange} />
        </label>
        <label>
          Phone:
          <input type="text" value={this.state.phone} name='phone' onChange={this.handleChange} />
        </label>
        <label>
          Email:
          <input type="text" value={this.state.email} name='email' onChange={this.handleChange} />
        </label>
        {this.state.errors.email!=undefined && (
          <div class="error">{this.state.errors.email} </div>)}

        <input type="submit" value="Submit" />
      </form>
      
    );
  }
}

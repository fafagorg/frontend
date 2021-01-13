import React, { useState } from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import * as AuthService from "../../services/auth";
import Alert from '@material-ui/lab/Alert';
import validator from 'validator'

export default function RegisterDialog() {

  //Dialog
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  // Form

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [name, setName] = useState('');
  const [surname, setSurname] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');

  const [nameError, setNameError] = useState('');
  const [surnameError, setSurnameError] = useState('');
  const [emailError, setEmailError] = useState('');
  const [phoneError, setPhoneError] = useState('');
  const [usernameError, setUsernameError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [confirmPasswordError, setConfirmPasswordError] = useState('');

  const [registerError, setRegisterError] = useState('');
  const [registerSucces, setRegisterSucces] = useState('');

  const validatePhoneNumber = (number) => {
    const isValidPhoneNumber = validator.isMobilePhone(number)
    return (isValidPhoneNumber)
  }
  const handleChange = (event) => {
    var name = event.name
    var value = event.value
    switch (name) {
      case "username":
        setUsername(value);
        //Validation
        if (value === "") {
          setUsernameError("Cannot be empty.");
        } else {
          setUsernameError("");
        }
        break;
      case "password":
        setPassword(value);
        //Validation
        console.log(password.length)
        if (value === "") {
          setPasswordError("Cannot be empty.");
        } else if (password.length < 2) {
          setPasswordError("Password is too short")
        } else if (confirmPassword !== "" && value !== confirmPassword) {
          setConfirmPasswordError("Passwords doesn't match")
        } else {
          setPasswordError("")
        }
        break;
      case "name":
        setName(value)
        //Validation
        if (value === "") {
          setNameError("Cannot be empty.");
        } else {
          setNameError("");
        }
        break;
      case "surname":
        setSurname(value)
        //Validation
        if (value === "") {
          setSurnameError("Cannot be empty.");
        } else {
          setSurnameError("");
        }
        break;
      case "email":
        setEmail(value)
        //Validation
        if (value === "") {
          setEmailError("Cannot be empty.");
        } else if (!
          /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(
            value,
          )) {
          setEmailError("Please enter a valid email")
        } else {
          setEmailError("")
        }
        break;
      case "confirmPassword":
        setConfirmPassword(value)
        if (value === "") {
          setConfirmPasswordError("Cannot be empty.");
        } else if (password !== "" && value !== password) {
          setConfirmPasswordError("Passwords doesn't match")
        } else {
          setConfirmPasswordError("")
        }
        break;
      case "phone":
        setPhone(value)
        if (value === "") {
          setPhoneError("Cannot be empty.");
        } else if (!validatePhoneNumber(value)) {
          setPhoneError("Please enter a valid phone number")
        } else {
          setPhoneError("")
        }
        break;
      default:
        break;
    }
  }

  const handleSubmit = (event) => {
    event.preventDefault();

    if (usernameError === "" && passwordError === "" && nameError === "" && surnameError === "" && emailError === "" && phoneError === "") {
      AuthService.register({
        username: username,
        password: password,
        name: name,
        surname: surname,
        email: email,
        phone: phone
      }).then(res => {
        setRegisterSucces("Registred correctly")
        setRegisterError("")
      }).catch(err => {
        setRegisterError("Username is already taken")
      })
    } else {
      setRegisterError("Please check all inputs")
    }
  }

  return (
    <div>
      <Button onClick={handleClickOpen}>Register</Button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <form onSubmit={handleSubmit}>
          <DialogTitle id="form-dialog-title">Register</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Introduce your personal data, all inputs are required
          </DialogContentText>

            <TextField
              autoFocus
              error={usernameError.length !== 0}
              helperText={usernameError}
              name="username"
              margin="dense"
              id="username"
              onChange={event => handleChange(event.target)}
              label="Username"
              type="text"
              fullWidth
            />
            <TextField
              error={passwordError.length !== 0}
              helperText={passwordError}
              name="password"
              margin="dense"
              id="password"
              onChange={event => handleChange(event.target)}
              label="Password"
              type="password"
              fullWidth
            />
            <TextField
              error={confirmPasswordError.length !== 0}
              helperText={confirmPasswordError}
              name="confirmPassword"
              margin="dense"
              id="confirmPassword"
              onChange={event => handleChange(event.target)}
              label="Confirm Password"
              type="password"
              fullWidth
            />
            <TextField
              error={nameError.length !== 0}
              helperText={nameError}
              name="name"
              margin="dense"
              id="name"
              onChange={event => handleChange(event.target)}
              label="Name"
              type="text"
              fullWidth
            />
            <TextField
              error={surnameError.length !== 0}
              helperText={surnameError}
              name="surname"
              margin="dense"
              id="name"
              onChange={event => handleChange(event.target)}
              label="Surname"
              type="text"
              fullWidth
            />
            <TextField
              error={emailError.length !== 0}
              helperText={emailError}
              name="email"
              margin="dense"
              id="email"
              onChange={event => handleChange(event.target)}
              label="Email"
              type="text"
              fullWidth
            />
            <TextField
              error={phoneError.length !== 0}
              helperText={phoneError}
              name="phone"
              margin="dense"
              id="phone"
              onChange={event => handleChange(event.target)}
              label="Phone"
              type="text"
              fullWidth
            />


            {registerError.length !== 0 &&
              <Alert severity="error">{registerError}</Alert>
            }

            {registerSucces.length !== 0 &&
              <Alert severity="success">{registerSucces}</Alert>
            }

          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} color="primary">
              Cancel
          </Button>
            <Button type="submit" value="Submit" color="primary">
              Submit
          </Button>
          </DialogActions>
        </form>
      </Dialog>
    </div>
  );
}

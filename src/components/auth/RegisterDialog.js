import React, { useState } from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DeleteIcon from '@material-ui/icons/Delete';
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import * as AuthService from "../../services/auth";
import Fab from '@material-ui/core/Fab';
import Alert from '@material-ui/lab/Alert';
import validator from 'validator'
import { connect } from 'react-redux';
import Avatar from 'react-avatar';

function RegisterDialog(props) {

  //Dialog
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };


  const getBase64 = file => {
    return new Promise(resolve => {
      let baseURL = "";
      // Make new FileReader
      let reader = new FileReader();

      // Convert the file to base64 text
      reader.readAsDataURL(file);

      // on reader load somthing...
      reader.onload = () => {
        // Make a fileInfo Object
        baseURL = reader.result;
        resolve(baseURL);
      };
    });
  };
  // Form

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [name, setName] = useState('');
  const [surname, setSurname] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [file, setFile] = useState('');
  const [base64, setBase64] = useState('');

  const [nameError, setNameError] = useState('');
  const [surnameError, setSurnameError] = useState('');
  const [emailError, setEmailError] = useState('');
  const [phoneError, setPhoneError] = useState('');
  const [usernameError, setUsernameError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [confirmPasswordError, setConfirmPasswordError] = useState('');
  const [fileEror, setFileError] = useState('');
  

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
        if (value === "") {
          setPasswordError("Cannot be empty.");
        } else if (password.length < 2) {
          console.log('entra')
          setPasswordError("Password is too short")
        } else {
          setPasswordError("")
        }
        if (confirmPassword !== "" && value !== confirmPassword) {
          setConfirmPasswordError("Passwords doesn't match")
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
      case "photo":
        if(event.files.length>0){
          var extension = event.files[0].name.split('.')[1]
          if(extension!=='png' && extension!=='jpg'){
            setFileError('The image extension must be png or jpg')
          }else if(parseInt(event.files[0].size)/1000000 > 8){
            setFileError('The image size must be less than 8mb')
          }else{
            setFileError('')
            value =  URL.createObjectURL(event.files[0])
            setFile(value)
            getBase64(event.files[0]).then(r=>{
              setBase64(r)
            })
          }
        }
        break
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
        phone: phone,
        photo: base64
      }).then(res => {
        AuthService.login({
          username: username,
          password: password
        }).then(res => {
          var token = res.token;
          props.setUserToken(token);
        }).catch(err => {
          console.log(err);
        });
        setRegisterSucces("Registred correctly. This dialog will automatically close in 3 seconds.");
        setRegisterError("");
        setTimeout(() => handleClose(), 3000);
      }).catch(err => {
        setRegisterError("Username is already taken")
      })
    } else {
      setRegisterError("Please check all inputs")
    }
  }

  return (
    <div>
      {!props.userToken &&
        <Button onClick={handleClickOpen}>Register</Button>
      }
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <form onSubmit={handleSubmit} method="POST">
          <DialogTitle id="form-dialog-title">Register</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Introduce your personal data, all inputs are required except the photo
          </DialogContentText>
          {registerSucces.length === 0 &&
          <>
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

            <Fab
                color="primary"
                size="small"
                component="label"
                aria-label="add"
                variant="extended"
              >
              Upload Photo
              <TextField
                style={{ display: 'none' }} 
                hidden
                error={fileEror.length !== 0}
                helperText={fileEror}
                type="file"
                name="photo"
                margin="dense"
                id="photo"
                onChange={event => handleChange(event.target)}
                label="Photo"
              />
              </Fab>

              <Fab color="secondary" aria-label="edit">
                <DeleteIcon onClick={event => setFile('')}/>
                </Fab>
              {fileEror.length !== 0 &&
              <div  style={{ color: 'red' }}> {fileEror} </div>
            }

            <div style={{
               display: 'flex',
               alignItems: 'center',
               justifyContent: 'center',
              }}>
               <Avatar size="150" src={file} unstyled="true" />
            </div> 

            </>

            
            
          }

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

function mapStateToProps(state) {
  return {
    userToken: state.userToken
  }
}

function mapDispatchToProps(dispatch) {
  return {
    setUserToken: (token) => {
      dispatch({ type: "SET_TOKEN", payload: token });
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(RegisterDialog)

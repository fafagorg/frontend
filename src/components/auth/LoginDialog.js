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
import { connect } from 'react-redux';

function LoginDialog(props) {
  // Dialog
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setUsername('')
    setPassword('')
    setUsernameError('')
    setPasswordError('')
    setLoginError('')
    setLoginSucces('')
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  // Form

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [usernameError, setUsernameError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [loginError, setLoginError] = useState('');
  const [loginSucces, setLoginSucces] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();

    setLoginError("");
    setUsernameError("");
    setPasswordError("");

    if (username === "") {
      setUsernameError("Cannot be empty.");
    }
    if (password === "") {
      setPasswordError("Cannot be empty.");
    }

    if (username !== "" && password !== "") {
      AuthService.login({
        username: username,
        password: password
      }).then(res => {
        var token = res.token;
        props.setUserToken(token, username);
        setLoginSucces('Logged correctly. Automatically closing this window in 3 seconds.');
        setTimeout(() => handleClose(), 3000);
      }).catch(err => {
        console.log(err);
        setLoginError('Username or password are wrong');
      })
    }
  }


  return (
    <div>
      {!props.userToken &&
        <Button onClick={handleClickOpen}>Login</Button>
      }
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >

        <form onSubmit={handleSubmit}>
          <DialogTitle id="form-dialog-title">Login</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Please, enter your credentials to log into the system.
          </DialogContentText>
            {loginSucces.length === 0 &&
              <>
                <TextField
                  autoFocus
                  error={usernameError.length !== 0}
                  helperText={usernameError}
                  name="username"
                  margin="dense"
                  id="username"
                  onChange={event => setUsername(event.target.value)}
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
                  onChange={event => setPassword(event.target.value)}
                  label="Password"
                  type="password"
                  fullWidth
                />
              </>
            }

            {loginError.length !== 0 &&
              <Alert severity="error">{loginError}</Alert>
            }

            {loginSucces.length !== 0 &&
              <Alert severity="success">{loginSucces}</Alert>
            }
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} color="primary">
              {loginSucces.length === 0 ? 'Cancel' : 'Close'}
            </Button>
            {loginSucces.length === 0 &&
              <Button type="submit" value="Submit" color="primary">
                Login
              </Button>
            }
          </DialogActions>
        </form>
      </Dialog>
    </div>
  );
}

function mapStateToProps(state) {
  return {
    userToken: state.userToken,
    username: state.username
  }
}

function mapDispatchToProps(dispatch) {
  return {
    setUserToken: (token, username) => {
      dispatch({ type: "SET_TOKEN", payload: {token: token, username: username} });
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginDialog);
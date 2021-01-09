import React, { useState } from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import * as AuthService from "../../services/auth";
import Cookies from "universal-cookie";
import Alert from '@material-ui/lab/Alert';

export default function LoginDialog() {
  // Dialog
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
  const [usernameError, setUsernameError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [loginError, setLoginError] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();

    setLoginError("");
    setUsernameError("");
    setPasswordError("");

    AuthService.login({
      username: username,
      password: password
    }).then(res => {
      var token = res.token
      new Cookies().set('access_token', token)
      handleClose();
    }).catch(err => {
      setUsernameError("Cannot be empty.");
      setPasswordError("Hey bro.");
      setLoginError('Username or password are wrong');
    })
  }

  return (
    <div>
      <Button onClick={handleClickOpen}>Login</Button>

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

            {usernameError.length !== 0 ?
              <TextField
                autoFocus
                error
                helperText={usernameError}
                name="username"
                margin="dense"
                id="username"
                onChange={event => setUsername(event.target.value)}
                label="Username"
                type="text"
                fullWidth
              />
              :
              <TextField
                autoFocus
                name="username"
                margin="dense"
                id="username"
                onChange={event => setUsername(event.target.value)}
                label="Username"
                type="text"
                fullWidth
              />
            }

            {passwordError.length !== 0 ?
              <TextField
                error
                helperText={passwordError}
                name="password"
                margin="dense"
                id="password"
                onChange={event => setPassword(event.target.value)}
                label="Password"
                type="password"
                fullWidth
              />
              :
              <TextField
                name="password"
                margin="dense"
                id="password"
                onChange={event => setPassword(event.target.value)}
                label="Password"
                type="password"
                fullWidth
              />
            }
            {loginError.length !== 0 &&
              <Alert severity="error">This is an error alert — check it out!</Alert>
            }
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} color="primary">
              Cancel
          </Button>
            <Button type="submit" value="Submit" color="primary">
              Login
          </Button>
          </DialogActions>
        </form>
      </Dialog>
    </div>
  );
}

import React from 'react';
import clsx from 'clsx';
import { fade, makeStyles } from '@material-ui/core/styles';
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ExitToApp from '@material-ui/icons/ExitToApp';
import Person from '@material-ui/icons/Person';
import IconButton from '@material-ui/core/IconButton';
import AccountCircle from '@material-ui/icons/AccountCircle';
import * as ROUTES from "../../constants/routes";
import { withHistory } from "./history";
import { connect } from 'react-redux';

const useStyles = makeStyles((theme) => ({
  list: {
    width: 250,
  },
  fullList: {
    width: 'auto',
  },
  menuButton: {
    marginRight: theme.spacing(1),
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.secondary.main, 0.8),
    '&:hover': {
      backgroundColor: fade(theme.palette.secondary.main, 0.95),
    },
    color: "#ffffff",
    width: 50,
    heigth: 50,
    padding: "7px 0"
  }
}));

function SwipeableTemporaryDrawer(props) {
  const classes = useStyles();
  const [state, setState] = React.useState({
    top: false,
    left: false,
    bottom: false,
    right: false,
  });

  const toggleDrawer = (anchor, open) => (event) => {
    if (event && event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };

  const logOut = () => {
    props.history.push(ROUTES.HOME);
    props.setUserToken(undefined);
  };

  const list = (anchor) => (
    <div
      className={clsx(classes.list, {
        [classes.fullList]: anchor === 'top' || anchor === 'bottom',
      })}
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      <ListItem button key='Profile' onClick={() => props.history.push(ROUTES.USER_PROFILE)}>
        <ListItemIcon><Person /></ListItemIcon>
        <ListItemText primary='Profile'/>
      </ListItem>
      <Divider />
      <ListItem button key='Log out' onClick={logOut}>
        <ListItemIcon><ExitToApp /></ListItemIcon>
        <ListItemText primary='Log out'/>
      </ListItem>
    </div>
  );

  return (
    <div>
          <IconButton
            edge="end"
            aria-label="account of current user"
            aria-haspopup="true"
            onClick={toggleDrawer('right', true)}
            color="primary"
          >
            <AccountCircle />
          </IconButton>
          <SwipeableDrawer
            anchor='right'
            open={state['right']}
            onClose={toggleDrawer('right', false)}
            onOpen={toggleDrawer('right', true)}
          >
            {list('right')}
          </SwipeableDrawer>  
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

export default connect(mapStateToProps, mapDispatchToProps)(withHistory(SwipeableTemporaryDrawer));
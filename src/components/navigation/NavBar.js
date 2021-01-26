import React from "react";
import { fade, makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import InputBase from "@material-ui/core/InputBase";
import Badge from "@material-ui/core/Badge";
import SearchIcon from "@material-ui/icons/Search";
import MailIcon from "@material-ui/icons/Mail";
import * as ROUTES from "../../constants/routes";
import { withHistory } from "./history";
import LoginDialog from "../auth/LoginDialog";
import RegisterDialog from "../auth/RegisterDialog";
import { connect } from 'react-redux';

import MenuDrawer from "./MenuDrawer";

const useStyles = makeStyles((theme) => ({
  grow: {
    flexGrow: 1,
  },
  appBar: {
    backgroundColor: fade(theme.palette.secondary.main, 0.8)
  },
  title: {
    display: "none",
    [theme.breakpoints.up("sm")]: {
      display: "block",
    },
  },
  search: {
    position: "relative",
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.primary.main, 0.5),
    "&:hover": {
      backgroundColor: fade(theme.palette.primary.main, 0.65),
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      marginLeft: theme.spacing(3),
    },
    color: "#ffffff",
  },
  searchIcon: {
    padding: theme.spacing(0, 1),
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    color: "#ffffff",
  },
  inputRoot: {
    color: "inherit",
    width: "100%",
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(0)}px)`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: "20ch",
    },
  },
  sectionDesktop: {
    display: "none",
    [theme.breakpoints.up("md")]: {
      display: "flex",
    },
  },
  sectionMobile: {
    display: "flex",
    [theme.breakpoints.up("md")]: {
      display: "none",
    },
  },
  logoButton: {
    marginRight: theme.spacing(1),
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.primary.main, 0.8),
    "&:hover": {
      backgroundColor: fade(theme.palette.primary.main, 0.95),
    },
    color: "#ffffff",
    width: 50,
    heigth: 50,
    padding: "7px 0",
  },
}));

function NavBar(props) {
  const classes = useStyles();
  let hola = "";
  function handleChange(event) {
    hola = event.target.value
  }

  return (
    <div className={classes.grow}>
      <AppBar position="fixed" className={classes.appBar}>
        <Toolbar>
          <IconButton
            edge="start"
            className={classes.logoButton}
            color="inherit"
            aria-label="open drawer"
            onClick={() => props.history.push(ROUTES.HOME)}
          >
            💸
          </IconButton>
          <div className={classes.search} >
            <InputBase style={{ color: '#000' }}
              placeholder="Search products"
              classes={{
                root: classes.inputRoot,
                input: classes.inputInput,
              }}
              inputProps={{ "aria-label": "search" }}
              onChange={handleChange}
            />
          </div>
          <div className={classes.grow} />
          <IconButton
                aria-label="search"
                color="primary"
                onClick={() =>{ props.history.push("/nada"); setTimeout(() => {
                  props.history.push(ROUTES.SEARCH + "?category="+ hola)
                }, 1); }}
              >
              
                  <SearchIcon />
            
              </IconButton>
          <LoginDialog />
          <RegisterDialog />
          {props.userToken &&
            <>
              <IconButton
                color="primary"
                onClick={() => props.history.push(ROUTES.CHAT)}
              >
                <Badge>
                  <MailIcon />
                </Badge>
              </IconButton>
              <MenuDrawer history={props.history} />
            </>
          }
        </Toolbar>
      </AppBar>
    </div>
  );
}



function mapStateToProps(state) {
  return {
    userToken: state.userToken
  }
}

export default connect(mapStateToProps)(withHistory(NavBar));

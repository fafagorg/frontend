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
import LoginModal from "../auth/LoginModal";
import RegisterModal from "../auth/RegisterModal";

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
    backgroundColor: fade(theme.palette.primary.main, 0.8),
    "&:hover": {
      backgroundColor: fade(theme.palette.primary.main, 0.95),
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
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
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
            売
          </IconButton>
          <div className={classes.search}>
            <div className={classes.searchIcon}>
              <SearchIcon />
            </div>
            <InputBase
              placeholder="Search products"
              classes={{
                root: classes.inputRoot,
                input: classes.inputInput,
              }}
              inputProps={{ "aria-label": "search" }}
            />
          </div>
          <div className={classes.grow} />
          <LoginModal />
          <RegisterModal />
          <>
            <IconButton
              aria-label="show 4 new mails"
              color="primary"
              onClick={() => props.history.push(ROUTES.CHAT)}
            >
              <Badge badgeContent={4}>
                <MailIcon />
              </Badge>
            </IconButton>
            <MenuDrawer history={props.history} />
          </>
        </Toolbar>
      </AppBar>
    </div>
  );
}

export default withHistory(NavBar);

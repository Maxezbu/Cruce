import React from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  IconButton,
} from "@material-ui/core";
import { Link, useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../state/users";
import MenuIcon from "@material-ui/icons/Menu";
import useStyles from "../utils/stylesNavbar";
import { useSnackbar } from "notistack";
import messagesHandler from "../utils/messagesHandler";

const HomeNavbar = () => {
  const classes = useStyles();
  const history = useHistory();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.users.user);
  const messages = messagesHandler(useSnackbar());
  const token = localStorage.getItem("token");

  const logoutUser = () => {
    localStorage.removeItem("token");
    dispatch(logout()) && messages.info();
    history.push("/");
  };

  return (
    <div className={classes.root}>
      <AppBar
        position="static"
        style={{ backgroundColor: "#d9d9d9", color: "black" }}
      >
        <Toolbar>
          <IconButton
            edge="start"
            className={classes.menuButton}
            color="inherit"
            aria-label="menu"
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" className={classes.title}></Typography>
          {!token ? (
            <>
              <Link to="/selectLogin" style={{ color: "inherit" }}>
                <Button color="inherit">Login</Button>
              </Link>
              <Link to="/select" style={{ color: "inherit" }}>
                <Button color="inherit">Register</Button>
              </Link>
            </>
          ) : (
            <>
              <Button color="inherit" onClick={logoutUser}>
                Logout
              </Button>
            </>
          )}
          <Link to="/" style={{ color: "inherit" }}>
            <Button color="inherit">Home</Button>
          </Link>
          {user && user.admin ? (
            <>
              <Link to="/admin" style={{ color: "inherit" }}>
                <Button color="inherit">admin panel</Button>
              </Link>
            </>
          ) : (
            <></>
          )}
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default HomeNavbar;

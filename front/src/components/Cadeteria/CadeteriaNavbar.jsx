import React from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  IconButton,
  MenuIcon,
} from "@material-ui/core";
import { Link, useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logout } from "../../state/cadeterias";
import { useSnackbar } from "notistack";
import useStyles from "../../utils/stylesNavbar";
import messagesHandler from "../../utils/messagesHandler";

const CadeteriaNavbar = () => {
  const classes = useStyles();
  const history = useHistory();
  const dispatch = useDispatch();
  const token = localStorage.getItem("token");
  const messages = messagesHandler(useSnackbar());

  const logoutCadeteria = () => {
    localStorage.removeItem("token");
    dispatch(logout()) && messages.info("Deslogueado correctamente");
    history.push("/cadeteria/login");
  };

  return (
    <div className={classes.root}>
      <AppBar position="static" style={{ backgroundColor: "#ff5757" }}>
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
              <Button color="inherit" onClick={logoutCadeteria}>
                Logout
              </Button>
            </>
          )}
          <Link to="/" style={{ color: "inherit" }}>
            <Button color="inherit">Home</Button>
          </Link>
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default CadeteriaNavbar;

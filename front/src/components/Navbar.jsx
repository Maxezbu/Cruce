import React from "react";

import { useLocation } from "react-router-dom";

import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import { Link, useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../state/users";
import useStyles from "../utils/stylesNavbar";

import { useSnackbar } from "notistack";
import messagesHandler from "../utils/messagesHandler";

const Navbar = () => {
  const location = useLocation().pathname.split("/");

  const classes = useStyles();
  const history = useHistory();

  const dispatch = useDispatch();
  const token = localStorage.getItem("token");
  const user = useSelector((state) => state.users.user);
  const cadeteria = useSelector((state) => state.cadeterias.singleCadeteria);

  const messages = messagesHandler(useSnackbar());

  const logoutUser = () => {
    localStorage.removeItem("token");
    dispatch(logout()) && messages.info();
    history.push("/");
  };

  const userTypeColor = (color = "") => {
    if (location.includes("admin")) return "admin";
    if (location.includes("cadeteria")) return "cadeteria";
    if (location.includes("cadete")) return "cadete";
    return "base";
  };

  return (
    <div className={classes.root}>
      <AppBar position="static" className={classes[`${userTypeColor()}`]}>
        <Toolbar>
          <Typography variant="h5" className={classes.title}>
            {user ? `Hola ${user.firstName}` : null}
            {cadeteria ? cadeteria.nameCompany : null}
          </Typography>

          {/*   <IconButton
            edge="start"
            className={classes.menuButton}
            color="inherit"
            aria-label="menu"
          >
            <MenuIcon />
          </IconButton> */}
          <Typography variant="h6" className={classes.title}></Typography>
          {!token ? (
            <>
              <Link to="/login-as" style={{ color: "inherit" }}>
                <Button color="inherit">Login</Button>
              </Link>
              <Link to="/register-as" style={{ color: "inherit" }}>
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
export default Navbar;

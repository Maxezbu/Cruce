import React, { useState } from "react";
import {
  Avatar,
  Button,
  CssBaseline,
  TextField,
  Paper,
  Box,
  Grid,
} from "@material-ui/core";
import { Link, useHistory } from "react-router-dom";
import { useSnackbar } from "notistack";
import { useDispatch, useSelector } from "react-redux";
import { loginRequest, fetchMe } from "../state/users";
import messagesHandler from "../utils/messagesHandler";
import Copyright from "../utils/Copyright";
import useStyles from "../styles/stylesLogins";

export default function Login() {
  const messages = messagesHandler(useSnackbar());
  const cadete = useSelector((state) => state.users.user);
  const classes = useStyles();
  const [input, setInput] = useState([]);
  const dispatch = useDispatch();
  const history = useHistory();

  const handleChange = (e) => {
    const key = e.target.name;
    const value = e.target.value;
    setInput({ ...input, [key]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(loginRequest(input))
      .then((res) => dispatch(fetchMe()))
      .then((res) => {
        const check = res.payload;
        if (!check) messages.error();
        else
          check && check.admin
            ? messages.admin() && history.push("/admin")
            : messages.success("Usuario ingresado correctamente") &&
              history.push("/cadete");
      })
      .catch((e) => history.push("/login-as"));
  };
  if (cadete && cadete.authorized) {
    history.push("/cadete");
  }

  return (
    <>
      <Grid container component="main" className={classes.root}>
        <CssBaseline />
        <Grid item xs={false} sm={4} md={7} className={classes.image}  />
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
          <div className={classes.paper}>
            <Avatar
              src={process.env.PUBLIC_URL + "/deli.png"}
              style={{ width: 50, height: 50 }}
            />
            <form onSubmit={handleSubmit}>
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                id="email"
                label="Correo electrónico"
                name="email"
                autoComplete="email"
                autoFocus
                onChange={handleChange}
                value={input.email}
              />
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                name="password"
                label="Contraseña"
                type="password"
                id="password"
                autoComplete="current-password"
                onChange={handleChange}
                value={input.password}
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                className={classes.submit}
              >
                Ingresar
              </Button>

              <Grid container>
                <Grid item xs>
                  <Link to="/forgot">Olvidaste tu contraseña?</Link>
                </Grid>

                <Grid item>
                  <Link to="/register-as/cadete">
                    {"No tienes cuenta? Registrate"}
                  </Link>
                </Grid>
              </Grid>
              <Box mt={5}>
                <Copyright />
              </Box>
            </form>
          </div>
        </Grid>
      </Grid>
    </>
  );
}

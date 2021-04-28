import React, { useState } from "react";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
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
import { CadloginRequest } from "../../state/cadeterias";
import { fetchCad } from "../../state/cadeterias";

//UTILS
import messagesHandler from "../../utils/messagesHandler";
import Copyright from "../../utils/Copyright";
import useStyles from "../../styles/stylesLogins";

const LoginCadeteria = () => {
  const messages = messagesHandler(useSnackbar());
  const cadeteria = useSelector((state) => state.cadeterias.singleCadeteria);
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
    dispatch(CadloginRequest(input))
      .then((res) => dispatch(fetchCad()))
      .then((res) => {
        if (!res.payload) messages.error();
        else
          messages.success("Cadeteria ingresada correctamente") &&
            history.push("/cadeteria");
      })
      .catch((e) => messages.error());
  };
  if (cadeteria && cadeteria.id) {
    history.push("/cadeteria");
  }
  return (
    <div>
      <Grid container component="main" className={classes.root}>
        <CssBaseline />
        <Grid item xs={false} sm={4} md={7} className={classes.image} />
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
          <div className={classes.paper}>
            <Avatar
              src={process.env.PUBLIC_URL + "/asd.png"}
              style={{ padding: 3, width: 50 }}
            >
              <LockOutlinedIcon />
            </Avatar>
            <form className={classes.form} onSubmit={handleSubmit}>
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
                  <Link to="/forgot-cadeteria">Olvidaste tu contraseña?</Link>
                </Grid>
                <Grid item>
                  <Link to="/register-as/cadeteria">
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
    </div>
  );
};

export default LoginCadeteria;

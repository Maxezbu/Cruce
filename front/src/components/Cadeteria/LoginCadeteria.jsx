import React, { useState } from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import { Link, useHistory } from "react-router-dom";
import Paper from "@material-ui/core/Paper";
import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { useSnackbar } from "notistack";
import { useDispatch, useSelector } from "react-redux";

import { CadloginRequest } from "../../state/cadeterias";
import { fetchCad } from "../../state/cadeterias";

//UTILS
import messagesHandler from "../../utils/messagesHandler";
import Copyright from "../../utils/Copyright";
import useStyles from "../../utils/stylesLogins";

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
        console.log("resouesta en login ", res);
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
            <Avatar className={classes.avatar}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Sign in
            </Typography>
            <form className={classes.form} onSubmit={handleSubmit}>
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
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
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
                onChange={handleChange}
                value={input.password}
              />
              <FormControlLabel
                control={<Checkbox value="remember" color="primary" />}
                label="Remember me"
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                className={classes.submit}
              >
                Sign In
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

import React, { useEffect, useState } from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import NativeSelect from "@material-ui/core/NativeSelect";
import { useDispatch, useSelector } from "react-redux";

import { registerRequest } from "../state/user";

import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";
import { Link, useHistory } from "react-router-dom";

import useStyles from "../utils/stylesRegister";
import Copyright from "../utils/Copyright";

import InputLabel from "@material-ui/core/InputLabel";

import FormControl from "@material-ui/core/FormControl";
import { makeStyles } from "@material-ui/core/styles";

import { allCadeterias } from "../state/cadeteria";

import { useSnackbar } from "notistack";
import messageHandler from "../utils/messagesHandler";
///manejo de errores

import { unwrapResult } from "@reduxjs/toolkit";
import HomeNavbar from "./HomeNavbar";
const User = () => {
  const { enqueueSnackbar } = useSnackbar();

  const classes = useStyles();
  const history = useHistory();
  const [input, setInput] = useState({});
  const dispatch = useDispatch();
  const cadeteriaList = useSelector((state) => state.cadeteria.cadeterias);


  const messages = messageHandler(useSnackbar());

  const handleChange = (e) => {
    const key = e.target.name;
    const value = e.target.value;

    setInput({ ...input, [key]: value });
  };

  useEffect(() => {
    dispatch(allCadeterias())
      .then((res) => console.log(res))
      .catch((err) => err);
  }, [dispatch]);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(registerRequest(input))
      .then(({ payload }) => {
        if (!payload) messages.error();
        else messages.success("Usuario registrado") && history.push("/login");
      })
      .catch((err) => messages.error(err));
  };

  return (
    <>
      <HomeNavbar />
      <div style={{ paddingTop: "2rem" }}>
        <Container component="main" maxWidth="xs">
          <CssBaseline />
          <div className={classes.paper}>
            <Avatar className={classes.avatar}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Registro de Cadete
            </Typography>
            <form className={classes.form} onSubmit={handleSubmit}>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    autoComplete="fname"
                    name="firstName"
                    variant="outlined"
                    required
                    fullWidth
                    id="firstName"
                    label="Nombre"
                    autoFocus
                    onChange={handleChange}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    variant="outlined"
                    required
                    fullWidth
                    id="lastName"
                    label="Apellido"
                    name="lastName"
                    autoComplete="lname"
                    onChange={handleChange}
                  />
                </Grid>
                <Grid item xs={12}>
                  <FormControl variant="outlined" style={{ minWidth: 395 }}>
                    <InputLabel htmlFor="outlined-age-native-simple">
                      Medio de transporte
                    </InputLabel>
                    <Select
                      fullWidth
                      labelId="demo-simple-select-filled-label"
                      label="Medio de transporte"
                      name="vehicle"
                      id="demo-simple-select-filled"
                      onChange={handleChange}
                    >
                      <MenuItem value="moto" key={1}>
                        Moto
                      </MenuItem>
                      <MenuItem value="bicicleta" key={2}>
                        Bicicleta
                      </MenuItem>
                      <MenuItem value="auto" key={3}>
                        Auto
                      </MenuItem>
                    </Select>
                  </FormControl>
                </Grid>

                <Grid item xs={12}>
                  <FormControl variant="outlined" style={{ minWidth: 395 }}>
                    <InputLabel htmlFor="outlined-age-native-simple">
                      Cadeterias
                    </InputLabel>
                    <Select
                      fullWidth
                      labelId="demo-simple-select-filled-label"
                      label="Cadeterias"
                      name="cadeterias"
                      id="demo-simple-select-filled"
                      onChange={handleChange}
                    >
                      {cadeteriaList &&
                        cadeteriaList.map((cad, i) => {
                          if (cad.authorized && cad.active !== false)
                            return (
                              <MenuItem value={`${cad.nameCompany}`} key={i}>
                                {`${cad.nameCompany}`}
                              </MenuItem>
                            );
                        })}
                    </Select>
                  </FormControl>
                </Grid>

                <Grid item xs={12}>
                  <TextField
                    variant="outlined"
                    required
                    fullWidth
                    id="phoneNum"
                    label="phoneNum"
                    name="phoneNum"
                    autoComplete="phoneNum"
                    onChange={handleChange}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    variant="outlined"
                    required
                    fullWidth
                    id="email"
                    label="Email"
                    name="email"
                    autoComplete="email"
                    onChange={handleChange}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    variant="outlined"
                    required
                    fullWidth
                    name="password"
                    label="Password"
                    type="password"
                    id="password"
                    autoComplete="current-password"
                    onChange={handleChange}
                  />
                </Grid>
              </Grid>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                className={classes.submit}
              >
                Registrarse
              </Button>
              <Grid container justify="flex-end">
                <Grid item>
                  <Link to="/login">Ya tienes una cuenta? Logueate.</Link>
                </Grid>
              </Grid>
            </form>
          </div>
          <Box mt={5}>
            <Copyright />
          </Box>
        </Container>
      </div>
    </>
  );
};
export default User;

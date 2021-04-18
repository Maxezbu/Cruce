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

import { registerRequest } from "../state/users";

import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";
import { Link, useHistory } from "react-router-dom";

import useStyles from "../utils/stylesRegister";
import Copyright from "../utils/Copyright";
import InputLabel from "@material-ui/core/InputLabel";
import FormControl from "@material-ui/core/FormControl";
import { allCadeterias } from "../state/cadeterias";
import { useSnackbar } from "notistack";
import { sendmail } from "../state/sendmail";
import messageHandler from "../utils/messagesHandler";

const User = () => {
  const classes = useStyles();

  const [input, setInput] = useState({});
  const dispatch = useDispatch();

  const cadeteriaList = useSelector((state) => state.cadeterias.cadeterias);
  const history = useHistory();
  const cadeteriaEmail = (companyId) =>
    cadeteriaList.filter((e) => e.id === companyId);

  const messages = messageHandler(useSnackbar());

  const handleChange = (e) => {
    const key = e.target.name;
    const value = e.target.value;
    setInput({ ...input, [key]: value });
  };

  useEffect(() => {
    dispatch(allCadeterias())
      .then((res) => res)
      .catch((err) => err);
  }, [dispatch]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await dispatch(registerRequest(input));
      const { payload } = res;

      if (!payload.errors) {
        const email = payload.email;
        const name = `${payload.firstName} ${payload.lastName}`;
        const cad = cadeteriaEmail(payload.cadeteriumId)[0];

        messages.success("Usuario registrado");
        return sendmail(email, name, cad) && history.push("/login-as/cadete");
      } else {
        payload.errors.map((e) => messages.error(e.message));
      }
    } catch (e) {
      messages.error("Hubo un problema con el registro");
    }
  };

  return (
    <>
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
                          if (cad.authorized)
                            return (
                              <MenuItem value={`${cad.nameCompany}`} key={i}>
                                {`${cad.nameCompany}`}{" "}
                                {cad.active ? null : " (cadetería inactiva)"}
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
                    label="Número telefónico"
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
                  <Link to="/login-as/cadete">
                    Ya tienes una cuenta? Logueate.
                  </Link>
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

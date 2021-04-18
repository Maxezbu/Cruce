import React, { useState } from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import { Link, useHistory } from "react-router-dom";
import useStyles from "../../utils/stylesRegister";
import Copyright from "../../utils/Copyright";
import { useDispatch } from "react-redux";

import { registerCadeteria } from "../../state/cadeterias";

import { useSnackbar } from "notistack";
import { sendmail } from "../../state/sendmail";
import { sendmailToAdmin } from "../../state/sendmail";
import messagesHandler from "../../utils/messagesHandler";

const RegisterCadeteria = () => {
  const messages = messagesHandler(useSnackbar());

  const classes = useStyles();
  const history = useHistory();
  const [input, setInput] = useState({});
  const dispatch = useDispatch();

  const handleChange = (e) => {
    const key = e.target.name;
    const value = e.target.value;
    setInput({ ...input, [key]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const res = await dispatch(registerCadeteria(input));
    const { payload } = res;
    try {
      if (!payload.errors) {
        const name = payload.nameCompany;
        const email = payload.email;

        messages.success("Cadeteria registrada correctamente");
        sendmail(email, name);
        sendmailToAdmin(payload);
        history.push("/login-as/cadeteria");
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
              Registro de Cadeteria
            </Typography>
            <form className={classes.form} onSubmit={handleSubmit}>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <TextField
                    variant="outlined"
                    required
                    fullWidth
                    id="name"
                    label="Nombre de la empresa"
                    name="nameCompany"
                    autoComplete="nameCompany"
                    onChange={handleChange}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    variant="outlined"
                    required
                    fullWidth
                    id="CUIT"
                    label="CUIT"
                    name="CUIT"
                    autoComplete="CUIT"
                    onChange={handleChange}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    variant="outlined"
                    required
                    fullWidth
                    id="address"
                    label="Direccion"
                    name="address"
                    autoComplete="address"
                    onChange={handleChange}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    variant="outlined"
                    required
                    fullWidth
                    id="phoneNum"
                    label="+54"
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
                  <Link to="/login-as/cadeteria">
                    Ya estas registrado? Logueate.
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

export default RegisterCadeteria;

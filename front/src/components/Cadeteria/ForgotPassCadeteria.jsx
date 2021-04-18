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
import useStyles from "../../utils/stylesResetPass";
import Copyright from "../../utils/Copyright";

import { useSnackbar } from "notistack";
import messagesHandler from "../../utils/messagesHandler";

import { forgotPasswordCadeteria } from "../../state/resetPassword";
import { useHistory } from "react-router";

const ForgotPasswordCadeteria = () => {
  const classes = useStyles();
  const messages = messagesHandler(useSnackbar());

  const [input, setInput] = useState({});

  const history = useHistory();

  const handleChange = (e) => {
    const key = e.target.name;
    const value = e.target.value;

    setInput({ ...input, [key]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    forgotPasswordCadeteria(input)
      .then((res) => messages.success("Verificacion enviada"))
      .then(history.push("/select"))
      .catch((err) => messages.error("La operacion no es valida"));
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Recuperar contraseña
        </Typography>
        <form className={classes.form} onSubmit={handleSubmit}>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="email"
            label="Correo electronico"
            type="email"
            id="email"
            autoComplete="current-email"
            onChange={handleChange}
            value={input.email}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Enviar confirmacion
          </Button>
          <Grid container></Grid>
        </form>
      </div>
      <Box mt={8}>
        <Copyright />
      </Box>
    </Container>
  );
};

export default ForgotPasswordCadeteria;

import React, { useState } from "react";
import {
  Avatar,
  Button,
  CssBaseline,
  TextField,
  Grid,
  Box,
  Typography,
  Container,
} from "@material-ui/core";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import useStyles from "../../styles/stylesResetPass";
import Copyright from "../../utils/Copyright";
import { useSnackbar } from "notistack";
import { forgotPasswordCadeteria } from "../../state/resetPassword";
import { useHistory } from "react-router";
import messagesHandler from "../../utils/messagesHandler";

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

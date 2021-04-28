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
import { useParams, useHistory } from "react-router-dom";
import { useSnackbar } from "notistack";
import { resetPassword } from "../state/resetPassword";
import useStyles from "../styles/stylesResetPass";
import Copyright from "../utils/Copyright";
import messagesHandler from "../utils/messagesHandler";

const ResetPassword = () => {
  const classes = useStyles();
  const params = useParams();
  const token = params.token;
  const history = useHistory();
  const messages = messagesHandler(useSnackbar());
  const [input, setInput] = useState({});

  const handleChange = (e) => {
    const key = e.target.name;
    const value = e.target.value;

    setInput({ ...input, [key]: value });
  };

  const handleSubmit = (event, input, token) => {
    event.preventDefault();
    const { newPass, passConfirm } = input;
    if (newPass === passConfirm) {
      resetPassword(newPass, token);
      messages.success("coinciden, password actualizada") &&
        history.push("/login-as/cadete");
    } else {
      messages.error("las passwords no coinciden");
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Restablecer contraseña
        </Typography>
        <form
          className={classes.form}
          onSubmit={(e) => handleSubmit(e, input, token)}
        >
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="newPass"
            label="Nueva contraseña"
            type="password"
            id="newPass"
            autoComplete="current-password"
            onChange={handleChange}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="passConfirm"
            label="Confirmar contraseña"
            name="passConfirm"
            type="password"
            autoComplete="confirm password"
            autoFocus
            onChange={handleChange}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Enviar
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

export default ResetPassword;

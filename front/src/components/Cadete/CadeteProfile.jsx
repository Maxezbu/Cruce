import React, { useState } from "react";
import Typography from "@material-ui/core/Typography";
import { Button, Container, CssBaseline } from "@material-ui/core";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import {
  Grid,
  MenuItem,
  Select,
  TextField,
  InputLabel,
} from "@material-ui/core";
import { editProfileUser, fetchMe } from "../../state/users";
import { useSnackbar } from "notistack";
import useStyles from "../../styles/stylesCadeteProfile";
import messageHandler from "../../utils/messagesHandler";

export default function ProfileCadete() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.users.user);
  const history = useHistory();
  const messages = messageHandler(useSnackbar());
  const [input, setInput] = useState({});

  const handleChange = (e) => {
    const key = e.target.name;
    const value = e.target.value;

    setInput({ ...input, [key]: value });
  };

  const editCadete = (e) => {
    e.preventDefault();
    const id = user.id;
    dispatch(editProfileUser({ id, input })).then(({ payload }) => {
      if (!payload.errors) {
        messages.info("Datos actualizados");
        dispatch(fetchMe()) && history.push("/cadete");
      } else {
        payload.errors.map((e) => messages.error(e.message)) &&
          dispatch(fetchMe());
      }
    });
  };

  return (
    <Container component="main" maxWidth="xs" style={{ padding: 25 }}>
      <CssBaseline />
      <div className={classes.paper}>
        <Typography component="h1" variant="h5">
          Editar perfil.
        </Typography>
        <form className={classes.form} noValidate>
          <Grid
            container
            spacing={8}
            style={{
              display: "grid",
              placeItems: "left",
              placeContent: "left",
            }}
          >
            <Grid item xs={12}>
              <TextField
                name="firstName"
                id="nombre"
                label="Nombre"
                fullWidth
                placeholder={user && user.firstName}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                name="lastName"
                label="Apellido"
                id="apellido"
                autoComplete="lname"
                fullWidth
                placeholder={user && user.lastName}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                name="phoneNum"
                id="phoneNum"
                label="Número de teléfono"
                fullWidth
                placeholder={user && user.phoneNum}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={10}>
              <br></br>
              <InputLabel
                style={{ textTransform: "capitalize" }}
                id="demo-simple-select-filled-label"
              >
                {input.vehicle == null ? user.vehicle : input.vehicle}
              </InputLabel>
              <Select
                fullWidth
                labelId="demo-simple-select-filled-label"
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
            </Grid>
          </Grid>
          <br></br>
          <br />

          <Button
            type="submit"
            variant="contained"
            onClick={editCadete}
            className={classes.button}
          >
            Editar
          </Button>
        </form>
      </div>
    </Container>
  );
}

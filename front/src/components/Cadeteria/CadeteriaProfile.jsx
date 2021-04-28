import React, { useState } from "react";
import {
  Grid,
  Typography,
  TextField,
  Button,
  CssBaseline,
} from "@material-ui/core";

import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { useSnackbar } from "notistack";
import { editProfileCadeteria } from "../../state/cadeterias";
import { fetchCad } from "../../state/cadeterias";
import useStyles from "../../styles/stylesCadeteria";
import messageHandler from "../../utils/messagesHandler";

export default function ProfileCadeteria() {
  const dispatch = useDispatch();
  const [input, setInput] = useState({});
  const history = useHistory();
  const messages = messageHandler(useSnackbar());
  const cadeteria = useSelector((state) => state.cadeterias.singleCadeteria);

  const handleChange = (e) => {
    const key = e.target.name;
    const value = e.target.value;

    setInput({ ...input, [key]: value });
  };

  const editCadeteria = (e) => {
    e.preventDefault();
    const id = cadeteria.id;
    dispatch(editProfileCadeteria({ id, input }))
      .then(({ payload }) => {
        if (payload.errors) {
          payload.errors.map((e) => messages.error(e.message)) &&
            dispatch(fetchCad());
        } else {
          dispatch(fetchCad());
          messages.info("datos actualizados") && history.push("/cadeteria");
        }
      })
      .catch((err) => messages.error("Fallo al actualizar los datos"));
  };

  return (
    <React.Fragment>
      <CssBaseline />
      <Typography
        variant="h4"
        key="1"
        style={{
          textAlign: "center",
          marginTop: 45,
          marginBottom: 50,
          color: "black",
          fontWeight: "bold",
        }}
      >
        EDITAR PERFIL CADETERIA
      </Typography>
      <form style={{ marginLeft: "7%" }}>
        <Grid container spacing={3}>
          <Grid item xs={10}>
            <TextField
              name="nameCompany"
              id="nameCampany"
              label="Nombre"
              fullWidth
              placeholder={cadeteria && cadeteria.nameCompany}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={10}>
            <TextField
              name="phoneNum"
              id="phoneNum"
              label="Numero de telefono"
              fullWidth
              placeholder={cadeteria && cadeteria.phoneNum}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={10}>
            <TextField
              name="address"
              id="address"
              label="Direccion"
              fullWidth
              placeholder={cadeteria && cadeteria.address}
              onChange={handleChange}
            />
          </Grid>
        </Grid>
        <br></br>
        <br />

        <Button
          type="submit"
          variant="contained"
          color="primary"
          onClick={editCadeteria}
          className={useStyles.button}
        >
          Editar
        </Button>
      </form>
    </React.Fragment>
  );
}

import React, { useEffect, useState } from "react";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";

import useStyles from "../../utils/stylesCadeteria";
import { useSnackbar } from "notistack";
import messageHandler from "../../utils/messagesHandler";

import { editProfileCadeteria } from "../../state/cadeterias";
import { fetchCad } from "../../state/cadeterias";

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
          payload.errors.map((e) => messages.error(e.message)) && dispatch(fetchCad());
        } else {
          dispatch(fetchCad());
          messages.info("datos actualizados") && history.push("/cadeteria");
        }
      })
      .catch((err) => messages.error("Fallo al actualizar los datos"));
  };

  console.log("CADETERIA EN PROFILE ====>", cadeteria);

  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        Editar el perfil de la cadeteria
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
          style={{
            backgroundColor: "#C25500",
            width: "25%",
            marginRight: "1%",
            color: "black",
          }}
        >
          Edit
        </Button>
      </form>
    </React.Fragment>
  );
}

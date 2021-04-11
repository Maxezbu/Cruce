import React, { useEffect, useState } from "react";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import axios from "axios";
import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";
import { InputLabel } from "@material-ui/core";
import { editProfileUser } from "../../state/user";
import Navbar from "../Navbar";

const useStyles = makeStyles((theme) => ({
  button: {
    marginTop: theme.spacing(3),
    marginLeft: theme.spacing(1),
    backgroundColor: "#C25500",
    width: "100%",
  },
  inputRoot: {
    color: "inherit",
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: "20ch",
    },
  },
}));

export default function ProfileCadete() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.cadete);
  const [input, setInput] = useState({});
  const history = useHistory();

  const handleChange = (e) => {
    const key = e.target.name;
    const value = e.target.value;

    setInput({ ...input, [key]: value });
  };

  const editCadete = (e) => {
    e.preventDefault();
    const id = user.id;
    dispatch(editProfileUser({ id, input })).then((res) => {
      if (res.payload === 201) {
        alert("datos actualizados");
        history.push("/cadeteOrders");
      } else alert("ocurrió un error");
    });
  };
  console.log("userrrrrrrrrrrr", user);

  return (
    <React.Fragment>
      <Navbar />
      <Typography variant="h6" gutterBottom>
        Editar el perfil
      </Typography>
      <form style={{ marginLeft: "7%" }}>
        <Grid container spacing={3}>
          {/* <Grid item xs={10} >
          <TextField
            required
            id="search"
            name="search"
            label="search"
            fullWidth
            classes={{ root: useStyles.inputRoot, input: useStyles.inputInput, }}
            inputProps={{ 'aria-label': 'search' }}
             onKeyDown= {(e)=>enter(e)} 
             value={value}
             onChange={(e)=>setValue(e.target.value)} 
             />
        </Grid> */}

          <Grid item xs={10}>
            <TextField
              name="firstName"
              id="nombre"
              label="Nombre"
              fullWidth
              placeholder={user && user.firstName}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={10}>
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

          <Grid item xs={10}>
            <TextField
              id="password"
              name="password"
              label="Contraseña"
              type="password"
              fullWidth
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={10}>
            <TextField
              name="phoneNum"
              id="phoneNum"
              label="Numero de telefono"
              fullWidth
              placeholder={user && user.phoneNum}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={10}>
            <InputLabel id="demo-simple-select-filled-label">
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
          color="primary"
          onClick={editCadete}
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

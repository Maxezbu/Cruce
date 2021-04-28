import React from "react";

import {
  CustomButton,
  CustomButtonB,
  StatusButton,
  StatusButtonB,
} from "./Button";
import { Container, Typography, Paper, Grid } from "@material-ui/core";

import { makeStyles } from "@material-ui/core/styles";

import { List, cadetes } from "./zList";
import NestedList from "./OrderList";
import Requests from "./Requests";

import "./style.css";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(1),
    textAlign: "center",
    color: theme.palette.text.secondary,
    width: "100%",
    borderRadius: 10,
    fontSize: 15,
  },
  container: {
    overflowX: "0 auto",
    marginRight: "0 auto",
    marginLeft: "0 auto",
    marginTop: "50px",
    padding: "10px",
    margin: "10px",
  },
}));

const StyledComponents = () => {
  const classes = useStyles();

  return (
    <div>
      <Container
        style={{ backgroundColor: "#eeeeee", marginTop: 20, marginBottom: 10 }}
      >
        <Typography>Botones</Typography>
        <CustomButtonB>Neutral</CustomButtonB>
        <CustomButtonB color="admin">Admin</CustomButtonB>
        <CustomButton>Cadete</CustomButton>
        <CustomButton color="red">Cadeteria</CustomButton>

        <StatusButton color="pending">Pendiente</StatusButton>
        <StatusButton>En camino</StatusButton>
        <StatusButtonB color="fulfilled">Entregado</StatusButtonB>
        <StatusButtonB>Devuelto a sucursal</StatusButtonB>
      </Container>
      <Container
        style={{ backgroundColor: "#e0e0e0", marginTop: 20, marginBottom: 10 }}
      >
        <Typography key="123">Tabla</Typography>
        <Grid container spacing={3} direction="column">
          {List.orders.map((order, i) => (
            <Grid key={i} item xs={11}>
              <Paper
                className={classes.paper}
                style={{
                  textAlign: "initial",
                  background:
                    "linear-gradient(45deg, #eeeeee, 30%, #9e9e9e 90%)",
                }}
              >
                <NestedList order={order} />
              </Paper>
            </Grid>
          ))}
        </Grid>
      </Container>

      <Container
        style={{ backgroundColor: "#e0e0e0", marginTop: 0, marginBottom: 10 }}
      >
        {cadetes.map((cadete, i) => (
          <Grid container key={i} spacing={10}>
            <Grid item xs={11}>
              <Paper
                className={classes.paper}
                style={{
                  textAlign: "initial",
                  background:
                    "linear-gradient(45deg, #eeeeee, 30%, #9e9e9e 90%)",
                }}
              >
                <Requests cadete={cadete} /* cadeteria={cadeteria}  */ />
              </Paper>
            </Grid>
          </Grid>
        ))}
      </Container>
    </div>
  );
};

export default StyledComponents;

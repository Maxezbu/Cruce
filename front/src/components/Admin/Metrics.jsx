import React, { useEffect } from "react";
import CssBaseline from "@material-ui/core/CssBaseline";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Orders from "./Orders";
import Tabla from "./dashboard";
import { useDispatch, useSelector } from "react-redux";
import { AllcadeteriasMetrics} from "../../state/orders";
import { allCadeterias } from "../../state/cadeterias";

import useStyles from "../../styles/stylesMetrics";


export default function Dashboard() {
  const dispatch = useDispatch();
  const classes = useStyles();
  const metrics = useSelector((state) => state.orders.metrics)

  useEffect(() => {
    dispatch(AllcadeteriasMetrics());
    dispatch(allCadeterias());
  }, []);

  return (
    <div>
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
        RENDIMIENTO CADETERIAS
      </Typography>

      <Container maxWidth="lg" className={classes.container}>
        <div className="tabla">
          <Tabla metricas={metrics} />
        </div>
      </Container>
      <div className={classes.root}>
        <CssBaseline />

        <main className={classes.content}>
          <div className={classes.appBarSpacer} />

          <Container maxWidth="lg" className={classes.container}>
            <Grid item xs={12}>
              <Typography
                variant="h6"
                style={{ color: "rgb(100,100,100)" }}
                align={"center"}
              >
                Detalle de Cadetes
              </Typography>
              <Paper className={classes.paper}>
                <Orders metricas={metrics} />
              </Paper>
            </Grid>
          </Container>
        </main>
      </div>
    </div>
  );
}

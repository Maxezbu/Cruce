import React, { useEffect } from "react";
import Chart from "./Chart";
import {
  CssBaseline,
  Typography,
  Container,
  Grid,
  Paper,
} from "@material-ui/core";
import ListMetricsCadete from "./ListMetricsCadete";
import { useDispatch, useSelector } from "react-redux";
import { AllcadetesMetrics } from "../../state/orders";
import useStyles from "../../styles/stylesCadeteriaMetrics";

export default function Dashboard() {
  const dispatch = useDispatch();
  const classes = useStyles();
  const metrics = useSelector((state) => state.orders.metrics);

  useEffect(() => {
    dispatch(AllcadetesMetrics());
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
        RENDIMIENTO CADETE
      </Typography>
      <Container maxWidth="lg" className={classes.container}>
        <div className="tabla">
          <Chart metricas={metrics} />
        </div>
      </Container>
      <div className={classes.root}>
        <CssBaseline />
        <main className={classes.content}>
          <div className={classes.appBarSpacer} />
          <Container maxWidth="lg" className={classes.container}>
            <Grid container spacing={5}>
              <Grid item xs={12}>
                <Typography
                  variant="h6"
                  style={{ color: "rgb(100,100,100)" }}
                  align={"center"}
                >
                  Detalle de Cadetes
                </Typography>
                <Paper className={classes.paper}>
                  <ListMetricsCadete metricas={metrics} />
                </Paper>
              </Grid>
            </Grid>
          </Container>
        </main>
      </div>
    </div>
  );
}

import React, { useEffect } from "react";
import {
  CssBaseline,
  Container,
  Grid,
  Paper,
  Typography,
} from "@material-ui/core";
import OrdenesEntregadas from "./OrdenesEntregadas";
import OrdenesDevueltas from "./OrdenesDevueltas";
import TiempoPromedioEntrega from "./TiempoPromedioEntrega";
import { useDispatch, useSelector } from "react-redux";
import {
  AllcadeteriasMetrics,
  allOrders,
  metricOrders,
} from "../../state/orders";
import clsx from "clsx";
import PromedioDeEspera from "../Admin/PromedioDeEspera";
import useStyles from "../../styles/styleSingleMetricsCadeteria";

export default function SingleMetricsCadeteria({ match }) {
  const dispatch = useDispatch();
  const orders = useSelector((state) => state.orders.orders);
  const classes = useStyles();

  useEffect(() => {
    dispatch(metricOrders({ id: match.id, model: "cadeteria" }));
    dispatch(AllcadeteriasMetrics());
    dispatch(allOrders(match.id));
  }, []);

  const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);

  return (
    <div>
      <div className={classes.root}>
        <CssBaseline />
        <main className={classes.content}>
          <div className={classes.appBarSpacer} />
          <Container maxWidth="lg" className={classes.container}>
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
              Rendimiento de {match.namecadeteria}
            </Typography>
            <Grid container spacing={5}>
              <Grid item xs={12} md={4} lg={3}>
                <Paper
                  style={{
                    background:
                      "linear-gradient(45deg, #545454 30%, #a6a6a6 95%)",
                    height: "50px",
                    display: "flex",
                    justifyContent: "center",
                    borderTopLeftRadius: 10,
                    borderTopRightRadius: 10,
                  }}
                  align={"center"}
                >
                  <Typography
                    variant="h6"
                    style={{ color: "white", margin: "auto" }}
                  >
                    Entregadas
                  </Typography>
                </Paper>
                <Paper className={fixedHeightPaper}>
                  <OrdenesEntregadas orders={orders} id={match.id} />
                </Paper>
              </Grid>
              <Grid item xs={12} md={4} lg={3}>
                <Paper
                  style={{
                    background:
                      "linear-gradient(45deg, #545454 30%, #a6a6a6 95%)",
                    height: "50px",
                    display: "flex",
                    justifyContent: "center",
                    borderTopLeftRadius: 10,
                    borderTopRightRadius: 10,
                  }}
                  align={"center"}
                >
                  <Typography
                    variant="h6"
                    style={{ color: "white", margin: "auto" }}
                  >
                    Promedio Entrega
                  </Typography>
                </Paper>
                <Paper className={fixedHeightPaper}>
                  <TiempoPromedioEntrega orders={orders} id={match.id} />
                </Paper>
              </Grid>
              <Grid item xs={12} md={4} lg={3}>
                <Paper
                  style={{
                    background:
                      "linear-gradient(45deg, #545454 30%, #a6a6a6 95%)",
                    height: "50px",
                    display: "flex",
                    justifyContent: "center",
                    borderTopLeftRadius: 10,
                    borderTopRightRadius: 10,
                  }}
                  align={"center"}
                >
                  <Typography
                    variant="h6"
                    style={{ color: "white", margin: "auto" }}
                  >
                    Promedio Espera
                  </Typography>
                </Paper>
                <Paper className={fixedHeightPaper}>
                  <PromedioDeEspera orders={orders} id={match.id} />
                </Paper>
              </Grid>
              <Grid item xs={12} md={4} lg={3}>
                <Paper
                  style={{
                    background:
                      "linear-gradient(45deg, #545454 30%, #a6a6a6 95%)",
                    height: "50px",
                    display: "flex",
                    justifyContent: "center",
                    borderTopLeftRadius: 10,
                    borderTopRightRadius: 10,
                  }}
                  align={"center"}
                >
                  <Typography
                    variant="h6"
                    style={{ color: "white", margin: "auto" }}
                  >
                    Devueltas a Sucursal
                  </Typography>
                </Paper>
                <Paper className={fixedHeightPaper}>
                  <OrdenesDevueltas orders={orders} id={match.id} />
                </Paper>
              </Grid>
            </Grid>
          </Container>
        </main>
      </div>
    </div>
  );
}

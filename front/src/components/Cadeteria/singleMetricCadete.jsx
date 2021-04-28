import React, { useEffect } from "react";
import clsx from "clsx";
import CssBaseline from "@material-ui/core/CssBaseline";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import DeliverOrders from "../Cadeteria/DeliverOrders";
import AverageTimeDeliver from "../Cadeteria/AverageTimeDeliver";
import ReturnedOrders from "../Cadeteria/ReturnedOrders";
import { useDispatch, useSelector } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import { allOrders } from "../../state/orders";

import AveragePendingTime from "./AveragePendingTime";

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  toolbar: {
    paddingRight: 24, // keep right padding when drawer closed
  },
  toolbarIcon: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    padding: "0 8px",
    ...theme.mixins.toolbar,
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: 36,
  },
  menuButtonHidden: {
    display: "none",
  },
  title: {
    flexGrow: 1,
  },
  drawerPaper: {
    position: "relative",
    whiteSpace: "nowrap",
    width: drawerWidth,
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerPaperClose: {
    overflowX: "hidden",
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    width: theme.spacing(7),
    [theme.breakpoints.up("sm")]: {
      width: theme.spacing(9),
    },
  },
  appBarSpacer: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    height: "100vh",
    overflow: "auto",
  },
  container: {
    paddingTop: theme.spacing(1),
    paddingBottom: theme.spacing(4),
  },
  paper: {
    padding: theme.spacing(2),
    display: "flex",
    overflow: "auto",
    flexDirection: "column",
  },
  fixedHeight: {
    height: 340,
  },
}));

export default function SingleMetricsCadeteria({ match }) {
  const dispatch = useDispatch();
  const classes = useStyles();
  const [open, setOpen] = React.useState(true);
  //   const metrics = useSelector((state) => state.orders.singleMetrics);
  const orders = useSelector((state) => state.orders.orders);
  const cadeteria = useSelector((state) => state.cadeterias.singleCadeteria);
  console.log("ACA ESTA EL MATCH", cadeteria);

  useEffect(() => {
    // dispatch(metricOrders({id:match.id,model:'cadete'}))
    if (cadeteria.id) dispatch(allOrders(cadeteria.id));
  }, [cadeteria]);

  const handleDrawerOpen = () => {
    setOpen(true);
  };
  const handleDrawerClose = () => {
    setOpen(false);
  };
  const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);

  return (
    <div>
      <div className="tabla">{/* <Tabla metricas = {metrics} /> */}</div>

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
              Rendimiento de {match.namecadete}
            </Typography>{" "}
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
                  <DeliverOrders orders={orders} id={match.id} />
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
                  </Typography>{" "}
                </Paper>
                <Paper className={fixedHeightPaper}>
                  <AverageTimeDeliver orders={orders} id={match.id} />
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
                  </Typography>{" "}
                </Paper>
                <Paper className={fixedHeightPaper}>
                  <AveragePendingTime orders={orders} id={match.id} />
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
                  </Typography>{" "}
                </Paper>
                <Paper className={fixedHeightPaper}>
                  <ReturnedOrders orders={orders} id={match.id} />
                </Paper>
              </Grid>
            </Grid>
          </Container>
        </main>
      </div>
    </div>
  );
}

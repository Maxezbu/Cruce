import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Link } from "react-router-dom";
import {
  InputLabel,
  MenuItem,
  Select,
  FormControl,
  Grid,
  Paper,
  List,
  ListItem,
  ListItemText,
  Typography,
  CssBaseline,
  Container,
  Tooltip,
} from "@material-ui/core";
import { useSelector, useDispatch } from "react-redux";
import { adminOrders, allOrders } from "../../state/orders";
import socket from "../../utils/socket";
import { fetchCad } from "../../state/cadeterias";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    maxWidth: 752,
  },
  demo: {
    backgroundColor: theme.palette.background.paper,
  },
  title: {
    margin: theme.spacing(4, 0, 2),
  },
  container: {
    paddingTop: theme.spacing(1),
    paddingBottom: theme.spacing(1.5),
  },
}));

const ListOrders = () => {
  const classes = useStyles();
  const cadeteria = useSelector((state) => state.cadeterias.singleCadeteria);
  const orders = useSelector((state) => state.orders.orders);
  const [selected, setSelected] = useState("Pendiente");
  const dispatch = useDispatch();

  useEffect(() => {
    if (cadeteria.id) {
      dispatch(allOrders(cadeteria.id));
      socket.emit("conectado", cadeteria.nameCompany);
    }
  }, [cadeteria]);

  socket.on("ordenes", (ordenes) => {
    return dispatch(adminOrders());
  });

  socket.on("orden", (ordenes) => {
    dispatch(allOrders(cadeteria.id));
  });

  socket.on("cadeterias", () => {
    dispatch(fetchCad());
  });

  const selectStateOrders = (par) => {
    setSelected(par);
  };
  return (
    <div style={{ display: "grid", placeSelf: "center" }}>
      <CssBaseline />
      <Typography
        variant="h4"
        key="1"
        style={{
          display: "grid",
          placeSelf: "center",
          textAlign: "center",
          marginTop: 45,
          marginBottom: 50,
          color: "black",
          fontWeight: "bold",
        }}
      >
        LISTA DE ORDENES
      </Typography>

      <div>
        <Grid
          item
          xs={12}
          style={{ display: "grid", placeItems: "center", marginBottom: 20 }}
        >
          <FormControl variant="outlined" style={{ minWidth: 395 }}>
            <InputLabel htmlFor="outlined-age-native-simple">
              Estado de ordenes
            </InputLabel>
            <Select
              fullWidth
              labelId="demo-simple-select-filled-label"
              label="Medio de transporte"
              name="vehicle"
              id="demo-simple-select-filled"
              defaultValue="Pendientes"
            >
              <MenuItem
                value={"Pendientes"}
                key={1}
                onClick={() => selectStateOrders("Pendiente")}
              >
                Pendientes
              </MenuItem>
              <MenuItem
                value={"En Camino"}
                key={2}
                onClick={() => selectStateOrders("En camino")}
              >
                En Camino
              </MenuItem>
              <MenuItem
                value={"Entregadas"}
                key={3}
                onClick={() => selectStateOrders("Entregado")}
              >
                Entregado
              </MenuItem>
              <MenuItem
                value={"Devueltas a Sucursal"}
                key={4}
                onClick={() => selectStateOrders("Devuelto a sucursal")}
              >
                Devueltas a Sucursal
              </MenuItem>
            </Select>
          </FormControl>
        </Grid>

        <List>
          {orders &&
            orders.map((order) => {
              if (
                order.cadeteriumId === cadeteria.id ||
                (order.status === selected && order.cadeteriumId == null)
              ) {
                return order.status === selected ? (
                  <Container maxWidth="lg" className={classes.container}>
                    <Paper elevation={1}>
                      <ListItem key={order.id}>
                        <Tooltip title="Ir al detalle">
                          <Link
                            to={`/cadeteria/metrics/singleOrder/${order.id}/${order.orderNumber}`}
                            style={{ textDecoration: "none", color: "black" }}
                          >
                            <ListItemText
                              primary={
                                order.street +
                                " " +
                                order.number +
                                " " +
                                (order.complement ? order.complement : "")
                              }
                            />
                          </Link>
                        </Tooltip>
                      </ListItem>
                    </Paper>
                  </Container>
                ) : null;
              }
            })}
        </List>
      </div>
    </div>
  );
};

export default ListOrders;

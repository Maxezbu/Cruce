import React, { useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import ListItemText from "@material-ui/core/ListItemText";
import IconButton from "@material-ui/core/IconButton";
import { Link } from "react-router-dom";
import { Button } from "@material-ui/core";
import { useSelector, useDispatch } from "react-redux";
import { ordersList } from "../../state/orders";
// import { orderState} from "../state/order";

import CadeteriaNavbar from "./CadeteriaNavbar";

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
}));

const ListOrders = () => {
  const classes = useStyles();
  const [dense, setDense] = React.useState(false);
  const dispatch = useDispatch();
  const orders = useSelector((state) => state.orders.orders);
  const cadeteria = useSelector((state) => state.cadeteria);

  useEffect(() => {
    dispatch(ordersList());
  }, []);

  return (
    <>
      <CadeteriaNavbar />
      <div className={classes.root}>
        <div>
          <h1 className="titulo">Lista de Ordenes</h1>
        </div>
        <div>
          <h3 className="titulo">Entregadas</h3>
        </div>
        <div className={classes.demo}>
          <List dense={dense}>
            {orders &&
              orders.map((order) => {
                return order.cadeteriumId == cadeteria.id &&
                  order.status == "Entregado" ? (
                  <ListItem key={order.id}>
                    <Link to={`/cadeteria/singleOrder/${order.id}`}>
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
                    <ListItemSecondaryAction>
                      <IconButton>
                        <Button variant="outlined" color="primary">
                          {order.status}
                        </Button>
                      </IconButton>
                    </ListItemSecondaryAction>
                  </ListItem>
                ) : null;
              })}
          </List>
        </div>

        <div>
          <h3 className="titulo"> En Camino</h3>
        </div>
        <div className={classes.demo}>
          <List dense={dense}>
            {orders &&
              orders.map((order) => {
                return order.cadeteriumId == cadeteria.id &&
                  order.status == "En camino" ? (
                  <ListItem key={order.id}>
                    <Link to={`/cadeteria/singleOrder/${order.id}`}>
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
                    <ListItemSecondaryAction>
                      <IconButton>
                        <Button variant="outlined" color="primary">
                          {order.status}
                        </Button>
                      </IconButton>
                    </ListItemSecondaryAction>
                  </ListItem>
                ) : null;
              })}
          </List>
        </div>

        <div>
          <h3 className="titulo"> Devuelto a Sucursal</h3>
        </div>
        <div className={classes.demo}>
          <List dense={dense}>
            {orders &&
              orders.map((order) => {
                return order.cadeteriumId == cadeteria.id &&
                  order.status == "Devuelto a sucursal" ? (
                  <ListItem key={order.id}>
                    <Link to={`/cadeteria/singleOrder/${order.id}`}>
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
                    <ListItemSecondaryAction>
                      <IconButton>
                        <Button variant="outlined" color="primary">
                          {order.status}
                        </Button>
                      </IconButton>
                    </ListItemSecondaryAction>
                  </ListItem>
                ) : null;
              })}
          </List>
        </div>

        <div>
          <h3 className="titulo">Pendientes (Todas las cadeterías)</h3>
        </div>
        <div className={classes.demo}>
          <List dense={dense}>
            {orders &&
              orders.map((order) => {
                return order.status == "Pendiente" ? (
                  <ListItem key={order.id}>
                    <Link to={`/cadeteria/singleOrder/${order.id}`}>
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
                    <ListItemSecondaryAction>
                      <IconButton>
                        <Button variant="outlined" color="primary">
                          {order.status}
                        </Button>
                      </IconButton>
                    </ListItemSecondaryAction>
                  </ListItem>
                ) : null;
              })}
          </List>
        </div>
      </div>
    </>
  );
};

export default ListOrders;

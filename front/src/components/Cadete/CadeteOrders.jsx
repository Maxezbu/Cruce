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
import { ordersList, orderState } from "../../state/orders";
// import { orderState} from "../state/order";

import Navbar from "../Navbar";

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

const CadeteOrders = () => {
  const classes = useStyles();
  const [dense, setDense] = React.useState(false);
  const dispatch = useDispatch();
  const orders = useSelector((state) => state.orders.orders);
  const cadete = useSelector((state) => state.cadete);

  useEffect(() => {
    dispatch(ordersList());
  }, []);

  const ordersToShow = [];

  // const filter = (orders) => {
  //   orders.map((order) => {
  //     order.userId == cadete.id || order.userId == null
  //       ? ordersToShow.push(order)
  //       : null;
  //   });
  // };

  const update = (orderNumber, status, cadeteId) => {
    let state;
    if (status == "En camino") {
      state = "Entregado";
    }
    if (status === "Pendiente") {
      state = "En camino";
    }

    dispatch(
      orderState({ orderNumber: orderNumber, state: state, cadeteId: cadeteId })
    );
  };

  return (
    <>
      <div className={classes.root}>
        <div>
          <h1 className="titulo">Lista de Ordenes</h1>
        </div>
        <div className={classes.demo}>
          <List dense={dense}>
            {orders &&
              orders.map((order) => {
                return order.status != "Entregado" &&
                  order.status != "Devuelto a sucursal" &&
                  (order.userId === cadete.id || order.userId == null) ? (
                  <ListItem key={order.id}>
                    <Link
                      to={`/cadete/singleOrder/${order.id}/${order.orderNumber}`}
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
                    <ListItemSecondaryAction>
                      <IconButton>
                        <Button
                          variant="outlined"
                          color="primary"
                          onClick={() => {
                            update(order.orderNumber, order.status, cadete.id);
                          }}
                        >
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

export default CadeteOrders;

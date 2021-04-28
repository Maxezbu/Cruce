import React from "react";
import { Link } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import { Typography, Grid } from "@material-ui/core";

const useStyles = makeStyles({
  depositContext: {
    flex: 1,
  },
});

export default function OrdenesEntregadas({ orders, id }) {
  const classes = useStyles();
  return (
    <React.Fragment>
      <Typography component="p" variant="h4"></Typography>
      <Typography color="textSecondary" className={classes.depositContext}>
        {orders &&
          orders.map((order) => {
            if (order.userId == id) {
              return order.status == "Entregado" ? (
                <Grid container direction="row" justify="space-between">
                  <Grid item>
                    <Link
                      style={{ textDecoration: "none" }}
                      to={`/cadeteria/metrics/SingleOrder/${order.id}/${order.orderNumber}`}
                    >
                      <Typography variant="subtitle1">
                        {order.orderNumber}
                      </Typography>
                    </Link>
                  </Grid>
                  <Grid item>
                    <Typography variant="subtitle1">
                      {order.deliveryDate.toString().slice(0, [10])}
                    </Typography>
                  </Grid>
                </Grid>
              ) : null;
            }
          })}
      </Typography>
    </React.Fragment>
  );
}

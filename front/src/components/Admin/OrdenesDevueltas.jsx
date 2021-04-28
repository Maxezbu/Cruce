import React from "react";
import { Link } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import { Grid } from "@material-ui/core";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles({
  depositContext: {
    flex: 1,
  },
});

export default function OrdenesEntregadas({ orders, id }) {
  console.log(id);

  const classes = useStyles();
  return (
    <React.Fragment>
      <Typography component="p" variant="h4"></Typography>
      <Typography color="textSecondary" className={classes.depositContext}>
        {orders.map((order) => {
          if (order.cadeteriumId == id) {
            return order.status == "Devuelto a sucursal" ? (
              <Grid container direction="row" justify="space-between">
                <Grid item>
                  <Link
                    style={{ textDecoration: "none" }}
                    to={`/admin/metrics/SingleOrder/${order.id}/${order.orderNumber}`}
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

import React from "react";
import Typography from "@material-ui/core/Typography";
import { Grid } from "@material-ui/core";

export default function OrdenesEntregadas({ orders, id }) {
  let conversor = (tiempo) => {
    let enMinutos = tiempo / 1000 / 60;
    let hs = enMinutos / 60;
    let minutos = enMinutos % 60;

    return Math.floor(hs) + " Hs : " + Math.round(minutos) + " Min";
  };
  return (
    <>
      {orders &&
        orders.map((order) => {
          if (order.userId == id) {
            return order.status == "Entregado" ? (
              <Grid container direction="row" justify="space-between">
                <Grid item>
                  <Typography variant="subtitle1">
                    {order.orderNumber}
                  </Typography>
                </Grid>
                <Grid item>
                  <Typography variant="subtitle1">
                    {conversor(order.inTransit)}
                  </Typography>
                </Grid>
              </Grid>
            ) : null;
          }
        })}
    </>
  );
}

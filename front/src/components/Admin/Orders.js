import React from "react";
import { Link } from "react-router-dom";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@material-ui/core";

export default function Orders({ metricas }) {
  function createData(
    name,
    deliver,
    returned,
    averageTimeDeli,
    averageTimePick,
    id
  ) {
    return { name, deliver, returned, averageTimeDeli, averageTimePick, id };
  }

  let conversor = (tiempo) => {
    let enMinutos = tiempo / 1000 / 60;
    let hs = enMinutos / 60;
    let minutos = enMinutos % 60;

    return Math.floor(hs) + " Hs : " + Math.round(minutos) + " Min";
  };

  const dataRow = (obj) => {
    let resultado = [];
    for (const id in obj) {
      resultado.push(
        createData(
          obj[id].name,
          obj[id].deliver,
          obj[id].returned,
          conversor(obj[id].averageTimeDeli),
          conversor(obj[id].averageTimePick),
          id
        )
      );
    }
    return resultado;
  };
  
  const rows = dataRow(metricas);
  return (
    <React.Fragment>
      <Table size="medium">
        <TableHead>
          <TableRow>
            <TableCell>Cadeteria</TableCell>
            <TableCell>Entregadas</TableCell>
            <TableCell>A Sucursal</TableCell>
            <TableCell>Tiempo Entrega</TableCell>
            <TableCell>Tiempo Espera</TableCell>
            <TableCell>Detalle</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => {
            console.log(row);
            return (
              <TableRow key={row.id}>
                <TableCell align="left">{row.name}</TableCell>
                <TableCell align="center">{row.deliver}</TableCell>
                <TableCell align="center">{row.returned}</TableCell>
                <TableCell align="center">{row.averageTimeDeli}</TableCell>
                <TableCell align="right">{row.averageTimePick}</TableCell>

                <TableCell align="right">
                  <Link
                    to={`/admin/metrics/${row.id}/cadeteria/${row.name}`}
                    style={{ textDecoration: "none" }}
                  >
                    Ver
                  </Link>
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </React.Fragment>
  );
}

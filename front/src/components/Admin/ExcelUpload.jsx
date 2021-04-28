import React, { useState } from "react";
import { Link } from "react-router-dom";
import * as XLSX from "xlsx";
import {
  Button,
  Container,
  Grid,
  CssBaseline,
  Typography,
  CircularProgress,
  Fab,
} from "@material-ui/core";
import clsx from "clsx";
import socket from "../../utils/socket";
import CheckIcon from "@material-ui/icons/Check";
import SaveIcon from "@material-ui/icons/Save";
import useStyles from "../../styles/stylesProgress";

import { upLoadOrders } from "../../state/orders";
import { useDispatch, useSelector } from "react-redux";
import { adminOrders } from "../../state/orders";

const ExcelUpload = () => {
  const [items, setItems] = useState([]);
  const orders = useSelector((state) => state.orders.orders);
  const dispatch = useDispatch();
  const classes = useStyles();

  const [loading, setLoading] = React.useState(false);
  const [success, setSuccess] = React.useState(false);

  const buttonClassname = clsx({
    [classes.buttonSuccess]: success,
  });
  const readExcel = (file) => {
    const promise = new Promise((resolve, reject) => {
      if (!loading) {
        setSuccess(false);
        setLoading(true);
      }

      const fileReader = new FileReader();
      fileReader.readAsArrayBuffer(file);

      fileReader.onload = (e) => {
        const bufferArray = e.target.result;
        const wb = XLSX.read(bufferArray, { type: "buffer" });
        const wsname = wb.SheetNames;
        const ws = wb.Sheets[wsname];
        const data = XLSX.utils.sheet_to_json(ws);
        resolve(data);
      };

      fileReader.onerror = (error) => {
        alert(error);
      };
    });

    promise.then((data) => {
      setItems(data);
      setSuccess(true);
      setLoading(false);
    });
  };

  const upload = () => {
    dispatch(upLoadOrders({ items })).then((res) => {
      if (res.payload === 200) {
        dispatch(adminOrders());
        alert("Tu archivo se cargo correctamente");
      } else {
        alert("Hubo un error en la carga");
      }
    });
    socket.emit("ordenes", orders);
  };

  return (
    <React.Fragment>
      <CssBaseline />
      <Typography
        variant="h4"
        key="1"
        style={{
          textAlign: "center",
          marginTop: 45,
          marginBottom: 50,
          color: "rgb(100,100,100)",
          fontWeight: "bold",
        }}
      >
        CARGAR ORDENES
      </Typography>
      <main>
        <div>
          <Container justify="center" maxWidth="sm">
            <div>
              <Grid container spacing={4} justify="center">
                <Grid item xs={12}>
                  <div className={classes.root}>
                    <input
                      style={{ display: "none" }}
                      className={classes.input}
                      id="contained-button-file"
                      multiple
                      type="file"
                      onChange={(e) => {
                        const file = e.target.files[0];
                        if (
                          file.name.slice(
                            file.name.length - 4,
                            file.name.length
                          ) === ".xls" ||
                          file.name.slice(
                            file.name.length - 5,
                            file.name.length
                          ) === ".xlsx"
                        ) {
                          readExcel(file);
                        } else {
                          alert("Archivo Invalido");
                          e.target.value = "";
                        }
                      }}
                    />
                    <label htmlFor="contained-button-file">
                      <Button
                        variant="contained"
                        color="primary"
                        component="span"
                      >
                        Seleccionar archivo
                      </Button>
                    </label>
                  </div>
                </Grid>
                <Grid item xs={12}>
                  <Link
                    to="/admin"
                    style={{ textDecoration: "none", color: "inherit" }}
                  ></Link>
                  <div className={classes.root}>
                    <div className={classes.wrapper}>
                      <Fab
                        aria-label="save"
                        color="primary"
                        className={buttonClassname}
                        onClick={upload}
                      >
                        {success ? <CheckIcon /> : <SaveIcon />}
                      </Fab>
                      {loading && (
                        <CircularProgress
                          size={68}
                          className={classes.fabProgress}
                        />
                      )}
                    </div>
                  </div>
                  <div className={classes.wrapper}>
                    <Button
                      variant="contained"
                      color="primary"
                      disabled={loading}
                      onClick={upload}
                    >
                      Cargar Excel
                    </Button>
                    {loading && (
                      <CircularProgress
                        size={24}
                        className={classes.buttonProgress}
                      />
                    )}
                  </div>
                </Grid>
              </Grid>
            </div>
          </Container>
        </div>
      </main>
    </React.Fragment>
  );
};

export default ExcelUpload;

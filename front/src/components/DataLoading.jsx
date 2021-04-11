import React, { useState } from "react";
import * as XLSX from "xlsx";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import Grid from "@material-ui/core/Grid";
import Container from "@material-ui/core/Container";
import { Link } from "react-router-dom";
import adminMenuStyles from "../utils/stylesAdmin";
import { upLoadOrders } from "../state/admin";
import { useDispatch } from "react-redux";
import Navbar from "./Navbar";

const Prueba = () => {
  const classes = adminMenuStyles();
  const [items, setItems] = useState([]);
  const dispatch = useDispatch();

  const readExcel = (file) => {
    const promise = new Promise((resolve, reject) => {
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
    });
  };

  const upload = () => {
    dispatch(upLoadOrders({ items })).then((res) => {
      console.log("PEEEEEEEEEEEEEEEEEEE", res);
      if (res.payload === 200) {
        alert("Tu archivo se cargo correctamente");
      } else {
        alert("Hubo un error en la carga");
      }
    });
  };
  return (
    <React.Fragment>
    <Navbar/>
      <CssBaseline />
      <main>
        {/* Hero unit */}
        <div className={classes.heroContent}>
          <Container maxWidth="sm">
            <div className={classes.heroButtons}>
              <Grid container spacing={4} justify="center">
                <Grid item xs={12}>
                  <input
                    type="file"
                    className="file"
                    onChange={(e) => {
                      const file = e.target.files[0];
                      if (
                        file.name.slice(
                          file.name.length - 4,
                          file.name.length
                        ) == ".xls" ||
                        file.name.slice(
                          file.name.length - 5,
                          file.name.length
                        ) == ".xlsx"
                      ) {
                        readExcel(file);
                      } else {
                        alert("Archivo Invalido");
                        e.target.value = "";
                      }
                    }}
                  />
                </Grid>
                <Grid item xs={12}>
                  <Link
                    to="/admin"
                    style={{ textDecoration: "none", color: "inherit" }}
                  >
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={upload}
                    >
                      Cargar archivo
                    </Button>
                  </Link>
                </Grid>
              </Grid>
            </div>
          </Container>
        </div>
      </main>
    </React.Fragment>

    // <div>
    //   <input
    //     type="file"
    //     onChange={(e) => {
    //       const file = e.target.files[0];
    //       readExcel(file);
    //     }}
    //   />
    //   <button onClick={upload}>subir a la base de datos</button>
    // </div>
  );
};

export default Prueba;

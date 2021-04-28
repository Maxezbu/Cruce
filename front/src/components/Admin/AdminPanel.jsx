import React from "react";
import { CustomButtonB } from "../../utils/Buttons";
import { CssBaseline, Grid, Container } from "@material-ui/core";
import { Link } from "react-router-dom";

const AdminPanel = () => {
  return (
    <>
      <CssBaseline />
      <div
        style={{
          display: "grid",
          placeContent: "center",
          placeItems: "center",
          placeSelf: "center",
        }}
      >
        <Container maxWidth="md" style={{marginTop: 80}}>
          <Grid container spacing={4} justify="center" >
            <Grid item xs={14}>
              <Link
                to="/admin/listCadeterias"
                style={{ textDecoration: "none", color: "inherit" }}
              >
                <CustomButtonB color="admin" variant="contained">
                  Cadeteria
                </CustomButtonB>
              </Link>
            </Grid>
            <Grid item xs={15}>
              <Link
                to="/admin/listCadetes"
                style={{ textDecoration: "none", color: "inherit" }}
              >
                <CustomButtonB color="admin" variant="contained">
                  Cadete
                </CustomButtonB>
              </Link>
            </Grid>
            <Grid item xs={16}>
              <Link
                to="/admin/metrics"
                style={{ textDecoration: "none", color: "inherit" }}
              >
                <CustomButtonB color="admin" variant="contained">
                  Metricas
                </CustomButtonB>
              </Link>
            </Grid>
            <Grid item xs={17}>
              <Link
                to="/admin/cadeteriaRequest"
                style={{ textDecoration: "none", color: "inherit" }}
              >
                <CustomButtonB color="admin" variant="contained">
                  Solicitudes
                </CustomButtonB>
              </Link>
            </Grid>
            <Grid item xs={18}>
              <Link
                to="/admin/uploadorders"
                style={{ textDecoration: "none", color: "inherit" }}
              >
                <CustomButtonB color="admin" variant="contained">
                  Cargar Ordenes
                </CustomButtonB>
              </Link>
            </Grid>
          </Grid>
        </Container>
      </div>
    </>
  );
};

export default AdminPanel;

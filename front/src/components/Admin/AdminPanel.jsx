import React from "react";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import Grid from "@material-ui/core/Grid";
import Container from "@material-ui/core/Container";
import { Link } from "react-router-dom";
import adminMenuStyles from "../../utils/stylesAdmin";

const AdminPanel = () => {
  const classes = adminMenuStyles();

  return (
    <React.Fragment>
      <CssBaseline />
      <main>
        <div className={classes.heroContent}>
          <Container maxWidth="sm">
            <div className={classes.heroButtons}>
              <Grid container spacing={4} justify="center">
                <Grid item xs={14}>
                  <Link
                    to="/admin/listCadeterias"
                    style={{ textDecoration: "none", color: "inherit" }}
                  >
                    <Button variant="contained" className={classes.button_admin}>
                      Cadeteria
                    </Button>
                  </Link>
                </Grid>
                <Grid item xs={15}>
                  <Link
                    to="/admin/listCadetes"
                    style={{ textDecoration: "none", color: "inherit" }}
                  >
                    <Button variant="contained" className={classes.button_admin}>
                      Cadete
                    </Button>
                  </Link>
                </Grid>
                <Grid item xs={16}>
                  <Link
                    to="/admin/orders"
                    style={{ textDecoration: "none", color: "inherit" }}
                  >
                    <Button variant="contained" className={classes.button_admin}>
                      Metricas
                    </Button>
                  </Link>
                </Grid>
                <Grid item xs={17}>
                  <Link
                    to="/admin/cadeteriaRequest"
                    style={{ textDecoration: "none", color: "inherit" }}
                  >
                    <Button variant="contained" className={classes.button_admin}>
                      Solicitudes
                    </Button>
                  </Link>
                </Grid>
                <Grid item xs={18}>
                  <Link
                    to="/admin/uploadorders"
                    style={{ textDecoration: "none", color: "inherit" }}
                  >
                    <Button variant="contained" className={classes.button_admin}>
                      Cargar Ordenes
                    </Button>
                  </Link>
                </Grid>
              </Grid>
            </div>
          </Container>
        </div>
      </main>
    </React.Fragment>
  );
};

export default AdminPanel;

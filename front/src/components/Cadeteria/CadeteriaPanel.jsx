import React from "react";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import Grid from "@material-ui/core/Grid";
import Container from "@material-ui/core/Container";
import { Link } from "react-router-dom";
import adminMenuStyles from "../../utils/stylesAdmin";

const CadeteriaPanel = () => {
  const classes = adminMenuStyles();

  return (
    <React.Fragment>
      <CssBaseline />
      <main>
        <div className={classes.heroContent}>
          <Container maxWidth="sm">
            <div className={classes.heroButtons}>
              <Grid container spacing={4} justify="center" >
                <Grid item xs={13}>
                  <Link
                    to="/cadeteria/listOrders"
                    style={{ textDecoration: "none", color: "inherit" }}
                  >
                    <Button
                      variant="contained"
                      className={classes.button_panel}
                    >
                      Ordenes
                    </Button>
                  </Link>
                </Grid>
                <Grid item xs={14}>
                  <Link
                    to="/cadeteria/listCadetes"
                    style={{ textDecoration: "none", color: "inherit" }}
                  >
                    <Button
                      variant="contained"
                      className={classes.button_panel}
                    >
                      Lista de Cadetes
                    </Button>
                  </Link>
                </Grid>
                <Grid item xs={15}>
                  <Link
                    to="/cadeteria/perfil"
                    style={{ textDecoration: "none", color: "inherit" }}
                  >
                    <Button
                      variant="contained"
                      className={classes.button_panel}
                    >
                      Perfil
                    </Button>
                  </Link>
                </Grid>
                <Grid item xs={16}>
                  <Link
                    to="/cadeteria/solicitudes"
                    style={{ textDecoration: "none", color: "inherit" }}
                  >
                    <Button
                      variant="contained"
                      className={classes.button_panel}
                    >
                      Solicitudes pendientes
                    </Button>
                  </Link>
                </Grid>
                <Grid item xs={17}>
                  <Link
                    to="/cadeteria/metricas"
                    style={{ textDecoration: "none", color: "inherit" }}
                  >
                    <Button
                      variant="contained"
                      className={classes.button_panel}
                    >
                      Metricas
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

export default CadeteriaPanel;

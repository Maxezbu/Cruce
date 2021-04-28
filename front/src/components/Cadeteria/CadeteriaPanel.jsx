import React from "react";
import { CustomButton } from "../../utils/Buttons";
import { CssBaseline, Grid, Container } from "@material-ui/core";
import { Link } from "react-router-dom";
import adminMenuStyles from "../../styles/stylesAdmin";

const CadeteriaPanel = () => {
  const classes = adminMenuStyles();

  return (
    <React.Fragment>
      <CssBaseline />
        <div >
          <Container maxWidth="sm">
            <div className={classes.heroButtons}>
              <Grid container spacing={4} justify="center">
                <Grid item xs={13}>
                  <Link
                    to="/cadeteria/listOrders"
                    style={{ textDecoration: "none", color: "inherit" }}
                  >
                    <CustomButton color="red" variant="contained">
                      Ordenes
                    </CustomButton>
                  </Link>
                </Grid>
                <Grid item xs={14}>
                  <Link
                    to="/cadeteria/listCadetes"
                    style={{ textDecoration: "none", color: "inherit" }}
                  >
                    <CustomButton color="red" variant="contained">
                      Lista de Cadetes
                    </CustomButton>
                  </Link>
                </Grid>
                <Grid item xs={15}>
                  <Link
                    to="/cadeteria/perfil"
                    style={{ textDecoration: "none", color: "inherit" }}
                  >
                    <CustomButton color="red" variant="contained">
                      Perfil
                    </CustomButton>
                  </Link>
                </Grid>
                <Grid item xs={16}>
                  <Link
                    to="/cadeteria/solicitudes"
                    style={{ textDecoration: "none", color: "inherit" }}
                  >
                    <CustomButton color="red" variant="contained">
                      Solicitudes pendientes
                    </CustomButton>
                  </Link>
                </Grid>
                <Grid item xs={17}>
                  <Link
                    to="/cadeteria/metricas"
                    style={{ textDecoration: "none", color: "inherit" }}
                  >
                    <CustomButton color="red" variant="contained">
                      Metricas
                    </CustomButton>
                  </Link>
                </Grid>
              </Grid>
            </div>
          </Container>
        </div>
    </React.Fragment>
  );
};

export default CadeteriaPanel;

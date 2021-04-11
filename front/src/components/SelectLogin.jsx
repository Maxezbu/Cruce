import React, { useState } from "react";
import Button from "@material-ui/core/Button";

import useStyles from "../utils/stylesRegister";

import HomeNavbar from "../components/HomeNavbar";
import { useHistory } from "react-router";

import MotorcycleIcon from "@material-ui/icons/Motorcycle";

import Box from "@material-ui/core/Box";
import { Avatar } from "@material-ui/core";

const Main = () => {
  const classes = useStyles();
  const history = useHistory();

  return (
    <div>
      <HomeNavbar />
      
      <div>
        <h1>Ingresar como</h1>
        <Box 
          display="flex"
          justifyContent="center"
          flexDirection="column"
          style={{ marginTop: "4rem"}}
          bgcolor="#f6f6f6"
        >
        
          <Box
            display="flex"
            justifyContent="center"
            m={1}
            p={1}
            bgcolor="#f6f6f6"
          >
            <Box p={1} bgcolor="#f6f6f6">
              <Box display="flex" justifyContent="center">
              <img
                  className={classes.large2}
                  src={process.env.PUBLIC_URL + "deli.png"}
                  alt=""
                />
              </Box>
              <Button
                color="primary"
                variant="contained"
                size="large"
                className={classes.button_cadete}
                onClick={() => history.push("/login")}
              >
                Cadete
              </Button>
            </Box>
          </Box>

          <Box
            display="flex"
            justifyContent="center"
            m={1}
            p={1}
            bgcolor="#f6f6f6"
          >
            <Box p={1} bgcolor="#f6f6f6">
              <Box display="flex" justifyContent="center">
                <img
                  className={classes.large}
                  src={process.env.PUBLIC_URL + "asd.png"}
                  alt=""
                />
              </Box>
              <Button
                variant="contained"
                color="secondary"
                onClick={() => history.push("/cadeteria/login")}
                size="large"
                className={classes.button_cadeteria}
              >
                Cadeteria
              </Button>
            </Box>
          </Box>
        </Box>
      </div>
    </div>
  );
};

export default Main;

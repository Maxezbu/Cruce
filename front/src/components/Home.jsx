import React, { useState } from "react";
import Box from "@material-ui/core/Box";

import CssBaseline from "@material-ui/core/CssBaseline";

import Grid from "@material-ui/core/Grid";
import useStyles from "../utils/stylesRegister";

import { makeStyles } from "@material-ui/core/styles";

import Button from "@material-ui/core/Button";

import HomeNavbar from "./HomeNavbar";

import { useHistory } from "react-router-dom";




// const useStyles = makeStyles((theme) => ({
//   root: {
//     display: "flex",
//     flexWrap: "wrap",
//     "& > *": {
//       margin: theme.spacing(1),
//       width: theme.spacing(16),
//       height: theme.spacing(16),
//     },
  
//   },


// }));

const Home = () => {
  const history = useHistory();
  const classes = useStyles();
  return (

      <div>
      <HomeNavbar />
      
      <div>
        <h1></h1>
        <Box 
          display="flex"
          justifyContent="center"
          flexDirection="column"
          style={{ marginTop: "1rem"}}
     
        >
        
          <Box
            display="flex"
            justifyContent="center"
            m={1}
            p={1}
       
          >
            <Box p={1} >
              <Box display="flex" justifyContent="center">
              <img
                  className={classes.largeMoto}
                  src={process.env.PUBLIC_URL + "moto.png"}
                  alt=""
                />
              </Box>
              <Button
                color="primary"
                variant="contained"
                size="large"
                className={classes.button_home}
                onClick={() => history.push("/select")}
              >
                Registrarse
              </Button>
            </Box>
          </Box>

          <Box
            display="flex"
            justifyContent="center"
            m={1}
            p={1}
     
          >
            <Box p={1} >
              <Box display="flex" justifyContent="center">
                {/* <img
                  className={classes.large}
                  src={process.env.PUBLIC_URL + "asd.png"}
                  alt=""
                />   */}
              </Box>
              <Button
               color="primary"
               variant="contained"
               size="large"
               className={classes.button_home}
                onClick={() => history.push("/selectLogin")}
              >
                Loguearse
              </Button>
            </Box>
          </Box>
        </Box>
      </div>
    </div>
  );
};

export default Home;

import React from "react";
import Button from "@material-ui/core/Button";
import useStyles from "../utils/stylesRegister";
import { useHistory } from "react-router";
import Box from "@material-ui/core/Box";


const Main = () => {
  const classes = useStyles();
  const history = useHistory();

  return (
    <div>

      <div>
      <h1>Registrarse como</h1>
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
                onClick={() => history.push("/register-as/cadete")}
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
                onClick={() => history.push("/register-as/cadeteria")}
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

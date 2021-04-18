import React from "react";
import Box from "@material-ui/core/Box";

import useStyles from "../utils/stylesRegister";
import Button from "@material-ui/core/Button";
import { useHistory } from "react-router-dom";

const Home = () => {
  const history = useHistory();
  const classes = useStyles();
  return (
    <div>
      <div>
        <Box
          display="flex"
          justifyContent="center"
          flexDirection="column"
          style={{ marginTop: "1rem" }}
        >
          <Box display="flex" justifyContent="center" m={1} p={1}>
            <Box p={1}>
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
                onClick={() => history.push("/register-as")}
              >
                Registrarse
              </Button>
            </Box>
          </Box>

          <Box display="flex" justifyContent="center" m={1} p={1}>
            <Box p={1}>
              <Box display="flex" justifyContent="center">
              </Box>
              <Button
                color="primary"
                variant="contained"
                size="large"
                className={classes.button_home}
                onClick={() => history.push("/login-as")}
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

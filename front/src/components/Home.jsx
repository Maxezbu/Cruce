import React from "react";
import Box from "@material-ui/core/Box";
import useStyles from "../styles/stylesRegister";
import { useHistory } from "react-router-dom";
import { CustomButtonB } from "../utils/Buttons";


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
              <CustomButtonB
                color="primary"
                variant="contained"
                size="large"
                className={classes.button_home}
                onClick={() => history.push("/register-as")}
              >
                Registrarse
              </CustomButtonB>
            </Box>
          </Box>

          <Box display="flex" justifyContent="center" m={1} p={1}>
            <Box p={1}>
              <Box display="flex" justifyContent="center"></Box>
              <CustomButtonB
                color="primary"
                variant="contained"
                size="large"
                className={classes.button_home}
                onClick={() => history.push("/login-as")}
              >
                Ingresar
              </CustomButtonB>
            </Box>
          </Box>
        </Box>
      </div>
    </div>
  );
};

export default Home;

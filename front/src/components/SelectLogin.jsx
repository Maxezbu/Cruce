import React from "react";
import useStyles from "../styles/stylesRegister";
import { useHistory } from "react-router";
import { Box, Typography } from "@material-ui/core";
import { CustomButton } from "../utils/Buttons";

const Main = () => {
  const classes = useStyles();
  const history = useHistory();

  return (
    <div>
      <Typography
        variant="h4"
        style={{
          textAlign: "center",
          marginTop: 35,
          color: "rgb(100,100,100)",
          fontWeight: "bold",
        }}
      >
        INGRESAR COMO
      </Typography>
      <div style={{ display: "flex", justifyContent: "center" }}>
        <Box
          display="flex"
          justifySelf="center"
          flexDirection="column"
          marginTop={5}
          bgcolor="#f6f6f6"
          width={300}
          height={500}
          alignItems="center"
          borderRadius="30px"
        >
          <Box
            display="flex"
            alignSelf="center"
            justifyContent="center"
            m={1}
            p={1}
            bgcolor="#f6f6f6"
            width={230}
          >
            <Box p={1} bgcolor="#f6f6f6">
              <Box display="flex" justifyContent="center">
                <img
                  className={classes.large2}
                  src={process.env.PUBLIC_URL + "deli.png"}
                  alt=""
                />
              </Box>
              <CustomButton
                variant="contained"
                size="large"
                className={classes.button_cadete}
                onClick={() => history.push("/login-as/cadete")}
              >
                Cadete
              </CustomButton>
            </Box>
          </Box>

          <Box
            display="flex"
            alignSelf="center"
            justifyContent="center"
            width={230}
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
              <CustomButton
                variant="contained"
                color="red"
                onClick={() => history.push("/login-as/cadeteria")}
                size="large"
                className={classes.button_cadeteria}
              >
                Cadeteria
              </CustomButton>
            </Box>
          </Box>
        </Box>
      </div>
    </div>
  );
};

export default Main;

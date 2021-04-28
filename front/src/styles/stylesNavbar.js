import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  
  body: {
    backgroundColor: "white" /* initial color */,
    transition: "all .5s",
  },

  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },

  titleWelcome: {
    display: "flex",
    textAlign: "center",
    textTransform: "uppercase",
    flexGrow: 1,
    justifyContent: "center",
    alignContent: "baseline",
    fontSize: "20px",
    textShadow: "2px 2px 2px grey",
  },

  base: {
    background: "linear-gradient(45deg, #eeeeee, 30%, #9e9e9e 90%)",
    color: "black",
  },

  /*   style={{
    backgroundColor: condition ? "red" : "green",
    transition: "all .5s ease",
    WebkitTransition: "all .5s ease",
    MozTransition: "all .5s ease"
  }} */

  cadete: {
    background: "linear-gradient(-60deg, #3f51b5 30%, #21CBF3 90%)",
    transition: "all 3.s ease",
    WebkitTransition: "all .5s ease",
    MozTransition: "all .5s ease",
    color: "white",
  },

  admin: {
    background: "linear-gradient(45deg, #fdd04c 30%, #FF8E53 90%)",
    color: "white",
  },
  cadeteria: {
    background: "linear-gradient(45deg, #f44336 30%, #FF8E53 90%)",
  },
  sectionDesktop: {
    display: "none",
    [theme.breakpoints.up("sm")]: {
      display: "flex",
    },
  },
  sectionMobile: {
    display: "flex",
    [theme.breakpoints.up("sm")]: {
      display: "none",
    },
  },
}));

export default useStyles;

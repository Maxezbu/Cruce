import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  margin: {
    /*  display: 'flex', */
    margin: theme.spacing(1),
    padding: "20px",
    /*  justifyContent: 'space-between' */
  },
  extendedIcon: {
    marginRight: theme.spacing(1),
  },

  buttonspace: {
    padding: "10px",
  },

  button_cadeteria: {
    backgroundColor: "#ff5757",
    width: "200px",
    height: "100px",
    margin: "1rem",
    borderRadius: "1rem",
    fontWeight: "bold",
    fontSize: "1.5rem",
  },

  button_cadete: {
    backgroundColor: "#5271ff",
    width: "200px",
    height: "100px",
    margin: "1rem",
    borderRadius: "1rem",
    fontWeight: "bold",
    fontSize: "1.8rem",
  },
  button_home: {
    backgroundColor: "#d9d9d9",
    width: "200px",
    height: "100px",
    margin: "1rem",
    borderRadius: "1rem",
    fontWeight: "bold",
    fontSize: "1.5rem",
    textShadow: "1px 1px 2px black",
  },

  small: {
    width: theme.spacing(3),
    height: theme.spacing(3),
  },
  large: {
    width: theme.spacing(8),
    height: theme.spacing(6),
  },
  large2: {
    width: theme.spacing(12),
    height: theme.spacing(9),
  },
  largeMoto: {
    width: theme.spacing(30),
    height: theme.spacing(22),
  },
}));

export default useStyles;

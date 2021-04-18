import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },

  base: {
    background: "#d9d9d9",
    color: "black",
  },

  cadete: { background: "#3f51b5", color: "white" },

  admin: {
    background: "#fdd04c",
    color: "white",
  },
  cadeteria: {
    background: "#ff5757",
  },
}));

export default useStyles;

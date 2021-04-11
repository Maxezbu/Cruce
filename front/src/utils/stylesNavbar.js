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
  admin: {
    background: "#fdd04c",
    color: "white",
  },
  cadeteria: {
    background: "#ff5757",
  },

}));

export default useStyles;

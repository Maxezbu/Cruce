import { makeStyles} from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
    button: {
      marginTop: theme.spacing(3),
      marginLeft: theme.spacing(1),
      backgroundColor: "#ff5757",
      width: "100%",
    },
    inputRoot: {
      color: "inherit",
    },
    inputInput: {
      padding: theme.spacing(1, 1, 1, 0),
      // vertical padding + font size from searchIcon
      paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
      transition: theme.transitions.create("width"),
      width: "100%",
      [theme.breakpoints.up("md")]: {
        width: "20ch",
      },
    },
    button_panel: {
      backgroundColor: '#ff5757',
      width: "200px",
      height: "100px",
      margin: '1rem',
      borderRadius: '1rem',
      fontWeight: "bold",
      fontSize: "1.5rem",
    },

  }));


  export default useStyles
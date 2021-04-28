import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  icon: {
    marginRight: theme.spacing(2),
  },
  heroContent: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(8, 0, 6),
    display: "flex",
    flexDirection: "column",
  },
  heroButtons: {
    marginTop: theme.spacing(4),
  },
  cardGrid: {
    paddingTop: theme.spacing(8),
    paddingBottom: theme.spacing(8),
  },
  card: {
    height: "100%",
    display: "flex",
    flexDirection: "column",
  },
  cardMedia: {
    paddingTop: "56.25%", // 16:9
  },
  cardContent: {
    flexGrow: 1,
  },
  footer: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(6),
  },

  button_admin:{
    backgroundColor: "#fdd04c",
    width: "130px",
    height: "60px",
    fontWeight: "bold",
    borderRadius: "10px",
    /*  
      fontSize: "1.5rem",  */
    color: "white",
    margin: "auto",
  },

  button_panel: {
    backgroundColor: "#ff5757",
    width: "130px",
    height: "60px",
    fontWeight: "bold",
    borderRadius: "10px",
    /*  
      fontSize: "1.5rem",  */
    color: "white",
    margin: "auto",
  },
}));

export default useStyles;

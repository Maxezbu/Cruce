import React, { useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  List,
  ListItem,
  ListItemSecondaryAction,
  ListItemText,
  IconButton,
  Chip,
} from "@material-ui/core";
import BlockIcon from "@material-ui/icons/Block";
import GroupAddIcon from "@material-ui/icons/GroupAdd";
import { Link } from "react-router-dom";
import DoneIcon from "@material-ui/icons/Done";
import { useDispatch, useSelector } from "react-redux";
import { allCadeterias, editStateCadeteria } from "../../state/cadeterias";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    maxWidth: 752,
  },
  demo: {
    backgroundColor: theme.palette.background.paper,
  },
  title: {
    margin: theme.spacing(4, 0, 2),
  },
}));

export default function ListCadeterias() {
  const classes = useStyles();
  const [dense, setDense] = React.useState(false);
  const cadeterias = useSelector((state) => state.cadeterias.cadeterias);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(allCadeterias());
  }, []);

  const handleActive = (id) => {
    dispatch(editStateCadeteria(id)).then((res) => {
      res.payload
        ? alert("Estado cambiado correctamente")
        : alert("Hubo un problema");
    });
  };

  return (
    <>
      {" "}
      <div className={classes.root}>
        <div>
          <h1 className="titulo">Lista de cadeterias</h1>
          <Link
            to="/register"
            style={{ textDecoration: "none", color: "inherit" }}
          >
            <IconButton edge="end" aria-label="delete" className="icono">
              <GroupAddIcon fontSize="large" />
            </IconButton>
          </Link>
        </div>
        <div className={classes.demo}>
          <List dense={dense}>
            {cadeterias &&
              cadeterias.map((cadeteria) => {
                return cadeteria.authorized ? (
                  <ListItem key={cadeteria.id}>
                    <ListItemText primary={cadeteria.nameCompany} />
                    <ListItemSecondaryAction>
                      {cadeteria.active ? (
                        <IconButton
                          edge="end"
                          aria-label="delete"
                          onClick={() => {
                            handleActive(cadeteria.id);
                          }}
                        >
                          <Chip
                            icon={<DoneIcon />}
                            label="Activo"
                            style={{ color: "green" }}
                            variant="outlined"
                          />
                        </IconButton>
                      ) : (
                        <IconButton
                          edge="end"
                          aria-label="delete"
                          onClick={() => {
                            handleActive(cadeteria.id);
                          }}
                        >
                          <Chip
                            icon={<BlockIcon />}
                            label="Inactivo"
                            color="secondary"
                            variant="outlined"
                          />
                        </IconButton>
                      )}
                    </ListItemSecondaryAction>
                  </ListItem>
                ) : null;
              })}
          </List>
        </div>
      </div>
    </>
  );
}

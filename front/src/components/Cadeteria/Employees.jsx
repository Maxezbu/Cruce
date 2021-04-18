import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import ListItemText from "@material-ui/core/ListItemText";
import IconButton from "@material-ui/core/IconButton";
import BlockIcon from "@material-ui/icons/Block";
import CheckIcon from "@material-ui/icons/Check";
import GroupAddIcon from "@material-ui/icons/GroupAdd";
import { Link } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";
import { admitCadete, allCadetes } from "../../state/users";

import { useSnackbar } from "notistack";
import messagesHandler from "../../utils/messagesHandler";

import { Chip } from "@material-ui/core";
import DoneIcon from "@material-ui/icons/Done";

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

export default function CadeteriaRequest() {
  const dispatch = useDispatch();
  const classes = useStyles();
  const [dense, setDense] = React.useState(false);

  const cadetes = useSelector((state) => state.users.users);
  const cadeteria = useSelector((state) => state.cadeterias.singleCadeteria);
  const messages = messagesHandler(useSnackbar());

  useEffect(() => {
    dispatch(allCadetes());
  }, []);

  const handleActive = (id) => {
    dispatch(admitCadete(id)).then((res) => {
      res.payload
        ? messages.success("Estado cambiado correctamente")
        : messages.error("Hubo un problema");
    });
  };

  return (
    <>
      <div className={classes.root}>
        <div>
          <h1 className="titulo">Solicitudes de cadetes</h1>
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
            {cadetes &&
              cadetes.map((cadete) => {
                if (cadete.cadeteriumId == cadeteria.id) {
                  return cadete.authorized === false &&
                    cadete.admin === false ? (
                    <ListItem key={cadete.id}>
                      <ListItemText
                        primary={cadete.firstName + " " + cadete.lastName}
                      />
                      <ListItemSecondaryAction>
                        {!cadete.active ? (
                          <IconButton
                            edge="end"
                            aria-label="delete"
                            onClick={() => {
                              const r = window.confirm("¿Autorizar la cadete?");
                              if (r == true) return handleActive(cadete.id);
                              else return null;
                            }}
                          >
                            <Chip
                              icon={<DoneIcon />}
                              label="Aceptar"
                              style={{ color: "green" }}
                              variant="outlined"
                            />
                          </IconButton>
                        ) : null}
                      </ListItemSecondaryAction>
                    </ListItem>
                  ) : null;
                }
              })}
          </List>
        </div>
      </div>
    </>
  );
}

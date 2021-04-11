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
import PersonAddIcon from "@material-ui/icons/PersonAdd";
import axios from "axios";
import { allCadetes, editStateCadete } from "../../state/admin";
import { useDispatch, useSelector } from "react-redux";
import CadeteriaNavbar from "./CadeteriaNavbar";

import Chip from "@material-ui/core/Chip";
import FaceIcon from "@material-ui/icons/Face";
import DoneIcon from "@material-ui/icons/Done";

import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import Checkbox from "@material-ui/core/Checkbox";

import Avatar from "@material-ui/core/Avatar";

import { useSnackbar } from "notistack";
import messagesHandler from "../../utils/messagesHandler";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
  },
}));

export default function Cadetes() {
  const classes = useStyles();
  const [dense, setDense] = React.useState(false);
  const [secondary, setSecondary] = React.useState(false);
  const cadetes = useSelector((state) => state.admin.cadetes);
  const dispatch = useDispatch();

  const messages = messagesHandler(useSnackbar());
  console.log("aca estan los cadetes", cadetes);

  useEffect(() => {
    dispatch(allCadetes());
  }, []);

  const isActive = ({ active }) => (active ? "ACTIVO" : "INNACTIVO");

  const handleActive = (id) => {
    dispatch(editStateCadete(id)).then((res) => {
      const status = isActive(res.payload);

      res.payload
        ? messages.info(`Estado cambiado a ${status}`)
        : messages.error("Hubo un problema");
    });
  };

  const [checked, setChecked] = React.useState([1]);

  const handleToggle = (value) => () => {
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    setChecked(newChecked);
  };

  return (
    <>
      <CadeteriaNavbar />
      <h1 className="titulo">Lista de cadetes</h1>

      <Link
        to="/cadeteria/register"
        style={{ textDecoration: "none", color: "inherit" }}
      >
        <IconButton edge="end" aria-label="delete" className="icono">
          <PersonAddIcon fontSize="large" />
        </IconButton>
      </Link>

      <List dense className={classes.root}>
        {cadetes &&
          cadetes.map((cadete) => {
            if (!cadete.authorized && cadete.admin == false)
              return (
                <ListItem key={cadete} button>
                  <ListItemAvatar>
                    <Avatar
                      alt={`Avatar n°${cadete.id + 1}`}
                      src={`/static/images/avatar/${cadete.fistName}.jpg`}
                    />
                  </ListItemAvatar>
                  <ListItemText
                    id={cadete.id}
                    primary={`${cadete.firstName + " " + cadete.lastName}`}
                  />
                  <ListItemSecondaryAction>
                    <Chip
                      label="Solicitud pendiente"
                      disabled
                      variant="outlined"
                    />
                  </ListItemSecondaryAction>
                </ListItem>
              );
            if (cadete.authorized && cadete.admin == false)
              return (
                <ListItem key={cadete} button>
                  <ListItemAvatar>
                    <Avatar
                      alt={`Avatar n°${cadete.id + 1}`}
                      src={`/static/images/avatar/${cadete.fistName}.jpg`}
                    />
                  </ListItemAvatar>
                  <ListItemText
                    id={cadete.id}
                    primary={`${cadete.firstName + " " + cadete.lastName}`}
                  />
                  <ListItemSecondaryAction>
                    {cadete.active ? (
                      <IconButton
                        edge="end"
                        aria-label="delete"
                        onClick={() => {
                          handleActive(cadete.id);
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
                          handleActive(cadete.id);
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
              );
          })}
      </List>

      {/*  <div className={classes.root}>
      <div>
        <h1 className="titulo">Lista de cadetes</h1>
        <Link
          to="/register"
          style={{ textDecoration: "none", color: "inherit" }}
        >
          <IconButton edge="end" aria-label="delete" className="icono">
            <PersonAddIcon fontSize="large" />
          </IconButton>
        </Link>
      </div>
      <div className={classes.demo}>
        <List dense={dense} >
          {cadetes && cadetes.map((cadete) => {
            return (
              <ListItem>
                <ListItemText
                  primary={cadete.firstName + " " + cadete.lastName}
                />
                <ListItemSecondaryAction>
                  {cadete.active ? (
                    <IconButton
                      edge="end"
                      aria-label="delete"
                      onClick={() => {
                        handleActive(cadete.id);
                      }}
                    >
                      <BlockIcon />
                    </IconButton>
                  ) : (
                    <IconButton
                      edge="end"
                      aria-label="delete"
                      onClick={() => {
                        handleActive(cadete.id);
                      }}
                    >
                      <CheckIcon />
                    </IconButton>
                  )}
                </ListItemSecondaryAction>
              </ListItem>
            );
          })}
        </List>
      </div>
    </div> */}
    </>
  );
}

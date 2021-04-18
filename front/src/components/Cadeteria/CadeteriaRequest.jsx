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
import Chip from "@material-ui/core/Chip";
import DoneIcon from "@material-ui/icons/Done";

import { useDispatch, useSelector } from "react-redux";
import { admitCadeteria, allCadeterias } from "../../state/cadeterias";

import { useSnackbar } from "notistack";
import messagesHandler from "../../utils/messagesHandler";

import Navbar from "../../components/Navbar";
import CadeteriaNavbar from "./CadeteriaNavbar";

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

  const cadeterias = useSelector((state) => state.cadeterias.cadeterias);

  const messages = messagesHandler(useSnackbar());

  useEffect(() => {
    dispatch(allCadeterias());
  }, []);

  const handleActive = (id) => {
    dispatch(admitCadeteria(id)).then((res) => {
      res.payload
        ? messages.success("Estado cambiado correctamente")
        : messages.error("Hubo un problema");
    });
  };

  return (
    <>
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
                return cadeteria.authorized === false ? (
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
                            label="Autorizar"
                            style={{ color: "grey" }}
                            variant="outlined"
                          />
                        </IconButton>
                      ) : (
                        <IconButton
                          edge="end"
                          aria-label="delete"
                          // onClick={() => {
                          //   handleActive(cadeteria.id);
                          // }}
                          onClick={() => {
                            const r = window.confirm(
                              "¿Autorizar la cadeteria?"
                            );
                            if (r == true) return handleActive(cadeteria.id);
                            else return null;
                          }}
                        >
                          <Chip
                            icon={<DoneIcon />}
                            label="Autorizar"
                            style={{ color: "grey" }}
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

import React, { useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  List,
  ListItem,
  ListItemSecondaryAction,
  ListItemText,
  IconButton,
  Chip,
  Container,
  CssBaseline,
  Paper,
  Typography,
} from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";
import { admitCadete, allCadetes } from "../../state/users";
import { useSnackbar } from "notistack";
import DoneIcon from "@material-ui/icons/Done";
import messagesHandler from "../../utils/messagesHandler";
import socket from "../../utils/socket";

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
  container: {
    paddingTop: theme.spacing(0.5),
    paddingBottom: theme.spacing(0.5),
  },
}));

export default function CadeteriaRequest() {
  const dispatch = useDispatch();
  const classes = useStyles();
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

    socket.emit("cadetes");
  };

  socket.on("cadetes", () => {
    dispatch(allCadetes());
  });

  return (
    <>
      <div style={{ display: "grid", placeSelf: "center" }}>
        <CssBaseline />
        <div style={{ display: "grid", placeSelf: "center" }}>
          <Typography
            variant="h4"
            key="1"
            style={{
              textAlign: "left",
              marginTop: 45,
              marginBottom: 50,
              color: "black",
              fontWeight: "bold",
            }}
          >
            SOLICITUDES CADETES
          </Typography>
        </div>
        <div>
          <List>
            {cadetes &&
              cadetes.map((cadete) => {
                if (cadete.cadeteriumId === cadeteria.id) {
                  return cadete.authorized === false &&
                    cadete.admin === false ? (
                    <Container maxWidth="lg" className={classes.container}>
                      <Paper elevation={1}>
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
                                  const r = window.confirm(
                                    "¿Autorizar la cadete?"
                                  );
                                  if (r === true)
                                    return handleActive(cadete.id);
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
                      </Paper>
                    </Container>
                  ) : null;
                }
              })}
          </List>
        </div>
      </div>
    </>
  );
}

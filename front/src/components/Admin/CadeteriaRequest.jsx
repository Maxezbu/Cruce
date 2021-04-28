import React, { useEffect } from "react";
import DoneIcon from "@material-ui/icons/Done";
import messagesHandler from "../../utils/messagesHandler";
import {
  List,
  ListItem,
  ListItemSecondaryAction,
  ListItemText,
  Chip,
  IconButton,
  Container,
  CssBaseline,
  Paper,
  Typography,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { admitCadeteria, allCadeterias } from "../../state/cadeterias";
import { useSnackbar } from "notistack";
import { useDispatch, useSelector } from "react-redux";
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
    paddingTop: theme.spacing(1),
    paddingBottom: theme.spacing(4),
  },
}));

export default function CadeteriaRequest() {
  const classes = useStyles();
  const dispatch = useDispatch();
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
    socket.emit("cadeterias");
  };

  socket.on("cadeterias", () => {
    dispatch(allCadeterias());
  });

  return (
    <div style={{ display: "grid", placeSelf: "center" }}>
      <CssBaseline />
      <div>
        <Typography
          variant="h4"
          key="1"
          style={{
            textAlign: "center",
            marginTop: 45,
            marginBottom: 50,
            color: "black",
            fontWeight: "bold",
          }}
        >
          SOLICITUDES DE CADETERIAS
        </Typography>
      </div>
      <div>
        <List>
          {cadeterias &&
            cadeterias.map((cadeteria) => {
              return cadeteria.authorized === false ? (
                <Container maxWidth="lg" className={classes.container}>
                  <Paper elevation={1}>
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
                            onClick={() => {
                              const r = window.confirm(
                                "¿Autorizar la cadeteria?"
                              );
                              if (r === true) return handleActive(cadeteria.id);
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
                  </Paper>
                </Container>
              ) : null;
            })}
        </List>
      </div>
    </div>
  );
}

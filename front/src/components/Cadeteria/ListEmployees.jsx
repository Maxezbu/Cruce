import React, { useEffect } from "react";
import { allCadetes, editStateCadete } from "../../state/users";
import { useDispatch, useSelector } from "react-redux";
import { useSnackbar } from "notistack";
import { CssBaseline, Typography, List } from "@material-ui/core";
import messagesHandler from "../../utils/messagesHandler";
import Requests from "../../utils/Request";
import socket from "../../utils/socket";


export default function ListEmployees() {
  const cadetes = useSelector((state) => state.users.users);
  const dispatch = useDispatch();
  const messages = messagesHandler(useSnackbar());

  useEffect(() => {
    dispatch(allCadetes());
  }, []);

  const handleActive = (id) => {
    dispatch(editStateCadete(id)).then((res) => {
      res.payload
        ? messages.success("Estado cambiado correctamente")
        : messages.error("Hubo un problema");
    });

    socket.emit("cadetes", id);
  };

  socket.on("cadetes", (cadetes) => {
    dispatch(allCadetes());
  });

  return (
    <>
      <div style={{ display: "grid", placeSelf: "center" }}>
        <CssBaseline />
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
          LISTA DE CADETES
        </Typography>
      </div>
      <div style={{ display: "grid", placeItems: "center" }}>
        <List style={{ width: "80%" }}>
          {cadetes &&
            cadetes.map((cadete) => {
              if (cadete.authorized) {
                return <Requests cadete={cadete} handleActive={handleActive} />;
              }
            })}
        </List>
      </div>
    </>
  );
}

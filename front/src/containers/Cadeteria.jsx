import React from "react";
import { useSelector, useDispatch } from "react-redux";
import CadeteriaPanel from "../components/Cadeteria/CadeteriaPanel";
import Footer from "../components/Footer";
import Error from "../components/Error";

import { fetchCad } from "../state/cadeterias";
import socket from "../utils/socket";

export default function Cadeteria() {
  const cadeteria = useSelector((state) => state.cadeterias.singleCadeteria);
  const dispatch = useDispatch();

  socket.on("cadeterias", () => {
    dispatch(fetchCad());
  });

  return (
    <div>
      {cadeteria.id && cadeteria.authorized === true ? (
        <CadeteriaPanel />
      ) : (
        <Error />
      )}
      <Footer />
    </div>
  );
}

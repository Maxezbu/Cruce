import React from "react";
import Footer from "../components/Footer";
import { useSelector } from "react-redux";
import CadeteriaPanel from "../components/Cadeteria/CadeteriaPanel";
import Error from "../components/Error";

export default function Cadeteria() {
  const cadeteria = useSelector((state) => state.cadeterias.singleCadeteria);

  return (
    <div>
      {cadeteria.id && cadeteria.authorized == true ? (
        <CadeteriaPanel />
      ) : (
        <Error />
      )}
      <Footer />
    </div>
  );
}

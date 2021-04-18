import React from "react";

import Footer from "../components/Footer";
import { useSelector } from "react-redux";
import CadeteOrders from "../components/Cadete/CadeteOrders";

import Error from "../components/Error";

export default function Cadete() {
  const user = useSelector((state) => state.users.user);
  return (
    <div>
      {user.id && !user.admin /* && user.authorized == true */ ? (
        <CadeteOrders />
      ) : (
        <Error />
      )}
      <Footer />
    </div>
  );
}

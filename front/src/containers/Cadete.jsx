import React, { useEffect } from "react";
import {
  Switch,
  Route,
  Redirect,
  useHistory,
  useLocation,
} from "react-router-dom";
import Navbar from "../components/Navbar";
import Login from "../components/Login";
import SelectButtons from "../components/SelectButtons";
import Footer from "../components/Footer";
import { useSelector, useDispatch } from "react-redux";
import CadeteOrders from "../components/Cadete/CadeteOrders";
import SingleOrder from "../components/Cadete/SingleOrder";
import Home from "../components/Home";
import ProfileCadete from "../components/Cadete/ProfileCadete";

import { fetchMe } from "../state/user";


import Error from "../components/Error";

export default function Cadete() {
  const user = useSelector((state) => state.cadete);
  const dispatch = useDispatch();
  const location = useLocation();

  const cadeteria = useSelector((state) => state);
  const history = useHistory();
 
  /*   if (user && user.admin) <Redirect to="/admin" />;
  if (!user && cadeteria !== undefined) <Redirect to="/cadeteria" />;
  if (!user && !cadeteria) <Redirect to="/" />;
 */

  return (
    <div>
      <Navbar />
      {user && !user.admin ? <CadeteOrders/> : <Error />}
      <Footer />
    </div>
  );
}

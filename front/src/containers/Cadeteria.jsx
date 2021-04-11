import React, { useEffect } from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import Login from "../components/Login";

import Footer from "../components/Footer";
import CadeteriaRequest from "../components/Cadeteria/CadeteriaRequest";
import { useSelector, useDispatch } from "react-redux";
import { setUser, fetchMe } from "../state/user";

import { fetchCad } from "../state/cadeteria";

import { useHistory } from "react-router-dom";
import adminPanel from "../components/Admin/AdminPanel";

import CadeteriaLogin from "../components/Cadeteria/CadeteriaLogin";
import CadeteriaNavbar from "../components/Cadeteria/CadeteriaNavbar";
import CadeteriaPanel from "../components/Cadeteria/CadeteriaPanel";

import Error from "../components/Error";

export default function Cadeteria() {
  const user = useSelector((state) => state.cadete);
  const dispatch = useDispatch();
  const history = useHistory();

  const cadeteria = useSelector((state) => state.cadeteria);

  const token = localStorage.getItem("token");

  return (
    <div>
      <CadeteriaNavbar />
      {cadeteria && cadeteria.id ? <CadeteriaPanel /> : <Error />}
      <Footer />
    </div>
  );
}

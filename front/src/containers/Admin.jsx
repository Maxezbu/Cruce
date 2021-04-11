import React, { useEffect } from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import Navbar from "../components/Navbar";
import Login from "../components/Login";

import Footer from "../components/Footer";

import { useSelector, useDispatch } from "react-redux";

import AdminPanel from '../components/Admin/AdminPanel'
import ListCadetes from '../components/Admin/ListCadetes'

import Error from "../components/Error";

export default function App() {
  const user = useSelector((state) => state.cadete);
  const dispatch = useDispatch();

  user && !user.admin && console.log("user ===>", user);

  const token = localStorage.getItem("token");

  return (
    <div>
      <Navbar />
      {user && user.admin ? <AdminPanel/> : <Error />}
    </div>
  );
}

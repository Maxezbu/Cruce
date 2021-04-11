import React, { useEffect } from "react";
import { Route, Switch } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { setUser, fetchMe } from "../state/user";
import { Redirect } from "react-router-dom";

import Cadete from "./Cadete";
import Admin from "./Admin";
import Cadeteria from "./Cadeteria";
import Home from "../components/Home";

import ProfileCadeteria from "../components/Cadeteria/ProfileCadeteria";
import CadeteriaPanel from "../components/Cadeteria/CadeteriaPanel";

import ListOrders from "../components/Cadeteria/ListOrders";
import ListCadetes from "../components/Admin/ListCadetes";
import Metricas from "../components/Metricas";
import CadeteRequest from "../components/Cadeteria/CadeteRequest";
import Cadetes from "../components/Cadeteria/Cadetes";
import CadeteriaLogin from "../components/Cadeteria/CadeteriaLogin";
import CadeteriaNavbar from "../components/Cadeteria/CadeteriaNavbar";

import CadeteOrders from "../components/Cadete/CadeteOrders";
import SingleOrder from "../components/Cadete/SingleOrder";
import ProfileCadete from "../components/Cadete/ProfileCadete";

import DataLoading from "../components/DataLoading";
import ListCadeterias from "../components/Admin/ListCadeterias";
import CadeteriaRequest from "../components/Cadeteria/CadeteriaRequest";

import { fetchCad } from "../state/cadeteria";

import Login from "../components/Login";

import SelectButtons from "../components/SelectButtons";
import HomeNavbar from "../components/HomeNavbar";

import RegisterCadeteria from "../components/Cadeteria/RegisterCadeteria";
import RegisterUser from "../components/RegisterUser";

import SelectLogin from "../components/SelectLogin";

const Index = () => {
  const user = useSelector((state) => state.cadete);
  const cadeteria = useSelector((state) => state.cadeteria);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchMe());
    dispatch(fetchCad());
  }, []);

  return (
    <div>
      <Switch>
        <Route exact path="/cadete" component={Cadete} />
        <Route exact path="/cadeteria" component={Cadeteria} />
        <Route exact path="/admin" component={Admin} />
        <Route exact path="/select" component={SelectButtons} />
        <Route exact path="/selectLogin" component={SelectLogin} />

        <Route exact path="/cadeteria/register" component={RegisterCadeteria} />
        <Route exact path="/cadeteria/perfil" component={ProfileCadeteria} />
        <Route exact path="/cadeteria/listOrders" component={ListOrders} />
        <Route exact path="/cadeteria/listCadetes" component={Cadetes} />
        <Route exact path="/cadeteria/solicitudes" component={CadeteRequest} />
        <Route exact path="/cadeteria/metricas" component={ProfileCadeteria} />
        <Route
          path="/cadeteria/singleOrder/:id"
          render={({ match }) => <SingleOrder match={match.params.id} />}
        />

        <Route exact path="/register" component={RegisterUser} />
        {/*  <Route exact path="/cadete/cadeteOrders" component={CadeteOrders} /> */}
        <Route exact path="/cadete/profileCadete" component={ProfileCadete} />
        <Route
          path="/cadete/singleOrder/:id/:orderNumber"
          render={({ match }) => <SingleOrder match={match.params} />}
        />

        <Route exact path="/admin/uploadorders" component={DataLoading} />
        <Route exact path="/admin/ListCadetes" component={ListCadetes} />
        <Route exact path="/admin/listCadeterias" component={ListCadeterias} />
        <Route
          exact
          path="/admin/cadeteriaRequest"
          component={CadeteriaRequest}
        />

        <Route exact path="/login" component={Login} />
        <Route exact path="/register" component={SelectButtons} />
        <Route exact path="/cadeteria/login" component={CadeteriaLogin} />

        <Route exact path="/" component={Home} />
        <Redirect to="/" />
      </Switch>
    </div>
  );
};

export default Index;

import React, { useEffect } from "react";

import { Route, Switch, Redirect } from "react-router-dom";
import { useDispatch } from "react-redux";
import { fetchMe } from "../state/users";
import { fetchCad } from "../state/cadeterias";

import Cadete from "./Cadete";
import Admin from "./Admin";
import Cadeteria from "./Cadeteria";
import Home from "../components/Home";
import ProfileCadeteria from "../components/Cadeteria/CadeteriaProfile";
import ListOrders from "../components/Cadeteria/ListOrders";
import ListCadetes from "../components/Admin/ListCadetes";
import CadeteRequest from "../components/Cadeteria/Employees";
import Cadetes from "../components/Cadeteria/ListEmployees";
import CadeteriaLogin from "../components/Cadeteria/LoginCadeteria";
import SingleOrder from "../components/Cadete/SingleOrder";
import ProfileCadete from "../components/Cadete/CadeteProfile";
import DataLoading from "../components/Admin/ExcelUpload";
import Login from "../components/Login";
import ListCadeterias from "../components/Admin/ListCadeterias";
import CadeteriaRequest from "../components/Cadeteria/CadeteriaRequest";
import SelectButtons from "../components/SelectButtons";
import Navbar from "../components/Navbar";
import RegisterCadeteria from "../components/Cadeteria/RegisterCadeteria";
import RegisterUser from "../components/Register.jsx";
import SelectLogin from "../components/SelectLogin";
import ResetPassword from "../components/ResetPassword";
import SimpleModal from "../components/ForgotPassword";
import Metricas from "../components/Admin/Metrics";
import ForgotPasswordCadeteria from "../components/Cadeteria/ForgotPassCadeteria";
import ResetPasswordCadeteria from "../components/Cadeteria/ResetPassCadeteria";

const Index = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchMe());
    dispatch(fetchCad());
  }, []);

  return (
    <div>
      <Navbar />
      <Switch>
        <Route exact path="/login-as" component={SelectLogin} />
        <Route exact path="/login-as/cadete" component={Login} />
        <Route exact path="/login-as/cadeteria" component={CadeteriaLogin} />

        <Route exact path="/register-as" component={SelectButtons} />
        <Route exact path="/register-as/cadete" component={RegisterUser} />
        <Route
          exact
          path="/register-as/cadeteria"
          component={RegisterCadeteria}
        />

        <Route exact path="/reset/:token/" component={ResetPassword} />
        <Route exact path="/forgot/" component={SimpleModal} />

        <Route
          exact
          path="/reset-cadeteria/:token/"
          component={ResetPasswordCadeteria}
        />
        <Route
          exact
          path="/forgot-cadeteria/"
          component={ForgotPasswordCadeteria}
        />

        <Route exact path="/admin" component={Admin} />
        <Route exact path="/admin/uploadorders" component={DataLoading} />
        <Route exact path="/admin/ListCadetes" component={ListCadetes} />
        <Route exact path="/admin/listCadeterias" component={ListCadeterias} />
        <Route exact path="/admin/metrics" component={Metricas} />
        <Route
          exact
          path="/admin/cadeteriaRequest"
          component={CadeteriaRequest}
        />

        <Route exact path="/cadeteria" component={Cadeteria} />
        <Route exact path="/cadeteria/perfil" component={ProfileCadeteria} />
        <Route exact path="/cadeteria/listOrders" component={ListOrders} />
        <Route exact path="/cadeteria/listCadetes" component={Cadetes} />
        <Route exact path="/cadeteria/solicitudes" component={CadeteRequest} />
        <Route exact path="/cadeteria/metrics" />

        <Route exact path="/cadete" component={Cadete} />
        {/*  <Route exact path="/cadete/cadeteOrders" component={CadeteOrders} /> */}
        <Route exact path="/cadete/profileCadete" component={ProfileCadete} />
        <Route
          path="/cadete/singleOrder/:id/:orderNumber"
          render={({ match }) => <SingleOrder match={match.params} />}
        />

        <Route path="/" component={Home} />
        <Redirect to="/" />
      </Switch>
    </div>
  );
};

export default Index;

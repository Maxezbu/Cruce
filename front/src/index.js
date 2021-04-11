import React from "react";
import ReactDOM from "react-dom";

import "./utils/styles.css";
import Index from "./containers/Index";

import { Provider } from "react-redux";
import store from "./state/store";
import { BrowserRouter } from "react-router-dom";
import { SnackbarProvider } from 'notistack';

ReactDOM.render(
  <BrowserRouter>
    <Provider store={store}>
      <SnackbarProvider maxSnack={3} iconVariant={{warning: '🔑 '}}>
        <Index />
      </SnackbarProvider>
    </Provider>
  </BrowserRouter>,

  document.getElementById("root")
);

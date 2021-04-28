import React from "react";
import ReactDOM from "react-dom";

import "./styles/styles.css";
import Index from "./containers/Index";

import { Provider } from "react-redux";
import store from "./state/store";
import { BrowserRouter } from "react-router-dom";
import { SnackbarProvider } from "notistack";
import { ThemeProvider, createMuiTheme } from "@material-ui/core/styles";

const theme = createMuiTheme({
  typography: {
    fontFamily: [
      '-apple-system',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(','),
  },
});

ReactDOM.render(
  <BrowserRouter>
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <SnackbarProvider maxSnack={4} iconVariant={{ warning: "🔑 " }}>
          <Index />
        </SnackbarProvider>
      </ThemeProvider>
    </Provider>
  </BrowserRouter>,

  document.getElementById("root")
);

import { configureStore } from "@reduxjs/toolkit";

import logger from "redux-logger";
import usersReducer from "./users";
import ordersReducer from "./orders";
/* import cadeteriaReducer from "./cadeteria"; */
import cadeteriasReducer from "./cadeterias";

const store = configureStore({
 middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
  reducer: {
    orders: ordersReducer,
    cadeterias: cadeteriasReducer,
    /* admin: adminReducer, */
    users: usersReducer,
  },
});

export default store;

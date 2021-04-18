import { createReducer, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Trae todas las órdenes
export const allOrders = createAsyncThunk("ALL_OREDERS", (id) => {
  return axios
    .get(`http://localhost:8000/api/orders/getCadeteOrders/${id}`)
    .then((res) => {
      return res.data;
    })
    .catch((e) => console.log(e));
});
export const adminOrders = createAsyncThunk("ADMIN_ORDERS", () => {
  return axios
    .get(`http://localhost:8000/api/orders/adminOrders`)
    .then((res) => {
      return res.data;
    })
    .catch((e) => console.log(e));
});

// Carga las órdenes del xls al backend
export const upLoadOrders = createAsyncThunk("UPLOAD_ORDERS", (items) => {
  return axios
    .post("http://localhost:8000/api/orders", items)
    .then((res) => res.status);
});

// Le cambia el estado a ala  orden (pendiente, en camino, entregada, devuelto a cadetería)
export const orderState = createAsyncThunk(
  "ORDERS_STATE",
  (order, thunkApi) => {
    return axios
      .put(`http://localhost:8000/api/orders/edit/${order.orderNumber}`, {
        status: order.state,
        cadeteId: order.cadeteId,
      })

      .then((res) => {
        console.log("HOOOOLAAAAAAA", res.data);
        return res.data;
      })
      .catch((e) => console.log(e));
  }
);

// Trae una orden en particular
export const singleOrder = createAsyncThunk("SINGLE_ORDER", (id) => {
  return axios

    .get(`http://localhost:8000/api/orders/${id}`)
    .then((res) => res.data)
    .catch((e) => console.log(e));
});
const updateOrder = (orders, newOrder) => {
  return orders.map((order) =>
    order.id === newOrder.id ? { ...order, status: newOrder.status } : order
  );
};

const initialState = {
  orders: [],
  singleOrder: {},
};

const ordersReducer = createReducer(initialState, {
  [allOrders.fulfilled]: (state, action) => {
    if (action.payload.orders) {
      return { ...state, orders: action.payload.orders };
    } else {
      return { ...state, orders: action.payload };
    }
  },
  [adminOrders.fulfilled]: (state, action) => {
    console.log("ORDENES ADMIN REDUX", action.payload);
    return { ...state, orders: action.payload };
  },

  [orderState.fulfilled]: (state, action) => {
    return { ...state, orders: updateOrder(state.orders, action.payload) };
  },

  [singleOrder.fulfilled]: (state, action) => {
    return { ...state, singleOrder: action.payload };
  },

  [upLoadOrders.fulfilled]: (state, action) => {
    return { ...state, orders: action.payload };
  },
});

export default ordersReducer;

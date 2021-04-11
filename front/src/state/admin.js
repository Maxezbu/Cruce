import {
  createReducer,
  createAsyncThunk,
} from "@reduxjs/toolkit";
import axios from "axios";

export const AllCadeterias = createAsyncThunk("ALL_CADETERIAS", () => {
  return axios
    .get("http://localhost:8000/api/admin/allCadeterias")
    .then((res) => res.data)
    .catch((e) => console.log(e));
});

export const editStateCadeteria = createAsyncThunk(
  "EDIT_STATE_CADETERIA",
  (id) => {
    return axios
      .put(`http://localhost:8000/api/admin/editCadeterias/${id}`)
      .then((res) => res.data);
  }
);

export const admitCadeteria = createAsyncThunk("ADMIT_CADETERIA", (id) => {
  return axios
    .put(`http://localhost:8000/api/admin/admitCadeterias/${id}`)
    .then((res) => res.data);
});

export const allCadetes = createAsyncThunk("ALL_CADETES", () => {
  return axios
    .get("http://localhost:8000/api/admin/allCadetes")
    .then((res) => res.data)
    .catch((e) => console.log(e));
});

export const editStateCadete = createAsyncThunk("EDIT_STATE_CADETE", (id) => {
  return axios
    .put(`http://localhost:8000/api/admin/editCadete/${id}`)
    .then((res) => res.data);
});

export const upLoadOrders = createAsyncThunk("UPLOAD_ORDERS", (items) => {
  return axios
    .post("http://localhost:8000/api/orders", items)
    .then((res) => res.status);
});

const updateCadeteria = (cadeterias, newCadeterias) => {
  return cadeterias.map((cadeteria) =>
    cadeteria.id === newCadeterias.id
      ? {
          ...cadeteria,
          active: newCadeterias.active,
          authorized: newCadeterias.authorized,
        }
      : cadeteria
  );
};

const updateOrder = (orders, newOrder) => {
  return orders.map((order) =>
    order.id === newOrder.id ? { ...order, active: newOrder.active } : order
  );
};

const initialState = {
  cadeterias: [],
  cadetes: [],
  orders: [],
};

const adminReducer = createReducer(initialState, {
  [AllCadeterias.fulfilled]: (state, action) => {
    return { ...state, cadeterias: action.payload };
  },
  [editStateCadeteria.fulfilled]: (state, action) => {
    return {
      ...state,
      cadeterias: updateCadeteria(state.cadeterias, action.payload),
    };
  },
  [admitCadeteria.fulfilled]: (state, action) => {
    return {
      ...state,
      cadeterias: updateCadeteria(state.cadeterias, action.payload),
    };
  },
  [allCadetes.fulfilled]: (state, action) => {
    return { ...state, cadetes: action.payload };
  },
  [editStateCadete.fulfilled]: (state, action) => {
    return {
      ...state,
      cadetes: updateOrder(state.cadetes, action.payload),
    };
  },
  [upLoadOrders.fulfilled]: (state, action) => {
    return { ...state, orders: action.payload };
  },
});

export default adminReducer;

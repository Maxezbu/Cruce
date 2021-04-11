import {
  createReducer,
  createAction,
  createAsyncThunk,
} from "@reduxjs/toolkit";

import axios from "axios";

const setCadeteria = createAction("SET_CADETERIA");

export const fetchCad = createAsyncThunk("FETCH_CAD", () => {
  const loginToken = JSON.parse(localStorage.getItem("token"));
  return axios
    .get(`http://localhost:8000/api/me/cadeteria`, {
      headers: { Authorization: `Bearer ${loginToken}` },
    })
    .then((r) => {
      return r.data;
    })
    .catch((err) => console.log(err));
});

export const CadloginRequest = createAsyncThunk(
  "CAD_LOGIN_REQUEST",
  (input) => {
    return axios
      .post("http://localhost:8000/api/cadeteria/login", input)
      .then((res) => {
        localStorage.setItem("token", JSON.stringify(res.data.token));
      })
      .catch((err) => console.log(err));
  }
);

export const allCadeterias = createAsyncThunk("GET_ALL_CADETERIAS", () => {
  return axios
    .get("http://localhost:8000/api/cadeteria/allCadeterias")
    .then((res) => res.data)
    .catch((e) => console.log(e));
});

export const registerCadeteria = createAsyncThunk(
  "REGISTER_CADETERIA",
  (input) => {
    return axios
      .post("http://localhost:8000/api/cadeteria/register", input)
      .then((res) => res.data)
      .catch((e) => console.log(e));
  }
);

export const admitCadete = createAsyncThunk("ADMIT_CADETE", (id) => {
  return axios
    .put(`http://localhost:8000/api/cadeteria/admitCadete/${id}`)
    .then((res) => res.data)
    .catch((err) => console.log(err));
});

export const editProfileCadeteria = createAsyncThunk(
  "EDIT_PROFILE_CADETERIA",
  (data) => {
    return axios
      .put(
        `http://localhost:8000/api/cadeteria/editProfileCadeteria/${data.id}`,
        data.input
      )
      .then((res) => res)
      .catch((err) => err);
  }
);

const initialState = {
  cadeterias: [],
};

const cadeteriaReducer = createReducer(initialState, {
  [fetchCad.fulfilled]: (state, action) => action.payload,

  [CadloginRequest.fulfilled]: (state, action) => action.payload,
  [setCadeteria]: (state, action) => action.payload,
  [allCadeterias.fulfilled]: (state, action) => {
    return { ...state, cadeterias: action.payload };
  },
  [admitCadete.fullfiled]: (state, action) => action.payload,
  [registerCadeteria.fulfilled]: (state, action) => {
    return {
      ...state,
      cadeterias: [...state.cadeterias, action.payload],
    };
  },

  [editProfileCadeteria.fulfilled]: (state, action) => action.payload,
});

// const initialState = {
//   cadeterias: [],

// };

// const cadeteriaReducer = createReducer(initialState, {

//   [setCadeteria]: (state, action) => action.payload,
//   [allCadeterias.fulfilled]: (state, action) => {
//     return { ...state, cadeterias: action.payload };
//   },
//   [registerCadeteria.fulfilled]: (state, action) => {
//     return {
//       ...state,
//       cadeterias:[...state.cadeterias,action.payload]
//     };
//   },

export default cadeteriaReducer;

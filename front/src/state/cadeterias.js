import {
  createReducer,
  createAction,
  createAsyncThunk,
} from "@reduxjs/toolkit";

import axios from "axios";

// Registra Cadetería
export const registerCadeteria = createAsyncThunk(
  "REGISTER_CADETERIA",
  (input) => {
    return axios
      .post("http://localhost:8000/api/cadeteria/register", input)
      .then((res) => res.data)
      .catch((e) => console.log(e));
  }
);

// Loguea la Cadetería
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

// Comprobar si el token es válido
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

// Trae todas las cadeterías
export const allCadeterias = createAsyncThunk("GET_ALL_CADETERIAS", () => {
  return axios
    .get("http://localhost:8000/api/cadeteria/allCadeterias/")
    .then((res) => res.data)
    .catch((e) => console.log(e));
});

// Permite cambiar el perfil de la cadetería
export const editProfileCadeteria = createAsyncThunk(
  "EDIT_PROFILE_CADETERIA",
  (data) => {
    return axios
      .put(
        `http://localhost:8000/api/cadeteria/editProfileCadeteria/${data.id}`,
        data.input
      )
      .then((res) => res.data)
      .catch((err) => console.log(err));
  }
);
// Cambia el estado de una cadetería, de activo a inactivo
export const editStateCadeteria = createAsyncThunk(
  "EDIT_STATE_CADETERIA",
  (id) => {
    return axios
      .put(`http://localhost:8000/api/admin/editCadeterias/${id}`)
      .then((res) => res.data);
  }
);

// Cambia el estado de una cadetería, de no autorizado a autorizado, y de inactivo a activo
export const admitCadeteria = createAsyncThunk("ADMIT_CADETERIA", (id) => {
  return axios
    .put(`http://localhost:8000/api/admin/admitCadeterias/${id}`)
    .then((res) => res.data);
});

export const logout = createAction("LOGOUT");

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

const initialState = {
  cadeterias: [],
  singleCadeteria: {},
};

const cadeteriasReducer = createReducer(initialState, {
  [CadloginRequest.fulfilled]: (state, action) => {
    return {
      ...state,
      singleCadeteria: action.payload,
    };
  },

  [fetchCad.fulfilled]: (state, action) => {
    return {
      ...state,
      singleCadeteria: action.payload,
    };
  },

  [allCadeterias.fulfilled]: (state, action) => {
    return { ...state, cadeterias: action.payload };
  },

  [editProfileCadeteria.fulfilled]: (state, action) => {
    return {
      ...state,
      singleCadeteria: action.payload,
    };
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

  [logout]: (state, action) => {
    return {};
  },
});

export default cadeteriasReducer;

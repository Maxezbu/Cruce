import {
  createReducer,
  createAction,
  createAsyncThunk,
} from "@reduxjs/toolkit";
import axios from "axios";

export const registerRequest = createAsyncThunk("REGISTER_REQUEST", (input) => {
  return axios
    .post("http://localhost:8000/api/register", input)
    .then((res) => res.data)
    .catch((e) => console.log(e));
});

export const loginRequest = createAsyncThunk("LOGIN_REQUEST", (input) => {
  return axios
    .post("http://localhost:8000/api/login", input)
    .then((res) => {
      localStorage.setItem("token", JSON.stringify(res.data.token));
    })
    .catch((err) => console.log(err));
});

export const fetchMe = createAsyncThunk("FETCH_ME", () => {
  const loginToken = JSON.parse(localStorage.getItem("token"));
  return axios
    .get(`http://localhost:8000/api/me`, {
      headers: { Authorization: `Bearer ${loginToken}` },
    })
    .then((r) => {
      return r.data;
    })
    .catch((err) => console.log(err));
});

export const logout = createAction("LOGOUT");

export const editProfileUser = createAsyncThunk(
  "EDIT_PROFILE_USER",
  (dates) => {
    return axios
      .put(
        `http://localhost:8000/api/user/editProfileCadete/${dates.id}`,
        dates.input
      )
      .then((res) => res.data)
      .catch((err) => console.log(err));
  }
);

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

export const admitCadete = createAsyncThunk("ADMIT_CADETE", (id) => {
  return axios
    .put(`http://localhost:8000/api/cadeteria/admitCadete/${id}`)
    .then((res) => {
      return res.data;
    })
    .catch((err) => console.log(err));
});

const updateCadete = (cadetes, newCadete) => {
  return cadetes.map((cadete) =>
    cadete.id === newCadete.id
      ? {
          ...cadete,
          active: newCadete.active,
          authorized: newCadete.authorized,
        }
      : cadete
  );
};

const initialState = {
  users: [],
  user: {},
};

const usersReducer = createReducer(initialState, {
  [registerRequest.fulfilled]: (state, action) => {
    return {
      ...state,
      user: action.payload,
    };
  },

  [loginRequest.fulfilled]: (state, action) => {
    return {
      ...state,
      user: action.payload,
    };
  },

  [fetchMe.fulfilled]: (state, action) => {
    return {
      ...state,
      user: action.payload,
    };
  },

  [logout]: (state, action) => {
    return {};
  },

  [editProfileUser.fulfilled]: (state, action) => {
    return {
      ...state,
      user: action.payload,
    };
  },

  [allCadetes.fulfilled]: (state, action) => {
    return { ...state, users: action.payload };
  },

  [editStateCadete.fulfilled]: (state, action) => {
    return {
      ...state,
      users: updateCadete(state.users, action.payload),
    };
  },

  [admitCadete.fulfilled]: (state, action) => {
    console.log("----------------------------", action.payload);
    return {
      ...state,
      users: updateCadete(state.users, action.payload),
    };
  },
});

export default usersReducer;

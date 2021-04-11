import {
  createReducer,
  createAction,
  createAsyncThunk,
} from "@reduxjs/toolkit";
import axios from "axios";

export const clearUser = createAction("CLEAR_USER");

export const registerRequest = createAsyncThunk("REGISTER_REQUEST", (input) => {
  return axios
    .post("http://localhost:8000/api/register", input ,)
    .then((res) => res.data)
    .then((user) => user)
    .catch((e) => console.log(e));
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

export const loginRequest = createAsyncThunk("LOGIN_REQUEST", (input) => {
  return axios
    .post("http://localhost:8000/api/login", input)
    .then((res) => {
      localStorage.setItem("token", JSON.stringify(res.data.token));
    })
    .catch((err) => console.log(err));
});

export const sendToken = createAsyncThunk("LOGIN", (token) => {
  return axios
    .post(
      "http://localhost:8000/api/me",
      {},
      { headers: { Authorization: `Bearer ${token}` } }
    )
    .then((res) => res.data)
    .catch((err) => console.log(err));
});

export const editProfileUser = createAsyncThunk(
  "EDIT_PROFILE_USER",
  (dates) => {
    return axios
      .put(
        `http://localhost:8000/api/user/editProfileCadete/${dates.id}`,
        dates.input
      )
      .then((res) => res.status);
  }
);

const userReducer = createReducer([], {

  [fetchMe.fulfilled]: (state, action) => action.payload,
  [loginRequest.fulfilled]: (state, action) => action.payload,
  [registerRequest.fulfilled]: (state, action) => action.payload,
  [sendToken.fulfilled]: (state, action) => action.payload,
  [editProfileUser.fulfilled]: (state, action) => action.payload,
  [clearUser]: (state, action) => {
    return {};
  },
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


export default userReducer;

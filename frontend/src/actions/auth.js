import axios from "axios";


import {
  ME_LOADED,
  AUTH_ERROR,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT_SUCCESS,
  REGISTER_SUCCESS,
  REGISTER_FAIL
} from "./types";

// CHECK TOKEN & LOAD ME
export const loadMe = () => (dispatch, getState) => {
  axios
    .get("http://127.0.0.1:8000/api/v1/users/medetail", tokenConfig(getState))
    .then(res => {
      dispatch({
        type: ME_LOADED,
        payload: res.data
      });
    })
    .catch(err => {
      dispatch({
        type: AUTH_ERROR
      });
    });
};

// LOGIN USER
export const login = (username, password) => dispatch => {
  // Headers
  const config = {
    headers: {
      "Content-Type": "application/json"
    }
  };

  // Request Body
  const body = JSON.stringify({ username, password });

  return axios
    .post("http://127.0.0.1:8000/api/v1/token/login", body, config)
    .then(res => {
      console.log(res.data)

      dispatch({
        type: LOGIN_SUCCESS,
        payload: res.data
      });
    })
    .catch(err => {
    //   dispatch(returnErrors(err.response.data, err.response.status));
      dispatch({
        type: LOGIN_FAIL
      });
    });
};

// LOGOUT USER
export const logout = () => (dispatch, getState) => {
  return axios
    .post("http://127.0.0.1:8000/api/v1/token/logout", null, tokenConfig(getState))
    .then(res => {
      dispatch({
        type: LOGOUT_SUCCESS
      });
    })
    .catch(err => {
    //   dispatch(returnErrors(err.response.data, err.response.status));
    });
};

// Setup config with token - helper function
export const tokenConfig = getState => {
  // Get token from state
  const token = getState().auth.token;

  // Headers
  const config = {
    headers: {
      "Content-Type": "application/json"
    }
  };

  // If token, add to headers config
  if (token) {
    config.headers["Authorization"] = `Token ${token}`;
  }

  return config;
};



// REGISTER USER
// export const register = ({ username, password, email }) => dispatch => {
//   // Headers
//   const config = {
//     headers: {
//       "Content-Type": "application/json"
//     }
//   };

//   // Request Body
//   const body = JSON.stringify({ username, email, password });

//   axios
//     .post("/api/auth/register", body, config)
//     .then(res => {
//       dispatch({
//         type: REGISTER_SUCCESS,
//         payload: res.data
//       });
//     })
//     .catch(err => {
//       dispatch(returnErrors(err.response.data, err.response.status));
//       dispatch({
//         type: REGISTER_FAIL
//       });
//     });
// };



import axios from "axios";
import { DRAWINGS_LOADED } from "./types";

export const loadDrawings = () => (dispatch, getState) => {
  return axios
    .get("http://127.0.0.1:8000/api/v1/drawings/", tokenConfig(getState))
    .then(res => {
      dispatch({
        type: DRAWINGS_LOADED,
        payload: res.data
      });
    })
    .catch(err => {
    //   dispatch(returnErrors(err.response.data, err.response.status));
    });
};


// save drawing to db
export const saveDrawing = (content, title) => (dispatch, getState) => {
    let user = getState().auth.me.id;

    return axios
      .post("http://127.0.0.1:8000/api/v1/drawings/", {
          title,
          content,
          user     
      }, tokenConfig(getState))
      .then(res => {
        // dispatch({
        //   type: LOGOUT_SUCCESS
        // });
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

  


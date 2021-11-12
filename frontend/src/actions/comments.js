
import axios from "axios";
import { 
  DRAWING_COMMENTS_LOADED,
  SET_MESSAGE,
} from "./types";

export const loadComments = (drawingId) => (dispatch, getState) => {
  let query_part = `query?drawing=${drawingId}`

  return axios
    .get(`http://127.0.0.1:8000/api/v1/comments/${query_part}`, tokenConfig(getState))
    .then(res => {
      dispatch({
        type: DRAWING_COMMENTS_LOADED,
        payload: res.data
      });
    })
    .catch(err => {
    //   dispatch(returnErrors(err.response.data, err.response.status));
    });
};

// save Comment to db
export const saveComment = (content, drawingId) => (dispatch, getState) => {
    let user = getState().auth.me.id;
    let drawing = drawingId;

    return axios
      .post("http://127.0.0.1:8000/api/v1/comments/", {
          drawing,
          content,
          user     
      }, tokenConfig(getState))
      .then(res => {
        dispatch({
          type: SET_MESSAGE,
          payload: {type:"success", content: "Comment saving is successful."}
        });
      })
      .catch(err => {
        dispatch({
          type: SET_MESSAGE,
          payload: {type:"error", content: "Comment saving is failed."}
        });
      });
  };



// delete one Comment from db
export const deleteComment = (id) => (dispatch, getState) => {
  let user = getState().auth.me.id;

  return axios
    .delete("http://127.0.0.1:8000/api/v1/comments/"+id, tokenConfig(getState))
    .then(res => {
      dispatch({
        type: SET_MESSAGE,
        payload: {type:"success", content: "Comment deleting is successful."}
      });
    })
    .catch(err => {
      dispatch({
        type: SET_MESSAGE,
        payload: {type:"error", content: "Comment deleting is failed."}
      });
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

  


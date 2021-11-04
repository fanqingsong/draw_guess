
import axios from "axios";


// save drawing to db
export const saveDrawing = (content, title) => (dispatch, getState) => {
    let user = 1;

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

  


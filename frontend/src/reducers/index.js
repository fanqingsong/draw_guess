import { combineReducers } from "redux";
import auth from "./auth";
import drawings from "./drawings";

// console.log("----------------------")
// console.log(auth)

export default combineReducers({
  auth,
  drawings
});

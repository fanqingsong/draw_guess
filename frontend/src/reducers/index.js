import { combineReducers } from "redux";
import auth from "./auth";
import drawings from "./drawings";
import message from "./message";
import comments from "./comments";

// console.log("----------------------")
// console.log(auth)

export default combineReducers({
  auth,
  drawings,
  comments,
  message,
});

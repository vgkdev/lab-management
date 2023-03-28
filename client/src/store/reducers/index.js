import { combineReducers } from "redux";
import userReducer from "./userReducer";
import facultyReducer from "./facultyReducer";

export default combineReducers({
  user: userReducer,
  faculty: facultyReducer,
});

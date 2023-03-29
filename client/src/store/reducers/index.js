import { combineReducers } from "redux";
import userReducer from "./userReducer";
import facultyReducer from "./facultyReducer";
import courseReducer from "./courseReducer";
import yearReducer from "./yearReducer";

export default combineReducers({
  user: userReducer,
  faculty: facultyReducer,
  course: courseReducer,
  year: yearReducer,
});

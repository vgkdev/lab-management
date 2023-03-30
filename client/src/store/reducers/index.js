import { combineReducers } from "redux";
import userReducer from "./userReducer";
import facultyReducer from "./facultyReducer";
import courseReducer from "./courseReducer";
import yearReducer from "./yearReducer";
import semesterReducer from "./semesterReducer";

export default combineReducers({
  user: userReducer,
  faculty: facultyReducer,
  course: courseReducer,
  year: yearReducer,
  semester: semesterReducer,
});

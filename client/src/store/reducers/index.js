import { combineReducers } from "redux";
import userReducer from "./userReducer";
import facultyReducer from "./facultyReducer";
import courseReducer from "./courseReducer";
import yearReducer from "./yearReducer";
import semesterReducer from "./semesterReducer";
import softwareReducer from "./softwareReducer";
import roomReducer from "./roomReducer";

export default combineReducers({
  user: userReducer,
  faculty: facultyReducer,
  course: courseReducer,
  year: yearReducer,
  semester: semesterReducer,
  software: softwareReducer,
  room: roomReducer,
});

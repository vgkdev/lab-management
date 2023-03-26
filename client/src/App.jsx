import "./App.css";
import Login from "./pages/Login";
import Home from "./pages/Home";
import { connect } from "react-redux";
import Router from "./routes/Router";

function App(props) {
  return (
    <div className="App">
      <div> {props.userData ? <Router /> : <Login />}</div>
    </div>
  );
}

const mapStateToProp = (state) => {
  return {
    userData: state.userData,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    setUserData: (userData) => {
      dispatch({ type: "SET_USER_DATA", payload: userData });
    },
  };
};

export default connect(mapStateToProp, mapDispatchToProps)(App);

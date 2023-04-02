import "./App.css";
import Login from "./pages/Login";
// import Home from "./pages/Home";
import { connect } from "react-redux";
import Router from "./routes/Router";
import { useEffect } from "react";
import { verifyUser } from "./api/userAPI";

const App = (props) => {
  useEffect(() => {
    // const tokenUser = JSON.parse(localStorage.getItem("tokenUser"));
    // console.log("check token user:", tokenUser);

    const handleverify = async (email, password) => {
      if (!email || !password) {
        console.log("Nhập thiếu thông tin");
        return;
      }

      // console.log("check email password token: ", email, password);
      try {
        if (props.userData) {
        } else {
          const user = await verifyUser({ email, password });
          console.log("check verify user: ", user.data.user);

          if (user && user.data.errCode !== 0) {
            console.log(">>>login is fail: ", user.data.message);
          } else {
            props.setUserData(user.data.user);
            // console.log("check user data redux: ", props.userData);
          }
        }
      } catch (e) {
        console.log("Error login: ", e);
      }
    };
    let tokenUser = localStorage.getItem("tokenUser");
    console.log(tokenUser);
    if (tokenUser) {
      tokenUser = JSON.parse(tokenUser);
      // console.log("check token user:", tokenUser);
      handleverify(tokenUser.email, tokenUser.password);
    } else {
      return;
    }
  }, []);

  // console.log("check token : ", props.token);
  return (
    <div className="App">
      <div> {props.userData ? <Router /> : <Login />}</div>
    </div>
  );
};

const mapStateToProp = (state) => {
  return {
    userData: state.user.userData,
    token: state.user.token,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    setUserData: (userData) => {
      dispatch({ type: "SET_USER_DATA", payload: userData });
    },

    saveTokenUser: (tokenUser) => {
      dispatch({ type: "SAVE_TOKEN_USER", payload: tokenUser });
    },
  };
};

export default connect(mapStateToProp, mapDispatchToProps)(App);

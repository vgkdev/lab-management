import "./App.css";
import React, { useState } from "react";
import Login from "./pages/Login";
// import Home from "./pages/Home";
import { connect } from "react-redux";
import Router from "./routes/Router";
import UserRouter from "./routes/UserRouter";
import { useEffect } from "react";
import { verifyUser } from "./api/userAPI";
import { Spinner } from "react-bootstrap";

const App = (props) => {
  const [loadingData, setLoadingData] = useState(true);

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
          console.log("check user data redux: ", props.userData);
          setLoadingData(false);
        } else {
          const user = await verifyUser({ email, password });
          console.log("check verify user: ", user.data.user);

          if (user && user.data.errCode !== 0) {
            console.log(">>>login is fail: ", user.data.message);
            setLoadingData(false);
          } else {
            props.setUserData(user.data.user);
            setLoadingData(false);
            // console.log("check user data redux: ", props.userData);
          }
        }
      } catch (e) {
        console.log("Error login: ", e);
      }
    };

    let tokenUser = localStorage.getItem("tokenUser");
    // console.log("check token:", tokenUser);
    if (tokenUser) {
      tokenUser = JSON.parse(tokenUser);
      // console.log("check token user:", tokenUser);
      setTimeout(() => {
        handleverify(tokenUser.email, tokenUser.password);
      }, 1000);
    } else {
      setLoadingData(false);
    }
  }, []);

  // console.log("check token : ", props.token);
  return (
    // <div className="App">
    //   <div> {props.userData ? <Router /> : <Login />}</div>
    // </div>

    <div className="container-fluid m-0 p-0">
      {console.log("check props user data from app: ", props.userData)}
      {loadingData && (
        <div className="row justify-content-center my-5">
          <Spinner animation="border" role="status">
            <span className="visually-hidden">Loading...</span>
          </Spinner>
        </div>
      )}

      {!loadingData && !props.userData && <Login />}

      {!loadingData && props.userData && props.userData.chucVu === "Admin" && (
        <Router />
      )}

      {!loadingData &&
        props.userData &&
        props.userData.chucVu === "Giảng viên" && <UserRouter />}
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

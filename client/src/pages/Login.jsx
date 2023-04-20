import React, { useState } from "react";
import { Form, FormControl, Button, InputGroup } from "react-bootstrap";
import { loginUser } from "../api/userAPI";
import { connect } from "react-redux";
import bgImage from "../assets/bg-login.jpg";

const Login = (props) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errMessage, setErrMessage] = useState("");

  const handleLogin = async () => {
    if (!email || !password) {
      alert("Nhập thiếu thông tin");
      return;
    }
    // console.log(email, password);

    try {
      const user = await loginUser({ email, password });
      console.log("check user: ", user.data.user);

      if (user && user.data.errCode !== 0) {
        console.log(">>>login is fail: ", user.data.message);
        setErrMessage(user.data.message);
        return;
      }

      props.setUserData(user.data.user);
      setErrMessage("");
      console.log("check user data redux: ", props.userData);
    } catch (e) {
      console.log("Error login: ", e);
    }
  };

  return (
    <div className="container-fluid">
      <div
        className="row align-items-center justify-content-center m-5"
        style={{
          // border: "4px solid #ffffff",
          // borderRadius: "20px",
          height: "auto",
          backgroundColor: "gray",
        }}
      >
        <div className="col-lg-6 px-5">
          <div className="row">
            <p className="text-center mb-5 fw-bold fs-3">Đăng nhập</p>
          </div>
          <FormControl
            className="mb-3"
            type="email"
            placeholder="Enter email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
          />
          <FormControl
            className="mb-3"
            type="password"
            placeholder="Password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
          />
          <div className="text-danger fw-semibold">{errMessage}</div>

          <div
            className="row justify-content-center"
            // style={{ border: "1px solid red" }}
          >
            <Button
              style={{ width: "25%" }}
              variant="primary"
              onClick={handleLogin}
            >
              Đăng nhập
            </Button>
          </div>

          {/* <Form style={{ borderRadius: "20px" }} className="bg-white p-4">
            <Form.Group controlId="formBasicEmail" className="my-3">
              <FormControl
                type="email"
                placeholder="Enter email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
              />
            </Form.Group>
            <Form.Group controlId="formBasicPassword" className="mb-3">
              <InputGroup>
                <FormControl
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                />
              </InputGroup>
            </Form.Group>

            <Button variant="primary" onClick={handleLogin}>
              Đăng nhập
            </Button>
          </Form> */}
        </div>

        <div className="col-lg-6 p-0">
          <img src={bgImage} className="img-fluid" alt="img login" />
        </div>
      </div>
    </div>
  );
};

const mapStateToProp = (state) => {
  return {
    userData: state.user.userData,
    listUser: state.user.listUser,
    listFaculty: state.faculty.listFaculty,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    setUserData: (userData) => {
      dispatch({ type: "SET_USER_DATA", payload: userData });
    },
  };
};

export default connect(mapStateToProp, mapDispatchToProps)(Login);

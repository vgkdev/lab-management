import React, { useState } from "react";
import { Form, FormControl, Button, InputGroup } from "react-bootstrap";
import { loginUser } from "../api/userAPI";
import { connect } from "react-redux";

const Login = (props) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    if (!email || !password) {
      alert("Nhập thiếu thông tin");
      return;
    }
    console.log(email, password);

    try {
      const user = await loginUser({ email, password });
      console.log("check user: ", user.data.user);

      if (user && user.data.errCode !== 0) {
        console.log(">>>login is fail: ", user.data.message);
        return;
      }

      props.setUserData(user.data.user);
      console.log("check user data redux: ", props.userData);
    } catch (e) {
      console.log("Error login: ", e);
    }
  };

  return (
    <div className="container-fluid">
      <div className="row justify-content-center m-5">
        <div className="col col-lg-5 m-5">
          <Form style={{ borderRadius: "20px" }} className="bg-white p-4">
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
          </Form>
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

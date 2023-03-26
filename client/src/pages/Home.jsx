import React from "react";
import { connect } from "react-redux";

const Home = (props) => {
  return <div>{JSON.stringify(props.userData)}</div>;
};

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

export default connect(mapStateToProp, mapDispatchToProps)(Home);

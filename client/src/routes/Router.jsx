import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import NavBar from "../components/NavBar";
import Home from "../pages/Home";
import Login from "../pages/Login";
// import { Col } from "react-bootstrap";
// import SideNav from "../components/SideNav";
import User from "../pages/User";
import Faculty from "../pages/Faculty";
import Course from "../pages/Course";
import Year from "../pages/Year";

const Router = () => {
  return (
    <BrowserRouter>
      <NavBar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/user" element={<User />} />
        <Route path="/faculty" element={<Faculty />} />
        <Route path="/course" element={<Course />} />
        <Route path="/year" element={<Year />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;

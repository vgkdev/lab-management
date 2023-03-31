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
import Semester from "../pages/Semester";
import Software from "../pages/Software";
import Room from "../pages/Room";
import Incident from "../pages/Incident";
import Classroom from "../pages/Classroom";

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
        <Route path="/semester" element={<Semester />} />
        <Route path="/software" element={<Software />} />
        <Route path="/room" element={<Room />} />
        <Route path="/incident" element={<Incident />} />
        <Route path="/classroom" element={<Classroom />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;

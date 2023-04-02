import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import NavBar from "../components/NavBar";
import UserHome from "../pages/user/UserHome";
import Login from "../pages/Login";
import User from "../pages/User";
import Faculty from "../pages/Faculty";
import Course from "../pages/Course";
import Year from "../pages/Year";
import Semester from "../pages/Semester";
import Software from "../pages/Software";
import Room from "../pages/Room";
import Incident from "../pages/Incident";
import Classroom from "../pages/Classroom";
import Group from "../pages/Group";
import Schedule from "../pages/Schedule";
import UserNavBar from "../components/UserNavBar";
import UserSchedule from "../pages/user/UserSchedule";
import UserReport from "../pages/user/UserReport";
import GroupRegister from "../pages/user/GroupRegister";
import YourGroup from "../pages/user/YourGroup";

const UserRouter = () => {
  return (
    <BrowserRouter>
      <UserNavBar />

      <Routes>
        <Route path="/" element={<UserHome />} />
        <Route path="/schedule" element={<UserSchedule />} />
        <Route path="/report" element={<UserReport />} />
        <Route path="/group-register" element={<GroupRegister />} />
        <Route path="/your-group" element={<YourGroup />} />
      </Routes>
    </BrowserRouter>
  );
};

export default UserRouter;

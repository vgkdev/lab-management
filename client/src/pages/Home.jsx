import React from "react";
import { connect } from "react-redux";
import { Card, Button } from "react-bootstrap";
import userImg from "../assets/user.jpg";
import facultyImg from "../assets/faculty.jpg";
import courseImg from "../assets/course.png";
import softwareImg from "../assets/software.png";
import roomImg from "../assets/room.jpg";
import incidentImg from "../assets/incident.png";
import classroomImg from "../assets/classroom.jpg";
import groupImg from "../assets/group.png";
import scheduleImg from "../assets/schedule.png";
import yearImg from "../assets/year.png";
import semesterImg from "../assets/semester.jpg";

import { useNavigate } from "react-router-dom";

const Home = (props) => {
  const navigate = useNavigate();
  return (
    <div className="container">
      <div className="row my-5 justify-content-center">
        <div className="col-lg-2 col-md-4 col-sm-6 mt-4">
          <Card style={{ width: "200px", height: "300px" }}>
            <Card.Img variant="top" src={userImg} />
            <Card.Body className="row align-items-end">
              <Button onClick={() => navigate("/user")} variant="primary">
                Quản lý cán bộ
              </Button>
            </Card.Body>
          </Card>
        </div>

        <div className="col-lg-2 col-md-4 col-sm-6 mt-4">
          <Card style={{ width: "200px", height: "300px" }}>
            <Card.Img variant="top" src={facultyImg} />
            <Card.Body className="row align-items-end">
              <Button onClick={() => navigate("/faculty")} variant="primary">
                Quản lý đơn vị
              </Button>
            </Card.Body>
          </Card>
        </div>

        <div className="col-lg-2 col-md-4 col-sm-6 mt-4">
          <Card style={{ width: "200px", height: "300px" }}>
            <Card.Img variant="top" src={courseImg} />
            <Card.Body className="row align-items-end">
              <Button onClick={() => navigate("/course")} variant="primary">
                Quản lý học phần
              </Button>
            </Card.Body>
          </Card>
        </div>

        <div className="col-lg-2 col-md-4 col-sm-6 mt-4">
          <Card style={{ width: "200px", height: "300px" }}>
            <Card.Img variant="top" src={yearImg} />
            <Card.Body className="row align-items-end">
              <Button onClick={() => navigate("/year")} variant="primary">
                Quản lý năm học
              </Button>
            </Card.Body>
          </Card>
        </div>

        <div className="col-lg-2 col-md-4 col-sm-6 mt-4">
          <Card style={{ width: "200px", height: "300px" }}>
            <Card.Img variant="top" src={semesterImg} />
            <Card.Body className="row align-items-end">
              <Button onClick={() => navigate("/semester")} variant="primary">
                Quản lý học kỳ
              </Button>
            </Card.Body>
          </Card>
        </div>

        <div className="col-lg-2 col-md-4 col-sm-6 mt-4">
          <Card style={{ width: "200px", height: "300px" }}>
            <Card.Img variant="top" src={softwareImg} />
            <Card.Body className="row align-items-end">
              <Button onClick={() => navigate("/software")} variant="primary">
                Quản lý phần mềm
              </Button>
            </Card.Body>
          </Card>
        </div>

        <div className="col-lg-2 col-md-4 col-sm-6 mt-4">
          <Card style={{ width: "200px", height: "300px" }}>
            <Card.Img variant="top" src={roomImg} />
            <Card.Body className="row align-items-end">
              <Button onClick={() => navigate("/room")} variant="primary">
                Quản lý Phòng
              </Button>
            </Card.Body>
          </Card>
        </div>

        <div className="col-lg-2 col-md-4 col-sm-6 mt-4">
          <Card style={{ width: "200px", height: "300px" }}>
            <Card.Img variant="top" src={incidentImg} />
            <Card.Body className="row align-items-end">
              <Button onClick={() => navigate("/incident")} variant="primary">
                Quản lý sự cố
              </Button>
            </Card.Body>
          </Card>
        </div>

        <div className="col-lg-2 col-md-4 col-sm-6 mt-4">
          <Card style={{ width: "200px", height: "300px" }}>
            <Card.Img variant="top" src={classroomImg} />
            <Card.Body className="row align-items-end">
              <Button onClick={() => navigate("/classroom")} variant="primary">
                Quản lý lớp học phần
              </Button>
            </Card.Body>
          </Card>
        </div>

        <div className="col-lg-2 col-md-4 col-sm-6 mt-4">
          <Card style={{ width: "200px", height: "300px" }}>
            <Card.Img variant="top" src={groupImg} />
            <Card.Body className="row align-items-end">
              <Button onClick={() => navigate("/group")} variant="primary">
                Quản lý nhóm thực hành
              </Button>
            </Card.Body>
          </Card>
        </div>

        <div className="col-lg-2 col-md-4 col-sm-6 mt-4">
          <Card style={{ width: "200px", height: "300px" }}>
            <Card.Img variant="top" src={scheduleImg} />
            <Card.Body className="row align-items-end">
              <Button onClick={() => navigate("/schedule")} variant="primary">
                Xem lịch thực hành
              </Button>
            </Card.Body>
          </Card>
        </div>
      </div>
    </div>
  );
};

const mapStateToProp = (state) => {
  return {
    userData: state.user.userData,
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

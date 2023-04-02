import React from "react";
import { connect } from "react-redux";
import { Card, Button } from "react-bootstrap";
import userImg from "../../assets/user.jpg";
import facultyImg from "../../assets/faculty.jpg";
import courseImg from "../../assets/course.png";
import softwareImg from "../../assets/software.png";
import roomImg from "../../assets/room.jpg";
import incidentImg from "../../assets/incident.png";
import classroomImg from "../../assets/classroom.jpg";
import groupImg from "../../assets/group.png";
import scheduleImg from "../../assets/schedule.png";
import yearImg from "../../assets/year.png";
import semesterImg from "../../assets/semester.jpg";

import { useNavigate } from "react-router-dom";

const UserHome = () => {
  const navigate = useNavigate();
  return (
    <div className="container">
      <div className="row my-5 justify-content-center">
        <div className="col-lg-2 col-md-4 col-sm-6 mt-4">
          <Card>
            <Card.Img variant="top" src={scheduleImg} />
            <Card.Body>
              <Button onClick={() => navigate("/schedule")} variant="primary">
                Lịch thực hành
              </Button>
            </Card.Body>
          </Card>
        </div>

        <div className="col-lg-2 col-md-4 col-sm-6 mt-4">
          <Card>
            <Card.Img variant="top" src={incidentImg} />
            <Card.Body>
              <Button onClick={() => navigate("/report")} variant="primary">
                Báo cáo sự cố
              </Button>
            </Card.Body>
          </Card>
        </div>

        <div className="col-lg-2 col-md-4 col-sm-6 mt-4">
          <Card>
            <Card.Img variant="top" src={classroomImg} />
            <Card.Body>
              <Button
                onClick={() => navigate("/group-register")}
                variant="primary"
              >
                Đăng kí nhóm
              </Button>
            </Card.Body>
          </Card>
        </div>

        <div className="col-lg-2 col-md-4 col-sm-6 mt-4">
          <Card>
            <Card.Img variant="top" src={groupImg} />
            <Card.Body>
              <Button onClick={() => navigate("/your-group")} variant="primary">
                Nhóm của bạn
              </Button>
            </Card.Body>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default UserHome;

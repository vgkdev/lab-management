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

const UserHome = (props) => {
  const navigate = useNavigate();
  // console.log("check user from home: ", props.userData);

  return (
    <div className="container">
      <div
        className="row my-5 justify-content-center"
        // style={{ border: "1px solid red" }}
      >
        <div className="col-lg-6 mb-lg-0 mb-md-5 mb-sm-5 bg-white">
          <div className="row mt-4">
            <p className="text-center h2 fw-bold">Thông tin cán bộ</p>
          </div>

          <hr />
          <div className="row mt-4 justify-content-center">
            <div className="col-4">
              <p className="fw-bold fs-5">Họ tên: </p>
            </div>

            <div className="col-4">
              <p className="fs-5">{props.userData.hoTen}</p>
            </div>
          </div>

          <hr />
          <div className="row mt-4 justify-content-center">
            <div className="col-4">
              <p className="fw-bold fs-5">Email: </p>
            </div>

            <div className="col-4">
              <p className="fs-5">{props.userData.email}</p>
            </div>
          </div>

          <hr />
          <div className="row mt-4 justify-content-center">
            <div className="col-4">
              <p className="fw-bold fs-5">Mã cán bộ: </p>
            </div>

            <div className="col-4">
              <p className="fs-5">{props.userData.maCB}</p>
            </div>
          </div>

          <hr />
          <div className="row mt-4 justify-content-center">
            <div className="col-4">
              <p className="fw-bold fs-5">Chức vụ: </p>
            </div>

            <div className="col-4">
              <p className="fs-5">{props.userData.chucVu}</p>
            </div>
          </div>

          <hr />
          <div className="row mt-4 justify-content-center">
            <div className="col-4">
              <p className="fw-bold fs-5">SĐT: </p>
            </div>

            <div className="col-4">
              <p className="fs-5">{props.userData.SDT}</p>
            </div>
          </div>

          <hr />
          <div className="row mt-4 justify-content-center">
            <div className="col-4">
              <p className="fw-bold fs-5">Quê quán: </p>
            </div>

            <div className="col-4">
              <p className="fs-5">{props.userData.diaChi}</p>
            </div>
          </div>
        </div>

        <div className="col-lg-6">
          <div className="row">
            <div className="col-lg-5 col-md-4 col-sm-6 mb-3">
              <Card>
                <Card.Img variant="top" src={scheduleImg} />
                <Card.Body>
                  <Button
                    onClick={() => navigate("/schedule")}
                    variant="primary"
                  >
                    Lịch thực hành
                  </Button>
                </Card.Body>
              </Card>
            </div>
            <div className="col-lg-5 col-md-4 col-sm-6 mb-3">
              <Card>
                <Card.Img variant="top" src={incidentImg} />
                <Card.Body>
                  <Button onClick={() => navigate("/report")} variant="primary">
                    Báo cáo sự cố
                  </Button>
                </Card.Body>
              </Card>
            </div>
            <div className="col-lg-5 col-md-4 col-sm-6">
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
            <div className="col-lg-5 col-md-4 col-sm-6">
              <Card>
                <Card.Img variant="top" src={groupImg} />
                <Card.Body>
                  <Button
                    onClick={() => navigate("/your-group")}
                    variant="primary"
                  >
                    Nhóm của bạn
                  </Button>
                </Card.Body>
              </Card>
            </div>
          </div>
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
    setListIncident: (listIncident) => {
      dispatch({ type: "SET_LIST_INCIDENT", payload: listIncident });
    },
    setListRoom: (listRoom) => {
      dispatch({ type: "SET_LIST_ROOM", payload: listRoom });
    },
  };
};

export default connect(mapStateToProp, mapDispatchToProps)(UserHome);

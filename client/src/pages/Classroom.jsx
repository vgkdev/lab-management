import React, { useEffect, useState, useMemo } from "react";
import { Button, Modal, Form, Row, Spinner, Col } from "react-bootstrap";
import { connect } from "react-redux";
import {
  createNewClassroom,
  daleteClassroom,
  editClassroom,
  getAllClassroom,
} from "../api/classroomAPI";
import { getAllCourse } from "../api/courseAPI";
import { getAllSemester } from "../api/semesterAPI";
import { getAllUser } from "../api/userAPI";
import { getAllYear } from "../api/yearAPI";

import DataTable from "../components/DataTable";

const Classroom = (props) => {
  const [show, setShow] = useState(false);
  const [sttLHP, setSttLHP] = useState("");
  const [tietBD, setTietBD] = useState("");
  const [soTiet, setSoTiet] = useState("");
  const [namHoc, setNamHoc] = useState("");
  const [hocKy, setHocKy] = useState("");
  const [maHP, setMaHP] = useState("");
  const [thu, setThu] = useState("");
  const [maCB, setMaCB] = useState("");
  const [loadingData, setLoadingData] = useState(true);
  const [formEidt, setFormEidt] = useState(false);
  const [errMessage, setErrMessage] = useState("");

  const [data, setData] = React.useState([]);
  const [loading, setLoading] = React.useState(false);
  const [pageCount, setPageCount] = React.useState(0);
  const fetchIdRef = React.useRef(0);

  const columns = useMemo(
    () => [
      {
        Header: "STT LHP",
        accessor: "sttLHP",
      },
      {
        Header: "Năm học",
        accessor: "namHoc",
      },
      {
        Header: "Học kỳ",
        accessor: "hocKy",
      },
      {
        Header: "Mã học phần",
        accessor: "maHP",
      },
      {
        Header: "Tiết bắt đầu",
        accessor: "tietBD",
      },
      {
        Header: "Số tiết",
        accessor: "soTiet",
      },
      {
        Header: "Thứ",
        accessor: "thu",
      },
      {
        Header: "Mã cán bộ",
        accessor: "maCB",
      },
      {
        Header: "Trạng thái",
        accessor: "trangThaiDK",
      },
      {
        Header: "Tổng số nhóm",
        accessor: "tongSoNhom",
      },
    ],
    []
  );

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (props.listClassroom.length !== 0) {
          //   console.log("check list classroom props redux", props.listClassroom);
          setLoadingData(false);
        } else {
          const listClassroom = await getAllClassroom();

          if (listClassroom.data.errCode !== 0) {
            console.log("classroom not found");
            setLoadingData(false);
          } else {
            props.setListClassroom(listClassroom.data.classroom);
            setLoadingData(false);
            console.log("check list classroom: ", listClassroom.data.classroom);
          }
        }

        //-------------year-------------------
        if (props.listYear.length !== 0) {
          //   console.log("check list year props redux", props.listYear);
          setLoadingData(false);
        } else {
          const listYear = await getAllYear();

          if (listYear.data.errCode !== 0) {
            console.log("year not found");
            setLoadingData(false);
          } else {
            props.setListYear(listYear.data.year);
            setLoadingData(false);
            console.log("check list year: ", listYear.data.year);
          }
        }

        //-------------semester---------------
        if (props.listSemester.length !== 0) {
          //   console.log("check list semester props redux", props.listSemester);
          setLoadingData(false);
        } else {
          const listSemester = await getAllSemester();

          if (listSemester.data.errCode !== 0) {
            console.log("semester not found");
            setLoadingData(false);
          } else {
            props.setListSemester(listSemester.data.semester);
            setLoadingData(false);
            console.log("check list semester: ", listSemester.data.semester);
          }
        }

        //------------course--------------
        if (props.listCourse.length !== 0) {
          //   console.log("check list course props redux", props.listCourse);
          setLoadingData(false);
        } else {
          const listCourse = await getAllCourse();

          if (listCourse.data.errCode !== 0) {
            console.log("course not found");
            setLoadingData(false);
          } else {
            props.setListCourse(listCourse.data.course);
            setLoadingData(false);
            console.log("check list course: ", listCourse.data.course);
          }
        }

        //-----------User----------------
        if (props.listUser.length !== 0) {
          //   console.log("check list user props redux", props.listUser);
          setLoadingData(false);
        } else {
          const listUser = await getAllUser();

          if (listUser.data.errCode !== 0) {
            setLoadingData(false);
            console.log("not found");
          } else {
            props.setListUser(listUser.data.user);
            setLoadingData(false);
            console.log("check list user:", listUser.data.user);
          }
        }
      } catch (e) {
        console.log("error get all classroom: ", e);
      }
    };

    setTimeout(() => {
      fetchData();
    }, 1000);
  }, [props]);

  const fetchDataTable = React.useCallback(
    ({ pageSize, pageIndex }) => {
      const fetchId = ++fetchIdRef.current;
      setLoading(true);

      setTimeout(() => {
        if (fetchId === fetchIdRef.current) {
          const startRow = pageSize * pageIndex;
          const endRow = startRow + pageSize;
          setData(props.listClassroom.slice(startRow, endRow));
          setPageCount(Math.ceil(props.listClassroom.length / pageSize));

          setLoading(false);
        }
      }, 1000);
    },
    [props.listClassroom]
  );

  const handleClose = () => setShow(false);

  const handleShowModalCreate = () => {
    setFormEidt(false);
    setErrMessage("");
    setTietBD("");
    setSoTiet("");
    setThu("");
    setNamHoc("");
    setHocKy("");
    setMaHP("");
    setMaCB("");
    setShow(true);
  };

  const handleShowModalEdit = (classroom) => {
    setFormEidt(true);
    setErrMessage("");
    setSttLHP(classroom.sttLHP);
    setTietBD(classroom.tietBD);
    setSoTiet(classroom.soTiet);
    setThu(classroom.thu);
    setNamHoc(classroom.namHoc);
    setHocKy(classroom.hocKy);
    setMaHP(classroom.maHP);
    setMaCB(classroom.maCB);

    setShow(true);
  };

  const handleCreateNewClassroom = async () => {
    if (!(tietBD && soTiet && thu && namHoc && hocKy && maCB && maHP)) {
      setErrMessage("Nhập thiếu dữ liệu !");
      return;
    }

    try {
      const classroom = await createNewClassroom({
        tietBD: tietBD,
        soTiet: soTiet,
        thu: thu,
        namHoc: namHoc,
        hocKy: hocKy,
        maHP: maHP,
        maCB: maCB,
      });

      console.log("check create new classroom: ", classroom.data);

      if (classroom.data.errCode !== 0) {
        setErrMessage("Lớp học phần đã tồn tại, hãy nhập lớp học phần khác !");
      } else {
        const listClassroom = await getAllClassroom();
        if (listClassroom.data.errCode !== 0) {
          console.log("error get all classroom: ", listClassroom.data.message);
        } else {
          props.setListClassroom(listClassroom.data.classroom);
          setShow(false);
        }
      }
    } catch (e) {
      setErrMessage("Lỗi server");
      console.log("Error create new classroom: ", e);
    }
  };

  const handleEditClassroom = async () => {
    if (!(tietBD && soTiet && thu && namHoc && hocKy && maCB && maHP)) {
      setErrMessage("Nhập thiếu dữ liệu !");
      return;
    }

    try {
      const classroom = await editClassroom({
        sttLHP: sttLHP,
        tietBD: tietBD,
        soTiet: soTiet,
        thu: thu,
        namHoc: namHoc,
        hocKy: hocKy,
        maHP: maHP,
        maCB: maCB,
      });

      console.log("check edit classroom: ", classroom.data);

      if (classroom.data.errCode !== 0) {
        setErrMessage("Năm học đã tồn tại");
        console.log("error message edit classroom: ", classroom.data.message);
      } else {
        const listClassroom = await getAllClassroom();
        if (listClassroom.data.errCode !== 0) {
          console.log("error get all classroom: ", listClassroom.data.message);
        } else {
          props.setListClassroom(listClassroom.data.classroom);
          setShow(false);
        }
      }
    } catch (e) {
      console.log("Error edit classroom: ", e);
    }
  };

  const handleDeleteClassroom = async (data) => {
    // console.log("check maDV: ", maDV);

    const message = await daleteClassroom(data.sttLHP);

    if (message.data.errCode !== 0) {
      console.log("error delete classroom: ", message.data.message);
    } else {
      const listClassroom = await getAllClassroom();
      if (listClassroom.data.errCode !== 0) {
        console.log("error get all classroom: ", listClassroom.data.message);
      } else {
        props.setListClassroom(listClassroom.data.classroom);
        setShow(false);
      }
    }
  };

  return (
    <div className="container-fluid">
      <Modal size="lg" centered show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          {formEidt ? (
            <Modal.Title>Chỉnh sửa năm học</Modal.Title>
          ) : (
            <Modal.Title>Thêm năm học</Modal.Title>
          )}
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Row className="mb-3">
              <Form.Group as={Col}>
                <Form.Label>Tiết bắt đầu</Form.Label>
                <Form.Select
                  value={tietBD || ""}
                  onChange={(event) => setTietBD(event.target.value)}
                >
                  <option value="" className="text-center">
                    --Tiết bắt đầu--
                  </option>
                  {[...Array(10)].map((_, index) => (
                    <option key={index + 1}>{index + 1}</option>
                  ))}
                </Form.Select>
              </Form.Group>

              <Form.Group as={Col}>
                <Form.Label>Số tiết</Form.Label>
                <Form.Select
                  value={soTiet || ""}
                  onChange={(event) => setSoTiet(event.target.value)}
                >
                  <option value="" className="text-center">
                    --Số tiết--
                  </option>
                  {[...Array(5)].map((_, index) => (
                    <option key={index + 1}>{index + 1}</option>
                  ))}
                </Form.Select>
              </Form.Group>

              <Form.Group as={Col}>
                <Form.Label>Thứ</Form.Label>
                <Form.Select
                  value={thu || ""}
                  onChange={(event) => setThu(event.target.value)}
                >
                  <option value="" className="text-center">
                    --Thứ--
                  </option>
                  {[...Array(6)].map((_, index) => (
                    <option key={index + 2}>Thứ {index + 2}</option>
                  ))}
                  <option>Chủ nhật</option>
                </Form.Select>
              </Form.Group>
            </Row>

            <Row className="mb-3">
              <Form.Group as={Col} xs={8}>
                <Form.Label>Năm học</Form.Label>
                <Form.Select
                  value={namHoc || ""}
                  onChange={(event) => setNamHoc(event.target.value)}
                >
                  <option value="">--Năm học--</option>
                  {props.listYear.length !== 0 ? (
                    props.listYear.map((item, i) => {
                      return <option key={i}>{item.namHoc}</option>;
                    })
                  ) : (
                    <div>Loading...</div>
                  )}
                </Form.Select>
              </Form.Group>

              <Form.Group as={Col}>
                <Form.Label>Học kỳ</Form.Label>
                <Form.Select
                  value={hocKy || ""}
                  onChange={(event) => setHocKy(event.target.value)}
                >
                  <option value="">--Học kỳ--</option>
                  {props.listSemester.length !== 0 ? (
                    props.listSemester.map((item, i) => {
                      return <option key={i}>{item.hocKy}</option>;
                    })
                  ) : (
                    <div>Loading...</div>
                  )}
                </Form.Select>
              </Form.Group>
            </Row>

            <Row>
              <Form.Group as={Col}>
                <Form.Label>Mã học phần</Form.Label>
                <Form.Select
                  value={maHP || ""}
                  onChange={(event) => setMaHP(event.target.value)}
                >
                  <option value="">--Mã học phần--</option>
                  {props.listCourse.length !== 0 ? (
                    props.listCourse.map((item, i) => {
                      return <option key={i}>{item.maHP}</option>;
                    })
                  ) : (
                    <div>Loading...</div>
                  )}
                </Form.Select>
              </Form.Group>

              <Form.Group as={Col}>
                <Form.Label>Mã cán bộ</Form.Label>
                <Form.Select
                  value={maCB || ""}
                  onChange={(event) => setMaCB(event.target.value)}
                >
                  <option value="">--Mã cán bộ--</option>
                  {props.listUser.length !== 0 ? (
                    props.listUser.map((item, i) => {
                      return <option key={i}>{item.maCB}</option>;
                    })
                  ) : (
                    <div>Loading...</div>
                  )}
                </Form.Select>
              </Form.Group>
            </Row>

            <Row>
              <p className="text-danger">{errMessage}</p>
            </Row>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Đóng
          </Button>

          {!formEidt ? (
            <Button variant="primary" onClick={handleCreateNewClassroom}>
              Thêm
            </Button>
          ) : (
            <Button variant="primary" onClick={handleEditClassroom}>
              Lưu
            </Button>
          )}
        </Modal.Footer>
      </Modal>

      <div className="row bg-white p-4 fs-4 fw-semibold">
        Quản lý lớp học phần
      </div>

      <div className="row bg-white mt-4 mx-3 p-4">
        <div className="row my-3 justify-content-end">
          <div className="col-2">
            <Button variant="primary" onClick={handleShowModalCreate}>
              Thêm lớp học phần
            </Button>
          </div>
        </div>

        {loadingData && (
          <div className="row justify-content-center my-5">
            <Spinner animation="border" role="status">
              <span className="visually-hidden">Loading...</span>
            </Spinner>
          </div>
        )}

        {!loadingData && props.listClassroom.length !== 0 && (
          <DataTable
            columns={columns}
            data={data}
            fetchData={fetchDataTable}
            loading={loading}
            pageCount={pageCount}
            handleShowModalEdit={handleShowModalEdit}
            handleDelete={handleDeleteClassroom}
          />
        )}

        {!loadingData && props.listClassroom.length === 0 && (
          <div className="row my-4">
            <p className="text-center">Danh sách trống !</p>
          </div>
        )}
      </div>
    </div>
  );
};

const mapStateToProp = (state) => {
  return {
    listClassroom: state.classroom.listClassroom,
    listYear: state.year.listYear,
    listSemester: state.semester.listSemester,
    listCourse: state.course.listCourse,
    listUser: state.user.listUser,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    setListClassroom: (listClassroom) => {
      dispatch({ type: "SET_LIST_CLASSROOM", payload: listClassroom });
    },
    setListYear: (listYear) => {
      dispatch({ type: "SET_LIST_YEAR", payload: listYear });
    },
    setListSemester: (listSemester) => {
      dispatch({ type: "SET_LIST_SEMESTER", payload: listSemester });
    },
    setListCourse: (listCourse) => {
      dispatch({ type: "SET_LIST_COURSE", payload: listCourse });
    },
    setListUser: (listUser) => {
      dispatch({ type: "SET_LIST_USER", payload: listUser });
    },
  };
};

export default connect(mapStateToProp, mapDispatchToProps)(Classroom);

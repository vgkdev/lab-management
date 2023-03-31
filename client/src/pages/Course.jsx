import React, { useEffect, useState, useMemo } from "react";
import { Button, Modal, Form, Row, Spinner } from "react-bootstrap";
import { connect } from "react-redux";
import {
  createNewCourse,
  daleteCourse,
  editCourse,
  getAllCourse,
} from "../api/courseAPI";

import DataTable from "../components/DataTable";

const Course = (props) => {
  const [show, setShow] = useState(false);
  const [maHP, setMaHP] = useState("");
  const [oldMaHP, setOldMaHP] = useState("");
  const [tenNHP, setTenNHP] = useState("");
  const [formEidt, setFormEidt] = useState(false);
  const [errMessage, setErrMessage] = useState("");
  const [loadingData, setLoadingData] = useState(true);

  const [data, setData] = React.useState([]);
  const [loading, setLoading] = React.useState(false);
  const [pageCount, setPageCount] = React.useState(0);
  const fetchIdRef = React.useRef(0);

  const columns = useMemo(
    () => [
      {
        Header: "Mã học phần",
        accessor: "maHP",
      },
      {
        Header: "Học phần",
        accessor: "tenNHP",
      },
    ],
    []
  );

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (props.listCourse.length !== 0) {
          console.log("check list course props redux", props.listCourse);
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
      } catch (e) {
        console.log("error get all course: ", e);
      }
    };

    setTimeout(() => {
      fetchData();
    }, 1500);
  }, [props]);

  const fetchDataTable = React.useCallback(
    ({ pageSize, pageIndex }) => {
      const fetchId = ++fetchIdRef.current;
      setLoading(true);

      setTimeout(() => {
        if (fetchId === fetchIdRef.current) {
          const startRow = pageSize * pageIndex;
          const endRow = startRow + pageSize;
          setData(props.listCourse.slice(startRow, endRow));
          setPageCount(Math.ceil(props.listCourse.length / pageSize));

          setLoading(false);
        }
      }, 1000);
    },
    [props.listCourse]
  );

  const handleClose = () => setShow(false);

  const handleShowModalCreate = () => {
    setFormEidt(false);
    setErrMessage("");
    setMaHP("");
    setTenNHP("");
    setShow(true);
  };

  const handleShowModalEdit = async (course) => {
    setFormEidt(true);
    setErrMessage("");
    setMaHP(course.maHP);
    setTenNHP(course.tenNHP);
    setOldMaHP(course.maHP);
    setShow(true);
  };

  const handleCreateNewCourse = async () => {
    if (!(maHP && tenNHP)) {
      setErrMessage("Nhập thiếu dữ liệu !");
      return;
    }

    try {
      const course = await createNewCourse({
        maHP: maHP,
        tenNHP: tenNHP,
      });

      console.log("check create new course: ", course.data);

      if (course.data.errCode !== 0) {
        setErrMessage("Học phần đã tồn tại, hãy nhập mã học phần khác !");
      } else {
        const listCourse = await getAllCourse();
        if (listCourse.data.errCode !== 0) {
          console.log("error get all course: ", listCourse.data.message);
        } else {
          props.setListCourse(listCourse.data.course);
          setShow(false);
        }
      }
    } catch (e) {
      setErrMessage("Lỗi server");
      console.log("Error create new user: ", e);
    }
  };

  const handleEditCourse = async () => {
    if (!(maHP && tenNHP)) {
      setErrMessage("Nhập thiếu dữ liệu !");
      return;
    }

    try {
      const course = await editCourse({
        maHP: oldMaHP,
        newMaHP: maHP,
        tenNHP: tenNHP,
      });

      console.log("check edit course: ", course.data);

      if (course.data.errCode !== 0) {
        setErrMessage("Không tìm thấy học phần");
        console.log("error message edit course: ", course.data.message);
      } else {
        const listCourse = await getAllCourse();
        if (listCourse.data.errCode !== 0) {
          console.log("error get all course: ", listCourse.data.message);
        } else {
          props.setListCourse(listCourse.data.course);
          setShow(false);
        }
      }
    } catch (e) {
      console.log("Error edit course: ", e);
    }
  };

  const handleDeleteCourse = async (data) => {
    // console.log("check maDV: ", maDV);

    const message = await daleteCourse(data.maHP);

    if (message.data.errCode !== 0) {
      console.log("error delete course: ", message.data.message);
    } else {
      const listCourse = await getAllCourse();
      if (listCourse.data.errCode !== 0) {
        console.log("error get all course: ", listCourse.data.message);
      } else {
        props.setListCourse(listCourse.data.course);
        setShow(false);
      }
    }
  };

  return (
    <div className="container-fluid">
      <Modal size="md" centered show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          {formEidt ? (
            <Modal.Title>Chỉnh sửa học phần</Modal.Title>
          ) : (
            <Modal.Title>Thêm học phần</Modal.Title>
          )}
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Mã học phần</Form.Label>
              <Form.Control
                placeholder="Mã học phần"
                value={maHP}
                onChange={(event) => setMaHP(event.target.value)}
                // disabled={formEidt}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Tên học phần</Form.Label>
              <Form.Control
                placeholder="Tên học phần"
                value={tenNHP}
                onChange={(event) => setTenNHP(event.target.value)}
              />
            </Form.Group>

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
            <Button variant="primary" onClick={handleCreateNewCourse}>
              Thêm
            </Button>
          ) : (
            <Button variant="primary" onClick={handleEditCourse}>
              Lưu
            </Button>
          )}
        </Modal.Footer>
      </Modal>

      <div className="row bg-white p-4 fs-4 fw-semibold">Quản lý học phần</div>

      <div className="row bg-white mt-4 mx-3 p-4">
        <div className="row my-3 justify-content-end">
          <div className="col-2">
            <Button variant="primary" onClick={handleShowModalCreate}>
              Thêm học phần
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

        {!loadingData && props.listCourse.length !== 0 && (
          <DataTable
            columns={columns}
            data={data}
            fetchData={fetchDataTable}
            loading={loading}
            pageCount={pageCount}
            handleShowModalEdit={handleShowModalEdit}
            handleDelete={handleDeleteCourse}
          />
        )}

        {!loadingData && props.listCourse.length === 0 && (
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
    listCourse: state.course.listCourse,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    setListCourse: (listCourse) => {
      dispatch({ type: "SET_LIST_COURSE", payload: listCourse });
    },
  };
};

export default connect(mapStateToProp, mapDispatchToProps)(Course);

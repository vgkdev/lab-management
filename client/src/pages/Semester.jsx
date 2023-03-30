import React, { useEffect, useState, useMemo } from "react";
import { Button, Modal, Form, Row, Spinner, Col } from "react-bootstrap";
import { connect } from "react-redux";
import {
  createNewSemester,
  daleteSemester,
  editSemester,
  getAllSemester,
} from "../api/semesterAPI";

import { getAllYear } from "../api/yearAPI";

import DataTable from "../components/DataTable";

const Semester = (props) => {
  const [show, setShow] = useState(false);
  const [hocKy, setHocKy] = useState("");
  const [oldHocKy, setOldHocKy] = useState("");
  const [namHoc, setNamHoc] = useState("");
  const [oldNamHoc, setOldNamHoc] = useState("");
  const [soTuan, setSoTuan] = useState("");
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
        Header: "Năm học",
        accessor: "namHoc",
      },
      {
        Header: "Học kỳ",
        accessor: "hocKy",
      },
      {
        Header: "Số tuần",
        accessor: "soTuan",
      },
    ],
    []
  );

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (props.listSemester.length !== 0) {
          console.log("check list semester props redux", props.listSemester);
          setLoadingData(false);
          return;
        }
        const listSemester = await getAllSemester();

        if (listSemester.data.errCode !== 0) {
          console.log("semester not found");
          setLoadingData(false);
        } else {
          props.setListSemester(listSemester.data.semester);
          setLoadingData(false);
          console.log("check list semester: ", listSemester.data.semester);
        }

        // -----------------------------------------------------
        if (props.listYear.length !== 0) {
          console.log("check list year props redux", props.listYear);
          setLoadingData(false);
          return;
        }
        const listYear = await getAllYear();

        if (listYear.data.errCode !== 0) {
          console.log("year not found");
          setLoadingData(false);
        } else {
          props.setListYear(listYear.data.year);
          setLoadingData(false);
          console.log("check list year: ", listYear.data.year);
        }
      } catch (e) {
        console.log("error get all semester: ", e);
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
          setData(props.listSemester.slice(startRow, endRow));
          setPageCount(Math.ceil(props.listSemester.length / pageSize));

          setLoading(false);
        }
      }, 1000);
    },
    [props.listSemester]
  );

  const handleClose = () => setShow(false);

  const handleShowModalCreate = () => {
    setFormEidt(false);
    setErrMessage("");
    setNamHoc("");
    setHocKy("");
    setSoTuan("");
    setShow(true);
  };

  const handleShowModalEdit = (semester) => {
    setFormEidt(true);
    setErrMessage("");
    setNamHoc(semester.namHoc);
    setOldNamHoc(semester.namHoc);
    setHocKy(semester.hocKy);
    setOldHocKy(semester.hocKy);
    setSoTuan(semester.soTuan);
    setShow(true);
  };

  const handleCreateNewSemester = async () => {
    if (!(namHoc && hocKy && soTuan)) {
      setErrMessage("Nhập thiếu dữ liệu !");
      return;
    }

    try {
      const semester = await createNewSemester({
        hocKy: hocKy,
        namHoc: namHoc,
        soTuan: soTuan,
      });

      console.log("check create new semester: ", semester.data);

      if (semester.data.errCode !== 0) {
        setErrMessage("Học kỳ đã tồn tại, hãy nhập học kỳ khác !");
      } else {
        const listSemester = await getAllSemester();
        if (listSemester.data.errCode !== 0) {
          console.log("error get all semester: ", listSemester.data.message);
        } else {
          props.setListSemester(listSemester.data.semester);
          setShow(false);
        }
      }
    } catch (e) {
      setErrMessage("Lỗi server");
      console.log("Error create new semester: ", e);
    }
  };

  const handleEditSemester = async () => {
    if (!(namHoc && hocKy && soTuan)) {
      setErrMessage("Nhập thiếu dữ liệu !");
      return;
    }

    try {
      const semester = await editSemester({
        hocKy: oldHocKy,
        newHocKy: hocKy,
        namHoc: oldNamHoc,
        newNamHoc: namHoc,
        soTuan: soTuan,
      });

      console.log("check edit semester: ", semester.data);

      if (semester.data.errCode !== 0) {
        setErrMessage("Học kỳ đã tồn tại");
        console.log("error message edit semester: ", semester.data.message);
      } else {
        const listSemester = await getAllSemester();
        if (listSemester.data.errCode !== 0) {
          console.log("error get all semester: ", listSemester.data.message);
        } else {
          props.setListSemester(listSemester.data.semester);
          setShow(false);
        }
      }
    } catch (e) {
      console.log("Error edit semester: ", e);
    }
  };

  const handleDeleteSemester = async (data) => {
    // console.log("check maDV: ", maDV);

    const message = await daleteSemester(data.hocKy, data.namHoc);

    if (message.data.errCode !== 0) {
      console.log("error delete semester: ", message.data.message);
    } else {
      const listSemester = await getAllSemester();
      if (listSemester.data.errCode !== 0) {
        console.log("error get all semester: ", listSemester.data.message);
      } else {
        props.setListSemester(listSemester.data.semester);
        setShow(false);
      }
    }
  };

  return (
    <div className="container-fluid">
      <Modal size="md" centered show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          {formEidt ? (
            <Modal.Title>Chỉnh sửa học kỳ</Modal.Title>
          ) : (
            <Modal.Title>Thêm học kỳ</Modal.Title>
          )}
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Row className="mb-3">
              <Form.Group as={Col}>
                <Form.Label>Học kỳ</Form.Label>
                <Form.Select
                  value={hocKy || ""}
                  onChange={(event) => setHocKy(event.target.value)}
                >
                  <option value="" className="text-center">
                    --Học kỳ--
                  </option>
                  <option>1</option>
                  <option>2</option>
                  <option>3</option>
                </Form.Select>
              </Form.Group>

              <Form.Group as={Col}>
                <Form.Label>Số tuần</Form.Label>
                <Form.Control
                  placeholder="Số tuần"
                  value={soTuan}
                  onChange={(event) => setSoTuan(event.target.value)}
                />
              </Form.Group>
            </Row>

            <Form.Group className="mb-3">
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
            <Button variant="primary" onClick={handleCreateNewSemester}>
              Thêm
            </Button>
          ) : (
            <Button variant="primary" onClick={handleEditSemester}>
              Lưu
            </Button>
          )}
        </Modal.Footer>
      </Modal>

      <div className="row bg-white p-4 fs-4 fw-semibold">Quản lý học kỳ</div>

      <div className="row bg-white mt-4 mx-3 p-4">
        <div className="row my-3 justify-content-end">
          <div className="col-2">
            <Button variant="primary" onClick={handleShowModalCreate}>
              Thêm học kỳ
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

        {!loadingData && props.listSemester.length !== 0 && (
          <DataTable
            columns={columns}
            data={data}
            fetchData={fetchDataTable}
            loading={loading}
            pageCount={pageCount}
            handleShowModalEdit={handleShowModalEdit}
            handleDelete={handleDeleteSemester}
          />
        )}

        {!loadingData && props.listSemester.length === 0 && (
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
    listSemester: state.semester.listSemester,
    listYear: state.year.listYear,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    setListSemester: (listSemester) => {
      dispatch({ type: "SET_LIST_SEMESTER", payload: listSemester });
    },

    setListYear: (listYear) => {
      dispatch({ type: "SET_LIST_YEAR", payload: listYear });
    },
  };
};

export default connect(mapStateToProp, mapDispatchToProps)(Semester);

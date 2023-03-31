import React, { useEffect, useState, useMemo } from "react";
import { Button, Modal, Form, Row, Spinner } from "react-bootstrap";
import { connect } from "react-redux";
import {
  createNewYear,
  daleteYear,
  editYear,
  getAllYear,
} from "../api/yearAPI";

import DataTable from "../components/DataTable";

const Year = (props) => {
  const [show, setShow] = useState(false);
  const [namHoc, setNamHoc] = useState("");
  const [oldNamHoc, setOldNamHoc] = useState("");
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
    ],
    []
  );

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (props.listYear.length !== 0) {
          console.log("check list year props redux", props.listYear);
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
      } catch (e) {
        console.log("error get all year: ", e);
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
          setData(props.listYear.slice(startRow, endRow));
          setPageCount(Math.ceil(props.listYear.length / pageSize));

          setLoading(false);
        }
      }, 1000);
    },
    [props.listYear]
  );

  const handleClose = () => setShow(false);

  const handleShowModalCreate = () => {
    setFormEidt(false);
    setErrMessage("");
    setNamHoc("");
    setShow(true);
  };

  const handleShowModalEdit = (year) => {
    setFormEidt(true);
    setErrMessage("");
    setNamHoc(year.namHoc);
    setOldNamHoc(year.namHoc);
    setShow(true);
  };

  const handleCreateNewYear = async () => {
    if (!namHoc) {
      setErrMessage("Nhập thiếu dữ liệu !");
      return;
    }

    try {
      const year = await createNewYear({
        namHoc: namHoc,
      });

      console.log("check create new year: ", year.data);

      if (year.data.errCode !== 0) {
        setErrMessage("Học phần đã tồn tại, hãy nhập mã học phần khác !");
      } else {
        const listYear = await getAllYear();
        if (listYear.data.errCode !== 0) {
          console.log("error get all year: ", listYear.data.message);
        } else {
          props.setListYear(listYear.data.year);
          setShow(false);
        }
      }
    } catch (e) {
      setErrMessage("Lỗi server");
      console.log("Error create new year: ", e);
    }
  };

  const handleEditYear = async () => {
    if (!namHoc) {
      setErrMessage("Nhập thiếu dữ liệu !");
      return;
    }

    try {
      const year = await editYear({
        namHoc: oldNamHoc,
        newNamHoc: namHoc,
      });

      console.log("check edit year: ", year.data);

      if (year.data.errCode !== 0) {
        setErrMessage("Năm học đã tồn tại");
        console.log("error message edit year: ", year.data.message);
      } else {
        const listYear = await getAllYear();
        if (listYear.data.errCode !== 0) {
          console.log("error get all year: ", listYear.data.message);
        } else {
          props.setListYear(listYear.data.year);
          setShow(false);
        }
      }
    } catch (e) {
      console.log("Error edit year: ", e);
    }
  };

  const handleDeleteYear = async (data) => {
    // console.log("check maDV: ", maDV);

    const message = await daleteYear(data.namHoc);

    if (message.data.errCode !== 0) {
      console.log("error delete year: ", message.data.message);
    } else {
      const listYear = await getAllYear();
      if (listYear.data.errCode !== 0) {
        console.log("error get all year: ", listYear.data.message);
      } else {
        props.setListYear(listYear.data.year);
        setShow(false);
      }
    }
  };

  return (
    <div className="container-fluid">
      <Modal size="md" centered show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          {formEidt ? (
            <Modal.Title>Chỉnh sửa năm học</Modal.Title>
          ) : (
            <Modal.Title>Thêm năm học</Modal.Title>
          )}
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Năm học</Form.Label>
              <Form.Control
                placeholder="Năm học"
                value={namHoc}
                onChange={(event) => setNamHoc(event.target.value)}
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
            <Button variant="primary" onClick={handleCreateNewYear}>
              Thêm
            </Button>
          ) : (
            <Button variant="primary" onClick={handleEditYear}>
              Lưu
            </Button>
          )}
        </Modal.Footer>
      </Modal>

      <div className="row bg-white p-4 fs-4 fw-semibold">Quản lý năm học</div>

      <div className="row bg-white mt-4 mx-3 p-4">
        <div className="row my-3 justify-content-end">
          <div className="col-2">
            <Button variant="primary" onClick={handleShowModalCreate}>
              Thêm năm học
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

        {!loadingData && props.listYear.length !== 0 && (
          <DataTable
            columns={columns}
            data={data}
            fetchData={fetchDataTable}
            loading={loading}
            pageCount={pageCount}
            handleShowModalEdit={handleShowModalEdit}
            handleDelete={handleDeleteYear}
          />
        )}

        {!loadingData && props.listYear.length === 0 && (
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
    listYear: state.year.listYear,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    setListYear: (listYear) => {
      dispatch({ type: "SET_LIST_YEAR", payload: listYear });
    },
  };
};

export default connect(mapStateToProp, mapDispatchToProps)(Year);

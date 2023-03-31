import React, { useEffect, useState, useMemo } from "react";
import { Button, Modal, Form, Row, Spinner } from "react-bootstrap";
import { connect } from "react-redux";
import {
  createNewFaculty,
  daleteFaculty,
  editFaculty,
  getAllFaculty,
} from "../api/facultyAPI";

import DataTable from "../components/DataTable";

const Faculty = (props) => {
  const [show, setShow] = useState(false);
  const [maDV, setMaDV] = useState("");
  const [oldMaDV, setOldMaDV] = useState("");
  const [tenDV, setTenDV] = useState("");
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
        Header: "Mã đơn vị",
        accessor: "maDV",
      },
      {
        Header: "Tên đơn vị",
        accessor: "tenDV",
      },
    ],
    []
  );

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (props.listFaculty.length !== 0) {
          console.log("check list faculty", props.listFaculty);
          setLoadingData(false);
        } else {
          const listFaculty = await getAllFaculty();

          if (listFaculty.data.errCode !== 0) {
            console.log("faculty not found");
            setLoadingData(false);
          } else {
            props.setListFaculty(listFaculty.data.faculty);
            setLoadingData(false);
            // console.log("check list faculty: ", listFaculty.data.faculty);
          }
        }
      } catch (e) {
        console.log("error get all faculty: ", e);
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
          setData(props.listFaculty.slice(startRow, endRow));

          // Your server could send back total page count.
          // For now we'll just fake it, too
          setPageCount(Math.ceil(props.listFaculty.length / pageSize));

          setLoading(false);
        }
      }, 1000);
    },
    [props.listFaculty]
  );

  const handleClose = () => setShow(false);

  const handleShowModalCreate = () => {
    setFormEidt(false);
    setErrMessage("");
    setMaDV("");
    setTenDV("");
    setShow(true);
  };

  const handleShowModalEdit = async (faculty) => {
    setFormEidt(true);
    setErrMessage("");
    setMaDV(faculty.maDV);
    setTenDV(faculty.tenDV);
    setOldMaDV(faculty.maDV);
    setShow(true);
  };

  const handleCreateNewFaculty = async () => {
    if (!(maDV && tenDV)) {
      setErrMessage("Nhập thiếu dữ liệu !");
      return;
    }

    try {
      const faculty = await createNewFaculty({
        maDV,
        tenDV,
      });

      console.log("check create new faculty: ", faculty.data);

      if (faculty.data.errCode !== 0) {
        setErrMessage("Đơn vị đã tồn tại, hãy nhập mã đơn vị khác !");
      } else {
        const listFaculty = await getAllFaculty();
        if (listFaculty.data.errCode !== 0) {
          console.log("error get all faculty: ", listFaculty.data.message);
        } else {
          props.setListFaculty(listFaculty.data.faculty);
          setShow(false);
        }
      }
    } catch (e) {
      setErrMessage("Lỗi server");
      console.log("Error create new user: ", e);
    }
  };

  const handleEditFaculty = async () => {
    if (!(maDV && tenDV)) {
      setErrMessage("Nhập thiếu dữ liệu !");
      return;
    }

    try {
      const faculty = await editFaculty({
        maDV: oldMaDV,
        newMaDV: maDV,
        tenDV: tenDV,
      });

      console.log("check edit faculty: ", faculty.data);

      if (faculty.data.errCode !== 0) {
        setErrMessage("Không tìm thấy đơn vị");
        console.log("error message edit faculty: ", faculty.data.message);
      } else {
        const listFaculty = await getAllFaculty();
        if (listFaculty.data.errCode !== 0) {
          console.log("error get all faculty: ", listFaculty.data.message);
        } else {
          props.setListFaculty(listFaculty.data.faculty);
          setShow(false);
        }
      }
    } catch (e) {
      console.log("Error edit faculty: ", e);
    }
  };

  const handleDeleteFaculty = async (data) => {
    // console.log("check maDV: ", maDV);

    const message = await daleteFaculty(data.maDV);

    if (message.data.errCode !== 0) {
      console.log("error delete faculty: ", message.data.message);
    } else {
      const listFaculty = await getAllFaculty();
      if (listFaculty.data.errCode !== 0) {
        console.log("error get all faculty: ", listFaculty.data.message);
      } else {
        props.setListFaculty(listFaculty.data.faculty);
        setShow(false);
      }
    }
  };

  return (
    <div className="container-fluid">
      <Modal size="md" centered show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          {formEidt ? (
            <Modal.Title>Chỉnh sửa đơn vị</Modal.Title>
          ) : (
            <Modal.Title>Thêm đơn vị</Modal.Title>
          )}
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Mã đơn vị</Form.Label>
              <Form.Control
                placeholder="Mã đơn vị"
                value={maDV}
                onChange={(event) => setMaDV(event.target.value)}
                // disabled={formEidt}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Tên đơn vị</Form.Label>
              <Form.Control
                placeholder="Tên đơn vị"
                value={tenDV}
                onChange={(event) => setTenDV(event.target.value)}
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
            <Button variant="primary" onClick={handleCreateNewFaculty}>
              Thêm
            </Button>
          ) : (
            <Button variant="primary" onClick={handleEditFaculty}>
              Lưu
            </Button>
          )}
        </Modal.Footer>
      </Modal>

      <div className="row bg-white p-4 fs-4 fw-semibold">Quản lý đơn vị</div>

      <div className="row bg-white mt-4 mx-3 p-4">
        <div className="row my-3 justify-content-end">
          <div className="col-2">
            <Button variant="primary" onClick={handleShowModalCreate}>
              Thêm đơn vị
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

        {!loadingData && props.listFaculty.length !== 0 && (
          <DataTable
            columns={columns}
            data={data}
            fetchData={fetchDataTable}
            loading={loading}
            pageCount={pageCount}
            handleShowModalEdit={handleShowModalEdit}
            handleDelete={handleDeleteFaculty}
          />
        )}

        {!loadingData && props.listFaculty.length === 0 && (
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
    listFaculty: state.faculty.listFaculty,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    setListFaculty: (listFaculty) => {
      dispatch({ type: "SET_LIST_FACULTY", payload: listFaculty });
    },
  };
};

export default connect(mapStateToProp, mapDispatchToProps)(Faculty);

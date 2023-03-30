import React, { useEffect, useState, useMemo } from "react";
import { Button, Modal, Form, Row, Spinner } from "react-bootstrap";
import { connect } from "react-redux";
import {
  createNewSoftware,
  daleteSoftware,
  editSoftware,
  getAllSoftware,
} from "../api/softwareAPI";

import DataTable from "../components/DataTable";

const Software = (props) => {
  const [show, setShow] = useState(false);
  const [tenPM, setTenPM] = useState("");
  const [oldTenPM, setOldTenPM] = useState("");
  const [phienBan, setPhienBan] = useState("");
  const [ghiChu, setGhiChu] = useState("");
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
        Header: "Tên phần mềm",
        accessor: "tenPM",
      },
      {
        Header: "Phiên bản",
        accessor: "phienBan",
      },
      {
        Header: "Ghi chú",
        accessor: "ghiChu",
      },
    ],
    []
  );

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (props.listSoftware.length !== 0) {
          console.log("check list software props redux", props.listSoftware);
          setLoadingData(false);
          return;
        }
        const listSoftware = await getAllSoftware();

        if (listSoftware.data.errCode !== 0) {
          console.log("software not found");
          setLoadingData(false);
        } else {
          props.setListSoftware(listSoftware.data.software);
          setLoadingData(false);
          console.log("check list software: ", listSoftware.data.software);
        }
      } catch (e) {
        console.log("error get all software: ", e);
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
          setData(props.listSoftware.slice(startRow, endRow));
          setPageCount(Math.ceil(props.listSoftware.length / pageSize));

          setLoading(false);
        }
      }, 1000);
    },
    [props.listSoftware]
  );

  const handleClose = () => setShow(false);

  const handleShowModalCreate = () => {
    setFormEidt(false);
    setErrMessage("");
    setTenPM("");
    setPhienBan("");
    setGhiChu("");
    setShow(true);
  };

  const handleShowModalEdit = (software) => {
    setFormEidt(true);
    setErrMessage("");
    setTenPM(software.tenPM);
    setOldTenPM(software.tenPM);
    setPhienBan(software.phienBan);
    if (software.ghiChu === "Trống") {
      setGhiChu("");
    } else {
      setGhiChu(software.ghiChu);
    }

    setShow(true);
  };

  const handleCreateNewSoftware = async () => {
    if (!(tenPM && phienBan)) {
      setErrMessage("Nhập thiếu dữ liệu !");
      return;
    }

    try {
      const software = await createNewSoftware({
        tenPM: tenPM,
        phienBan: phienBan,
        ghiChu: ghiChu,
      });

      console.log("check create new software: ", software.data);

      if (software.data.errCode !== 0) {
        setErrMessage("Phần mềm đã tồn tại, hãy nhập phần mềm khác !");
      } else {
        const listSoftware = await getAllSoftware();
        if (listSoftware.data.errCode !== 0) {
          console.log("error get all software: ", listSoftware.data.message);
        } else {
          props.setListSoftware(listSoftware.data.software);
          setShow(false);
        }
      }
    } catch (e) {
      setErrMessage("Lỗi server");
      console.log("Error create new software: ", e);
    }
  };

  const handleEditSoftware = async () => {
    if (!(tenPM && phienBan)) {
      setErrMessage("Nhập thiếu dữ liệu !");
      return;
    }

    try {
      const software = await editSoftware({
        tenPM: oldTenPM,
        newTenPM: tenPM,
        phienBan: phienBan,
        ghiChu: ghiChu,
      });

      console.log("check edit software: ", software.data);

      if (software.data.errCode !== 0) {
        setErrMessage("Phần mềm đã tồn tại");
        console.log("error message edit software: ", software.data.message);
      } else {
        const listSoftware = await getAllSoftware();
        if (listSoftware.data.errCode !== 0) {
          console.log("error get all software: ", listSoftware.data.message);
        } else {
          props.setListSoftware(listSoftware.data.software);
          setShow(false);
        }
      }
    } catch (e) {
      console.log("Error edit software: ", e);
    }
  };

  const handleDeleteSoftware = async (data) => {
    // console.log("check maDV: ", maDV);

    const message = await daleteSoftware(data.tenPM);

    if (message.data.errCode !== 0) {
      console.log("error delete software: ", message.data.message);
    } else {
      const listSoftware = await getAllSoftware();
      if (listSoftware.data.errCode !== 0) {
        console.log("error get all software: ", listSoftware.data.message);
      } else {
        props.setListSoftware(listSoftware.data.software);
        setShow(false);
      }
    }
  };

  return (
    <div className="container-fluid">
      <Modal size="md" centered show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          {formEidt ? (
            <Modal.Title>Chỉnh sửa phần mềm</Modal.Title>
          ) : (
            <Modal.Title>Thêm phần mềm</Modal.Title>
          )}
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Tên phần mềm</Form.Label>
              <Form.Control
                placeholder="tenPM"
                value={tenPM}
                onChange={(event) => setTenPM(event.target.value)}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Phiên bản</Form.Label>
              <Form.Control
                placeholder="Phiên bản"
                value={phienBan}
                onChange={(event) => setPhienBan(event.target.value)}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Ghi chú</Form.Label>
              <Form.Control
                placeholder="Ghi chú"
                value={ghiChu}
                onChange={(event) => setGhiChu(event.target.value)}
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
            <Button variant="primary" onClick={handleCreateNewSoftware}>
              Thêm
            </Button>
          ) : (
            <Button variant="primary" onClick={handleEditSoftware}>
              Lưu
            </Button>
          )}
        </Modal.Footer>
      </Modal>

      <div className="row bg-white p-4 fs-4 fw-semibold">Quản lý phần mềm</div>

      <div className="row bg-white mt-4 mx-3 p-4">
        <div className="row my-3 justify-content-end">
          <div className="col-2">
            <Button variant="primary" onClick={handleShowModalCreate}>
              Thêm phần mềm
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

        {!loadingData && props.listSoftware.length !== 0 && (
          <DataTable
            columns={columns}
            data={data}
            fetchData={fetchDataTable}
            loading={loading}
            pageCount={pageCount}
            handleShowModalEdit={handleShowModalEdit}
            handleDelete={handleDeleteSoftware}
          />
        )}

        {!loadingData && props.listSoftware.length === 0 && (
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
    listSoftware: state.software.listSoftware,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    setListSoftware: (listSoftware) => {
      dispatch({ type: "SET_LIST_SOFTWARE", payload: listSoftware });
    },
  };
};

export default connect(mapStateToProp, mapDispatchToProps)(Software);

import React, { useEffect, useState, useMemo } from "react";
import { Button, Modal, Form, Row, Spinner } from "react-bootstrap";
import { connect } from "react-redux";
import {
  createNewIncident,
  daleteIncident,
  editIncident,
  getAllIncident,
} from "../../api/incidentAPI";

import DataTable from "../../components/DataTable";
import { getAllRoom } from "../../api/roomAPI";

const UserReport = (props) => {
  const [show, setShow] = useState(false);
  const [sttSuCo, setSttSuCo] = useState("");
  const [noiDungPhanAnh, setNoiDungPhanAnh] = useState("");
  const [trangThai, setTrangThai] = useState("");
  const [noiDungKhacPhuc, setNoiDungKhacPhuc] = useState("");
  const [ghiChuKhac, setGhiChuKhac] = useState("");
  const [ngayPhanAnh, setNgayPhanAnh] = useState("");
  const [ngayKhacPhuc, setNgayKhacPhuc] = useState("");
  const [sttPhong, setSttPhong] = useState("");
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
        Header: "Phòng",
        accessor: "tenPhong",
      },
      {
        Header: "Nội dung phản ánh",
        accessor: "noiDungPhanAnh",
      },
      {
        Header: "Ngày phản ánh",
        accessor: "ngayPhanAnh",
      },
      {
        Header: "Trạng thái",
        accessor: "trangThai",
      },
      {
        Header: "Nội dung khắc phục",
        accessor: "noiDungKhacPhuc",
      },
      {
        Header: "Ghi chú khác",
        accessor: "ghiChuKhac",
      },
      {
        Header: "Ngày khắc phục",
        accessor: "ngayKhacPhuc",
      },
      {
        Header: "GV phản ánh",
        accessor: "hoTen",
      },
    ],
    []
  );

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (props.listIncident.length !== 0) {
          console.log("check list incident props redux", props.listIncident);
          setLoadingData(false);
        } else {
          const listIncident = await getAllIncident();
          console.log("check list incident: ", listIncident);

          if (listIncident.data.errCode !== 0) {
            console.log("incident not found");
            setLoadingData(false);
          } else {
            props.setListIncident(listIncident.data.incident);
            setLoadingData(false);
            console.log("check list incident: ", listIncident.data.incident);
          }
        }

        //-------------room------------------
        if (props.listRoom.length !== 0) {
          console.log("check list room props redux", props.listRoom);
          setLoadingData(false);
        } else {
          const listRoom = await getAllRoom();

          if (listRoom.data.errCode !== 0) {
            console.log("room not found");
            setLoadingData(false);
          } else {
            props.setListRoom(listRoom.data.room);
            setLoadingData(false);
            console.log("check list room: ", listRoom.data.room);
          }
        }
      } catch (e) {
        console.log("error get all incident: ", e);
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
          setData(props.listIncident.slice(startRow, endRow));
          setPageCount(Math.ceil(props.listIncident.length / pageSize));

          setLoading(false);
        }
      }, 1000);
    },
    [props.listIncident]
  );

  const handleClose = () => setShow(false);

  const handleShowModalCreate = () => {
    setFormEidt(false);
    setErrMessage("");
    setNoiDungPhanAnh("");
    setTrangThai("");
    setNoiDungKhacPhuc("");
    setGhiChuKhac("");
    setNgayPhanAnh("");
    setNgayKhacPhuc("");
    setSttPhong("");
    setMaCB("");
    setShow(true);
  };

  const handleShowModalEdit = (incident) => {
    console.log("check incident: ", incident);
    setFormEidt(true);
    setErrMessage("");
    setSttSuCo(incident.sttSuCo);
    setNoiDungPhanAnh(incident.noiDungPhanAnh);
    setTrangThai(incident.trangThai);
    setNoiDungKhacPhuc(incident.noiDungKhacPhuc);
    setGhiChuKhac(incident.ghiChuKhac);
    setNgayPhanAnh(incident.ngayPhanAnh);
    setNgayKhacPhuc(incident.ngayKhacPhuc);
    setSttPhong(incident.sttPhong);
    setMaCB(incident.maCB);
    setShow(true);
  };

  const handleCreateNewIncident = async () => {
    if (!(noiDungPhanAnh && ngayPhanAnh && sttPhong)) {
      setErrMessage("Nhập thiếu dữ liệu !");
      return;
    }

    try {
      const incident = await createNewIncident({
        noiDungPhanAnh: noiDungPhanAnh,
        trangThai: "Chưa xử lý",
        noiDungKhacPhuc: null,
        ghiChuKhac: null,
        ngayPhanAnh: ngayPhanAnh,
        ngayKhacPhuc: null,
        sttPhong: sttPhong,
        maCB: props.userData.maCB,
      });

      console.log("check create new incident: ", incident.data);

      if (incident.data.errCode !== 0) {
        setErrMessage("Học phần đã tồn tại, hãy nhập mã học phần khác !");
      } else {
        const listIncident = await getAllIncident();
        if (listIncident.data.errCode !== 0) {
          console.log("error get all incident: ", listIncident.data.message);
        } else {
          props.setListIncident(listIncident.data.incident);
          setShow(false);
        }
      }
    } catch (e) {
      setErrMessage("Lỗi server");
      console.log("Error create new incident: ", e);
    }
  };

  const handleEditIncident = async () => {
    if (!(sttSuCo && trangThai)) {
      setErrMessage("Hãy chọn trạng thái !");
      return;
    }

    try {
      const incident = await editIncident({
        sttSuCo: sttSuCo,
        noiDungPhanAnh: noiDungPhanAnh,
        trangThai: trangThai,
        noiDungKhacPhuc: noiDungKhacPhuc,
        ghiChuKhac: ghiChuKhac,
        ngayPhanAnh: ngayPhanAnh,
        ngayKhacPhuc: ngayKhacPhuc,
        sttPhong: sttPhong,
        maCB: maCB,
      });

      console.log("check edit incident: ", incident.data);

      if (incident.data.errCode !== 0) {
        setErrMessage("Năm học đã tồn tại");
        console.log("error message edit incident: ", incident.data.message);
      } else {
        const listIncident = await getAllIncident();
        if (listIncident.data.errCode !== 0) {
          console.log("error get all incident: ", listIncident.data.message);
        } else {
          props.setListIncident(listIncident.data.incident);
          setShow(false);
        }
      }
    } catch (e) {
      console.log("Error edit incident: ", e);
    }
  };

  const handleDeleteIncident = async (data) => {
    // console.log("check maDV: ", maDV);

    const message = await daleteIncident(data.sttSuCo);

    if (message.data.errCode !== 0) {
      console.log("error delete incident: ", message.data.message);
    } else {
      const listIncident = await getAllIncident();
      if (listIncident.data.errCode !== 0) {
        console.log("error get all incident: ", listIncident.data.message);
      } else {
        props.setListIncident(listIncident.data.incident);
        setShow(false);
      }
    }
  };

  return (
    <div className="container-fluid">
      <Modal size="md" centered show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          {formEidt ? (
            <Modal.Title>Chỉnh sửa sự cố</Modal.Title>
          ) : (
            <Modal.Title>Thêm sự cố</Modal.Title>
          )}
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>STT phòng</Form.Label>
              <Form.Select
                value={sttPhong || ""}
                onChange={(event) => setSttPhong(event.target.value)}
                disabled={formEidt}
              >
                <option value="">--STT phòng--</option>
                {props.listRoom.length !== 0 ? (
                  props.listRoom.map((item, i) => {
                    return <option key={i}>{item.sttPhong}</option>;
                  })
                ) : (
                  <div>Loading...</div>
                )}
              </Form.Select>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Ngày phản ánh</Form.Label>
              <Form.Control
                placeholder="Ngày phản ánh"
                value={ngayPhanAnh}
                onChange={(event) => setNgayPhanAnh(event.target.value)}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Nội dung phản ánh</Form.Label>
              <Form.Control
                placeholder="Nội dung phản ánh"
                value={noiDungPhanAnh}
                onChange={(event) => setNoiDungPhanAnh(event.target.value)}
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
            <Button variant="primary" onClick={handleCreateNewIncident}>
              Báo cáo
            </Button>
          ) : (
            <Button variant="primary" onClick={handleEditIncident}>
              Lưu
            </Button>
          )}
        </Modal.Footer>
      </Modal>

      <div className="row bg-white p-4 fs-4 fw-semibold">Báo cáo sự cố</div>

      <div className="row bg-white mt-4 mx-3 p-4">
        <div className="row my-3 justify-content-end">
          <div className="col-2">
            <Button variant="primary" onClick={handleShowModalCreate}>
              Báo cáo
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

        {!loadingData && props.listIncident.length !== 0 && (
          <DataTable
            columns={columns}
            data={data}
            fetchData={fetchDataTable}
            loading={loading}
            pageCount={pageCount}
            handleShowModalEdit={handleShowModalEdit}
            handleDelete={handleDeleteIncident}
          />
        )}

        {!loadingData && props.listIncident.length === 0 && (
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
    listIncident: state.incident.listIncident,
    listRoom: state.room.listRoom,
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

export default connect(mapStateToProp, mapDispatchToProps)(UserReport);

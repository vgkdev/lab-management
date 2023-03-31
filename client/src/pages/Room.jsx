import React, { useEffect, useState } from "react";
import { Button, Modal, Form, Row, Spinner, Card, Col } from "react-bootstrap";
import { connect } from "react-redux";
import {
  createNewRoom,
  daleteRoom,
  editRoom,
  getAllRoom,
} from "../api/roomAPI";

import imgPC from "../assets/pc.jpg";

function ModalRoomDetail(props) {
  const { show, onHide, roomDetail } = props;
  return (
    <Modal
      show={show}
      onHide={onHide}
      size="md"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Thông tin chi tiết
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p className="fs-5 fw-semibold">
          Số thứ tự phòng: {roomDetail.sttPhong}
        </p>
        <p className="fs-5 fw-semibold">Tên phòng: {roomDetail.tenPhong}</p>
        <p className="fs-5 fw-semibold">Số lượng máy: {roomDetail.soMay}</p>
        <p className="fs-5 fw-semibold">
          Cấu hình máy: {roomDetail.cauHinhMay}
        </p>
        <p className="fs-5 fw-semibold">Ghi chú: {roomDetail.ghiChu}</p>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={props.onHide}>Close</Button>
      </Modal.Footer>
    </Modal>
  );
}

const Room = (props) => {
  const [show, setShow] = useState(false);
  const [modalRoomDetailShow, setModalRoomDetailShow] = useState(false);
  const [sttPhong, setSttPhong] = useState("");
  const [tenPhong, setTenPhong] = useState("");
  const [oldTenPhong, setOldTenPhong] = useState("");
  const [soMay, setSoMay] = useState("");
  const [cauHinhMay, setCauHinhMay] = useState("");
  const [ghiChu, setGhiChu] = useState("");
  const [loadingData, setLoadingData] = useState(true);
  const [formEidt, setFormEidt] = useState(false);
  const [errMessage, setErrMessage] = useState("");
  const [roomDetail, setRoomDetail] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
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
        console.log("error get all room: ", e);
      }
    };

    setTimeout(() => {
      fetchData();
    }, 1000);
  }, [props]);

  const handleClose = () => setShow(false);

  const handleShowModalCreate = () => {
    setFormEidt(false);
    setErrMessage("");
    setSttPhong("");
    setTenPhong("");
    setSoMay("");
    setCauHinhMay("");
    setGhiChu("");
    setShow(true);
  };

  const handleShowModalEdit = (room) => {
    setFormEidt(true);
    setErrMessage("");
    setSttPhong(room.sttPhong);
    setTenPhong(room.tenPhong);
    setOldTenPhong(room.tenPhong);
    setSoMay(room.soMay);
    setCauHinhMay(room.cauHinhMay);
    setGhiChu(room.ghiChu);
    setShow(true);
  };

  const handleCreateNewRoom = async () => {
    if (!(sttPhong && tenPhong && soMay && cauHinhMay)) {
      setErrMessage("Nhập thiếu dữ liệu !");
      return;
    }

    try {
      const room = await createNewRoom({
        sttPhong: sttPhong,
        tenPhong: tenPhong,
        soMay: soMay,
        cauHinhMay: cauHinhMay,
        ghiChu: ghiChu,
      });

      console.log("check create new room: ", room.data);

      if (room.data.errCode !== 0) {
        setErrMessage("Phòng đã tồn tại, hãy nhập tên phòng khác !");
      } else {
        const listRoom = await getAllRoom();
        if (listRoom.data.errCode !== 0) {
          console.log("error get all room: ", listRoom.data.message);
        } else {
          props.setListRoom(listRoom.data.room);
          setShow(false);
        }
      }
    } catch (e) {
      setErrMessage("Lỗi server");
      console.log("Error create new room: ", e);
    }
  };

  const handleEditRoom = async () => {
    console.log("check stt phong edit: ", sttPhong);
    if (!(sttPhong && tenPhong && soMay && cauHinhMay)) {
      setErrMessage("Nhập thiếu dữ liệu !");
      return;
    }

    try {
      const room = await editRoom({
        sttPhong: sttPhong,
        tenPhong: oldTenPhong,
        newTenPhong: tenPhong,
        soMay: soMay,
        cauHinhMay: cauHinhMay,
        ghiChu: ghiChu,
      });

      console.log("check edit room: ", room.data);

      if (room.data.errCode !== 0) {
        setErrMessage("Tên phòng đã tồn tại");
        console.log("error message edit room: ", room.data.message);
      } else {
        const listRoom = await getAllRoom();
        if (listRoom.data.errCode !== 0) {
          console.log("error get all room: ", listRoom.data.message);
        } else {
          props.setListRoom(listRoom.data.room);
          setShow(false);
        }
      }
    } catch (e) {
      console.log("Error edit room: ", e);
    }
  };

  const handleDeleteRoom = async (data) => {
    // console.log("check maDV: ", maDV);

    const message = await daleteRoom(data.sttPhong);

    if (message.data.errCode !== 0) {
      console.log("error delete room: ", message.data.message);
    } else {
      const listRoom = await getAllRoom();
      if (listRoom.data.errCode !== 0) {
        console.log("error get all room: ", listRoom.data.message);
      } else {
        props.setListRoom(listRoom.data.room);
        setShow(false);
      }
    }
  };

  const handleShowModalRoomDetail = (room) => {
    console.log("check room detail: ", room);
    setRoomDetail(room);
    setModalRoomDetailShow(true);
  };

  return (
    <div className="container-fluid">
      <ModalRoomDetail
        show={modalRoomDetailShow}
        onHide={() => setModalRoomDetailShow(false)}
        roomDetail={roomDetail}
      />

      <Modal size="md" centered show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          {formEidt ? (
            <Modal.Title>Chỉnh sửa Phòng</Modal.Title>
          ) : (
            <Modal.Title>Thêm phòng</Modal.Title>
          )}
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Row className="mb-3">
              <Form.Group as={Col}>
                <Form.Label>STT phòng</Form.Label>
                <Form.Control
                  placeholder="STT phòng"
                  value={sttPhong}
                  onChange={(event) => setSttPhong(event.target.value)}
                  disabled={formEidt}
                />
              </Form.Group>

              <Form.Group as={Col}>
                <Form.Label>Tên phòng</Form.Label>
                <Form.Control
                  placeholder="Tên phòng"
                  value={tenPhong}
                  onChange={(event) => setTenPhong(event.target.value)}
                />
              </Form.Group>

              <Form.Group as={Col}>
                <Form.Label>Số máy</Form.Label>
                <Form.Control
                  placeholder="Số máy"
                  value={soMay}
                  onChange={(event) => setSoMay(event.target.value)}
                />
              </Form.Group>
            </Row>

            <Form.Group className="mb-3">
              <Form.Label>Cấu hình máy</Form.Label>
              <Form.Control
                placeholder="Cấu hình máy"
                value={cauHinhMay}
                onChange={(event) => setCauHinhMay(event.target.value)}
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
            <Button variant="primary" onClick={handleCreateNewRoom}>
              Thêm
            </Button>
          ) : (
            <Button variant="primary" onClick={handleEditRoom}>
              Lưu
            </Button>
          )}
        </Modal.Footer>
      </Modal>

      <div className="row bg-white p-4 fs-4 fw-semibold">Quản lý phòng</div>

      <div className="row bg-white mt-4 mx-3 p-4">
        <div className="row my-3 justify-content-end">
          <div className="col-2">
            <Button variant="primary" onClick={handleShowModalCreate}>
              Thêm phòng
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

        {!loadingData && props.listRoom.length !== 0 && (
          <div className="container-fluid">
            <div className="row mb-5">
              {props.listRoom.map((item, index) => {
                return (
                  <div key={index} className="col-lg-3 col-md-6 col-ms-12 mt-3">
                    <Card style={{ width: "18rem" }}>
                      <Card.Title className="my-3 ">
                        <p className="text-center my-1 fw-bold">
                          {item.tenPhong}
                        </p>
                      </Card.Title>

                      <Card.Text className="text-center fw-semibold">
                        Số lượng máy: {item.soMay}
                      </Card.Text>
                      <Card.Text className="text-center">
                        Số thứ tự phòng: {item.sttPhong}
                      </Card.Text>

                      <Card.Img
                        className="img-fluid"
                        variant="top"
                        src={imgPC}
                      />
                      <Card.Body className="row">
                        <div className="col-2">
                          <Button
                            variant="primary"
                            onClick={() => handleShowModalEdit(item)}
                          >
                            <i className="bi bi-pencil-fill"></i>
                          </Button>
                        </div>

                        <div className="col-2">
                          <Button
                            variant="danger"
                            onClick={() => handleDeleteRoom(item)}
                          >
                            <i className="bi bi-archive-fill"></i>
                          </Button>
                        </div>

                        <div className="col-7 d-flex justify-content-end">
                          <Button
                            variant="primary"
                            onClick={() => handleShowModalRoomDetail(item)}
                          >
                            Chi tiết
                          </Button>
                        </div>
                      </Card.Body>
                    </Card>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {!loadingData && props.listRoom.length === 0 && (
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
    listRoom: state.room.listRoom,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    setListRoom: (listRoom) => {
      dispatch({ type: "SET_LIST_ROOM", payload: listRoom });
    },
  };
};

export default connect(mapStateToProp, mapDispatchToProps)(Room);

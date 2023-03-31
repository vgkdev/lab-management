import React, { useEffect, useState, useMemo } from "react";
import { Button, Modal, Form, Row, Spinner, Col } from "react-bootstrap";
import { connect } from "react-redux";
import { getAllClassroom } from "../api/classroomAPI";
import {
  createNewGroup,
  daleteGroup,
  editGroup,
  getAllGroup,
} from "../api/groupAPI";
import { getAllRoom } from "../api/roomAPI";
import { getAllSoftware } from "../api/softwareAPI";

import DataTable from "../components/DataTable";

const Group = (props) => {
  const [show, setShow] = useState(false);
  const [idNhom, setIdNhom] = useState("");
  const [soLuong, setSoLuong] = useState("");
  const [yeuCauPhanMem, setYeuCauPhanMem] = useState("");
  const [sttLHP, setSttLHP] = useState("");
  const [soTuan, setSoTuan] = useState("");
  const [sttPhong, setSttPhong] = useState("");
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
        Header: "Nhóm",
        accessor: "idNhom",
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
        Header: "Học phần",
        accessor: "maHP",
      },
      {
        Header: "STT lớp học phần",
        accessor: "sttLHP",
      },
      {
        Header: "Tiết BD",
        accessor: "tietBD",
      },
      {
        Header: "Số tiết",
        accessor: "soTiet",
      },
      {
        Header: "Yêu cầu phần mềm",
        accessor: "yeuCauPhanMem",
      },
      {
        Header: "Số luọng",
        accessor: "soLuong",
      },
      {
        Header: "Số tuần",
        accessor: "tuan",
      },
      {
        Header: "Phòng",
        accessor: "tenPhong",
      },
      {
        Header: "Trạng thái",
        accessor: "trangThaiSapLich",
      },
    ],
    []
  );

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (props.listGroup.length !== 0) {
          console.log("check list group props redux", props.listGroup);
          setLoadingData(false);
        } else {
          const listGroup = await getAllGroup();

          if (listGroup.data.errCode !== 0) {
            console.log("group not found");
            setLoadingData(false);
          } else {
            props.setListGroup(listGroup.data.group);
            setLoadingData(false);
            console.log("check list group: ", listGroup.data.group);
          }
        }

        //------------classroom-------------------
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

        //-------software---------------
        if (props.listSoftware.length !== 0) {
          //   console.log("check list software props redux", props.listSoftware);
          setLoadingData(false);
        } else {
          const listSoftware = await getAllSoftware();

          if (listSoftware.data.errCode !== 0) {
            console.log("software not found");
            setLoadingData(false);
          } else {
            props.setListSoftware(listSoftware.data.software);
            setLoadingData(false);
            console.log("check list software: ", listSoftware.data.software);
          }
        }

        //------------room------------------
        if (props.listRoom.length !== 0) {
          // console.log("check list room props redux", props.listRoom);
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
        console.log("error get all group: ", e);
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
          setData(props.listGroup.slice(startRow, endRow));
          setPageCount(Math.ceil(props.listGroup.length / pageSize));

          setLoading(false);
        }
      }, 1000);
    },
    [props.listGroup]
  );

  const handleClose = () => setShow(false);

  const handleShowModalCreate = () => {
    setFormEidt(false);
    setErrMessage("");
    setSoLuong("");
    setYeuCauPhanMem("");
    setSttLHP("");
    setSoTuan("");
    setSttPhong("");
    setShow(true);
  };

  const handleShowModalEdit = (group) => {
    setFormEidt(true);
    setErrMessage("");
    setSoLuong(group.soLuong);
    setYeuCauPhanMem(group.yeuCauPhanMem);
    setSttLHP(group.sttLHP);
    setSoTuan(group.soTuan);
    setSttPhong(group.sttPhong);
    setShow(true);
  };

  const handleCreateNewGroup = async () => {
    if (!(soLuong && yeuCauPhanMem && sttLHP && soTuan && sttPhong)) {
      setErrMessage("Nhập thiếu dữ liệu !");
      return;
    }

    try {
      const group = await createNewGroup({
        soLuong: soLuong,
        yeuCauPhanMem: yeuCauPhanMem,
        sttLHP: sttLHP,
        tuan: soTuan,
        sttPhong: sttPhong,
      });

      console.log("check create new group: ", group.data);

      if (group.data.errCode !== 0) {
        setErrMessage("Học phần đã tồn tại, hãy nhập mã học phần khác !");
      } else {
        const listGroup = await getAllGroup();
        if (listGroup.data.errCode !== 0) {
          console.log("error get all group: ", listGroup.data.message);
        } else {
          props.setListGroup(listGroup.data.group);
          setShow(false);
        }
      }
    } catch (e) {
      setErrMessage("Lỗi server");
      console.log("Error create new group: ", e);
    }
  };

  const handleEditGroup = async () => {
    if (!(soLuong && yeuCauPhanMem && sttLHP && soTuan && sttPhong)) {
      setErrMessage("Nhập thiếu dữ liệu !");
      return;
    }

    try {
      const group = await editGroup({
        idNhom: idNhom,
        soLuong: soLuong,
        yeuCauPhanMem: yeuCauPhanMem,
        sttLHP: sttLHP,
        tuan: soTuan,
        sttPhong: sttPhong,
      });

      console.log("check edit group: ", group.data);

      if (group.data.errCode !== 0) {
        setErrMessage("Năm học đã tồn tại");
        console.log("error message edit group: ", group.data.message);
      } else {
        const listGroup = await getAllGroup();
        if (listGroup.data.errCode !== 0) {
          console.log("error get all group: ", listGroup.data.message);
        } else {
          props.setListGroup(listGroup.data.group);
          setShow(false);
        }
      }
    } catch (e) {
      console.log("Error edit group: ", e);
    }
  };

  const handleDeleteGroup = async (data) => {
    // console.log("check maDV: ", maDV);

    const message = await daleteGroup(data.namHoc);

    if (message.data.errCode !== 0) {
      console.log("error delete group: ", message.data.message);
    } else {
      const listGroup = await getAllGroup();
      if (listGroup.data.errCode !== 0) {
        console.log("error get all group: ", listGroup.data.message);
      } else {
        props.setListGroup(listGroup.data.group);
        setShow(false);
      }
    }
  };

  return (
    <div className="container-fluid">
      <Modal size="md" centered show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          {formEidt ? (
            <Modal.Title>Chỉnh sửa nhóm thực hành</Modal.Title>
          ) : (
            <Modal.Title>Thêm nhóm thực hành</Modal.Title>
          )}
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Row className="mb-3">
              <Form.Group as={Col}>
                <Form.Label>STT lớp học phần</Form.Label>
                <Form.Select
                  value={sttLHP || ""}
                  onChange={(event) => setSttLHP(event.target.value)}
                  disabled={formEidt}
                >
                  <option value="">--STT lớp học phần--</option>
                  {props.listClassroom.length !== 0 ? (
                    props.listClassroom.map((item, i) => {
                      return <option key={i}>{item.sttLHP}</option>;
                    })
                  ) : (
                    <div>Loading...</div>
                  )}
                </Form.Select>
              </Form.Group>

              <Form.Group as={Col}>
                <Form.Label>Số lượng</Form.Label>
                <Form.Control
                  placeholder="Số lượng"
                  value={soLuong}
                  onChange={(event) => setSoLuong(event.target.value)}
                  disabled={formEidt}
                />
              </Form.Group>
            </Row>

            <Form.Group className="mb-3">
              <Form.Label>STT lớp học phần</Form.Label>
              <Form.Select
                value={yeuCauPhanMem || ""}
                onChange={(event) => setYeuCauPhanMem(event.target.value)}
                disabled={formEidt}
              >
                <option value="">--Phần mềm--</option>
                {props.listSoftware.length !== 0 ? (
                  props.listSoftware.map((item, i) => {
                    return <option key={i}>{item.tenPM}</option>;
                  })
                ) : (
                  <div>Loading...</div>
                )}
              </Form.Select>
            </Form.Group>

            <Row>
              <p className="fw-semibold text-center">
                ---Sắp xếp lịch thực hành---
              </p>
            </Row>

            <Row className="mb-3">
              <Form.Group as={Col}>
                <Form.Label>Số tuần</Form.Label>
                <Form.Select
                  value={soTuan || ""}
                  onChange={(event) => setSoTuan(event.target.value)}
                >
                  <option value="" className="text-center">
                    --Số tuần--
                  </option>
                  {[...Array(7)].map((_, index) => (
                    <option key={index + 1}> {index + 1}</option>
                  ))}
                </Form.Select>
              </Form.Group>

              <Form.Group as={Col}>
                <Form.Label>STT phòng</Form.Label>
                <Form.Select
                  value={sttPhong || ""}
                  onChange={(event) => setSttPhong(event.target.value)}
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
            <Button variant="primary" onClick={handleCreateNewGroup}>
              Thêm
            </Button>
          ) : (
            <Button variant="primary" onClick={handleEditGroup}>
              Lưu
            </Button>
          )}
        </Modal.Footer>
      </Modal>

      <div className="row bg-white p-4 fs-4 fw-semibold">
        Quản lý nhóm thực hành
      </div>

      <div className="row bg-white mt-4 mx-3 p-4">
        <div className="row my-3 justify-content-end">
          <div className="col-2">
            <Button variant="primary" onClick={handleShowModalCreate}>
              Thêm nhóm
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

        {!loadingData && props.listGroup.length !== 0 && (
          <DataTable
            columns={columns}
            data={data}
            fetchData={fetchDataTable}
            loading={loading}
            pageCount={pageCount}
            handleShowModalEdit={handleShowModalEdit}
            handleDelete={handleDeleteGroup}
          />
        )}

        {!loadingData && props.listGroup.length === 0 && (
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
    listGroup: state.group.listGroup,
    listClassroom: state.classroom.listClassroom,
    listSoftware: state.software.listSoftware,
    listRoom: state.room.listRoom,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    setListGroup: (listGroup) => {
      dispatch({ type: "SET_LIST_GROUP", payload: listGroup });
    },
    setListClassroom: (listClassroom) => {
      dispatch({ type: "SET_LIST_CLASSROOM", payload: listClassroom });
    },
    setListSoftware: (listSoftware) => {
      dispatch({ type: "SET_LIST_SOFTWARE", payload: listSoftware });
    },
    setListRoom: (listRoom) => {
      dispatch({ type: "SET_LIST_ROOM", payload: listRoom });
    },
  };
};

export default connect(mapStateToProp, mapDispatchToProps)(Group);

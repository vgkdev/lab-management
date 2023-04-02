import React, { useEffect, useState, useMemo } from "react";
import { Button, Modal, Form, Col, Row, Spinner } from "react-bootstrap";
import { connect } from "react-redux";
import { getAllFaculty } from "../api/facultyAPI";
import {
  createNewUser,
  deleteUser,
  editUser,
  getAllUser,
} from "../api/userAPI";
import DataTable from "../components/DataTable";

const User = (props) => {
  const [user, setUser] = useState([]);
  const [show, setShow] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [maCB, setMaCB] = useState("");
  const [maDV, setMaDV] = useState("");
  const [hoTen, setHoTen] = useState("");
  const [SDT, setSDT] = useState("");
  const [diaChi, setDiaChi] = useState("");
  const [chucVu, setChucVu] = useState("");
  const [formEidtUser, setFormEidtUser] = useState(false);
  const [errMessage, setErrMessage] = useState("");
  const [loadingData, setLoadingData] = useState(true);

  const [data, setData] = React.useState([]);
  const [loading, setLoading] = React.useState(false);
  const [pageCount, setPageCount] = React.useState(0);
  const fetchIdRef = React.useRef(0);

  const columns = useMemo(
    () => [
      {
        Header: "Mã cán bộ",
        accessor: "maCB",
      },
      {
        Header: "Tên CB",
        accessor: "hoTen",
      },
      {
        Header: "Email",
        accessor: "email",
      },
      {
        Header: "Đơn vị",
        accessor: "maDV",
      },
      {
        Header: "SĐT",
        accessor: "SDT",
      },
      {
        Header: "Địa chỉ",
        accessor: "diaChi",
      },
      {
        Header: "Chức vụ",
        accessor: "chucVu",
      },
    ],
    []
  );

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (props.listUser.length !== 0) {
          setUser(props.listUser);
          setLoadingData(false);
        } else {
          const listUser = await getAllUser();

          if (listUser.data.errCode !== 0) {
            setLoadingData(false);
            console.log("not found");
          } else {
            setUser(listUser.data.user);
            props.setListUser(listUser.data.user);
            setLoadingData(false);
            console.log(listUser.data.user);
          }
        }

        if (props.listFaculty.length !== 0) {
          setLoadingData(false);
        } else {
          const listFaculty = await getAllFaculty();

          if (listFaculty.data.errCode !== 0) {
            setLoadingData(false);
            console.log("faculty not found");
          } else {
            props.setListFaculty(listFaculty.data.faculty);
            setLoadingData(false);
            // console.log("check list faculty: ", listFaculty.data.faculty);
          }
        }
      } catch (e) {
        console.log("error get all user: ", e);
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
          setData(props.listUser.slice(startRow, endRow));

          // Your server could send back total page count.
          // For now we'll just fake it, too
          setPageCount(Math.ceil(props.listUser.length / pageSize));

          setLoading(false);
        }
      }, 1000);
    },
    [props.listUser]
  );

  const handleClose = () => setShow(false);

  const handleShowModalCreate = () => {
    setFormEidtUser(false);
    setEmail("");
    setPassword("");
    setHoTen("");
    setDiaChi("");
    setMaCB("");
    setMaDV("");
    setChucVu("");
    setSDT("");
    setErrMessage("");
    setShow(true);
  };

  const handleCreateNewUser = async () => {
    if (
      !(email && password && maCB && maDV && SDT && diaChi && chucVu && hoTen)
    ) {
      setErrMessage("Nhập thiếu dữ liệu !");
      return;
    }

    try {
      const user = await createNewUser({
        email,
        password,
        maCB,
        maDV,
        SDT,
        diaChi,
        chucVu,
        hoTen,
      });

      console.log("check create new user: ", user.data);

      if (user.data.errCode !== 0) {
        setErrMessage(
          "Cán bộ đã tồn tại, hãy nhập email hoặc mã cán bộ khác !"
        );
      } else {
        const listUser = await getAllUser();
        if (listUser.data.errCode !== 0) {
          console.log("error get all user: ", listUser.data.message);
        } else {
          setUser(listUser.data.user);
          props.setListUser(listUser.data.user);
          setShow(false);
        }
      }
    } catch (e) {
      setErrMessage("Lỗi server");
      console.log("Error create new user: ", e);
    }
  };

  const handleEditUser = async () => {
    if (!(maDV && SDT && diaChi && chucVu && hoTen)) {
      setErrMessage("Nhập thiếu dữ liệu !");
      return;
    }

    try {
      const user = await editUser({
        maCB,
        maDV,
        SDT,
        diaChi,
        chucVu,
        hoTen,
      });

      console.log("check edit user: ", user.data);

      if (user.data.errCode !== 0) {
        setErrMessage("Không tìm thấy cán bộ");
        console.log("error message edit user: ", user.data.message);
      } else {
        const listUser = await getAllUser();
        if (listUser.data.errCode !== 0) {
          console.log("error get all user: ", listUser.data.message);
        } else {
          setUser(listUser.data.user);
          props.setListUser(listUser.data.user);
          setShow(false);
        }
      }
    } catch (e) {
      console.log("Error edit user: ", e);
    }
  };

  const handleDeleteUser = async (data) => {
    // console.log("check maCB: ", maCB);

    const message = await deleteUser(data.maCB);

    if (message.data.errCode !== 0) {
      console.log("error delete user: ", message.data.message);
    } else {
      const listUser = await getAllUser();
      setUser(listUser.data.user);
      props.setListUser(listUser.data.user);
    }
  };

  const handleShowModalEdit = async (user) => {
    setFormEidtUser(true);
    setShow(true);

    setEmail(user.email);
    setHoTen(user.hoTen);
    setDiaChi(user.diaChi);
    setMaCB(user.maCB);
    setMaDV(user.maDV);
    setChucVu(user.chucVu);
    setSDT(user.SDT);
  };

  return (
    <div className="container-fluid">
      <Modal size="lg" show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          {formEidtUser ? (
            <Modal.Title>Chỉnh sửa cán bộ</Modal.Title>
          ) : (
            <Modal.Title>Thêm cán bộ</Modal.Title>
          )}
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Row className="mb-3">
              <Form.Group as={Col}>
                <Form.Label>Email</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="Enter email"
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  disabled={formEidtUser}
                />
              </Form.Group>

              <Form.Group as={Col}>
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                  disabled={formEidtUser}
                />
              </Form.Group>
            </Row>

            <Form.Group className="mb-3">
              <Form.Label>Họ tên</Form.Label>
              <Form.Control
                placeholder="Họ tên"
                value={hoTen}
                onChange={(event) => setHoTen(event.target.value)}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Địa chỉ</Form.Label>
              <Form.Control
                placeholder="Địa chỉ"
                value={diaChi}
                onChange={(event) => setDiaChi(event.target.value)}
              />
            </Form.Group>

            <Row className="mb-3">
              <Form.Group md={2} as={Col}>
                <Form.Label>Mã cán bộ</Form.Label>
                <Form.Control
                  placeholder="Mã cán bộ"
                  value={maCB}
                  onChange={(event) => setMaCB(event.target.value)}
                  disabled={formEidtUser}
                />
              </Form.Group>

              <Form.Group md={2} as={Col}>
                <Form.Label>Đơn vị</Form.Label>
                <Form.Select
                  value={maDV || ""}
                  onChange={(event) => setMaDV(event.target.value)}
                >
                  <option value="">--Đơn vị--</option>
                  {props.listFaculty.length !== 0 ? (
                    props.listFaculty.map((item, i) => {
                      return <option key={i}>{item.maDV}</option>;
                    })
                  ) : (
                    <div>Loading...</div>
                  )}
                </Form.Select>
              </Form.Group>

              <Form.Group as={Col}>
                <Form.Label>Chức vụ</Form.Label>
                <Form.Select
                  value={chucVu || ""}
                  onChange={(event) => setChucVu(event.target.value)}
                >
                  <option value="" className="text-center">
                    --Chức vụ--
                  </option>
                  <option>Admin</option>
                  <option>Giảng viên</option>
                  {/* <option>CB sắp lịch TH</option> */}
                </Form.Select>
              </Form.Group>

              <Form.Group as={Col}>
                <Form.Label>Số điện thoại</Form.Label>
                <Form.Control
                  placeholder="Số điện thoại"
                  value={SDT}
                  onChange={(event) => setSDT(event.target.value)}
                />
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

          {!formEidtUser ? (
            <Button variant="primary" onClick={handleCreateNewUser}>
              Thêm
            </Button>
          ) : (
            <Button variant="primary" onClick={handleEditUser}>
              Lưu
            </Button>
          )}
        </Modal.Footer>
      </Modal>

      <div className="row bg-white p-4 fs-4 fw-semibold">Quản lý cán bộ</div>

      <div className="row bg-white mt-4 mx-3 p-4">
        <div className="row my-3 justify-content-end">
          <div className="col-2">
            <Button variant="primary" onClick={handleShowModalCreate}>
              Thêm cán bộ
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

        {!loadingData && user.length !== 0 && (
          <DataTable
            columns={columns}
            data={data}
            fetchData={fetchDataTable}
            loading={loading}
            pageCount={pageCount}
            handleShowModalEdit={handleShowModalEdit}
            handleDelete={handleDeleteUser}
          />
        )}

        {!loadingData && user.length === 0 && (
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
    userData: state.user.userData,
    listUser: state.user.listUser,
    listFaculty: state.faculty.listFaculty,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    setListUser: (listUser) => {
      dispatch({ type: "SET_LIST_USER", payload: listUser });
    },

    setListFaculty: (listFaculty) => {
      dispatch({ type: "SET_LIST_FACULTY", payload: listFaculty });
    },
  };
};

export default connect(mapStateToProp, mapDispatchToProps)(User);

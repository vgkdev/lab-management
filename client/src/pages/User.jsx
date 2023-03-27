import React, { useEffect, useState } from "react";
import { Table, Button, Modal, Form, Col, Row, Spinner } from "react-bootstrap";
import { connect } from "react-redux";
import {
  createNewUser,
  deleteUser,
  editUser,
  getAllUser,
} from "../api/userAPI";

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

  useEffect(() => {
    const fetchDate = async () => {
      try {
        if (props.listUser.length !== 0) {
          setUser(props.listUser);
          return;
        }
        const listUser = await getAllUser();

        if (!listUser) {
          console.log("not found");
        } else {
          setUser(listUser.data.user);
          props.setListUser(listUser.data.user);
          console.log(listUser.data.user);
        }
      } catch (e) {
        console.log("error get all user: ", e);
      }
    };

    setTimeout(() => {
      fetchDate();
    }, 1500);
  }, [props]);

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

  const handleSort = (columnName) => {
    const sortedUser = user.sort((a, b) =>
      a[columnName] > b[columnName] ? 1 : b[columnName] > a[columnName] ? -1 : 0
    );
    setUser([...sortedUser]);
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

  const handleDelteUser = async (maCB) => {
    // console.log("check maCB: ", maCB);

    const message = await deleteUser(maCB);

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
                  <option>CNTT</option>
                  <option>TTNT</option>
                </Form.Select>
              </Form.Group>

              <Form.Group as={Col}>
                <Form.Label>Chức vụ</Form.Label>
                <Form.Control
                  placeholder="Chức vụ"
                  value={chucVu}
                  onChange={(event) => setChucVu(event.target.value)}
                />
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

      {user.length ? (
        <div className="row bg-white mt-4 mx-3 p-4">
          <div className="row my-3 justify-content-end">
            <div className="col-2">
              <Button variant="primary" onClick={handleShowModalCreate}>
                Thêm cán bộ
              </Button>
            </div>
          </div>

          <Table striped bordered hover>
            <thead>
              <tr>
                <th>
                  Mã CB
                  <i
                    style={{ cursor: "pointer" }}
                    onClick={() => handleSort("maCB")}
                    className="bi bi-caret-down-fill"
                  ></i>
                </th>

                <th>
                  Tên CB
                  <i
                    style={{ cursor: "pointer" }}
                    onClick={() => handleSort("hoTen")}
                    className="bi bi-caret-down-fill"
                  ></i>
                </th>
                <th>
                  Email
                  <i
                    style={{ cursor: "pointer" }}
                    onClick={() => handleSort("email")}
                    className="bi bi-caret-down-fill"
                  ></i>
                </th>
                <th>
                  Đơn vị
                  <i
                    style={{ cursor: "pointer" }}
                    onClick={() => handleSort("donVi")}
                    className="bi bi-caret-down-fill"
                  ></i>
                </th>
                <th>
                  SĐT
                  <i
                    style={{ cursor: "pointer" }}
                    onClick={() => handleSort("SDT")}
                    className="bi bi-caret-down-fill"
                  ></i>
                </th>
                <th>
                  Địa chỉ
                  <i
                    style={{ cursor: "pointer" }}
                    onClick={() => handleSort("diaChi")}
                    className="bi bi-caret-down-fill"
                  ></i>
                </th>
                <th>
                  Chức vụ
                  <i
                    style={{ cursor: "pointer" }}
                    onClick={() => handleSort("chucVu")}
                    className="bi bi-caret-down-fill"
                  ></i>
                </th>
                <th>Quản lý</th>
              </tr>
            </thead>

            <tbody>
              {user.map((user, index) => (
                <tr key={index}>
                  <td>{user.maCB}</td>
                  <td>{user.hoTen}</td>
                  <td>{user.email}</td>
                  <td>{user.maDV}</td>
                  <td>{user.SDT}</td>
                  <td>{user.diaChi}</td>
                  <td>{user.chucVu}</td>
                  <td>
                    <Button
                      variant="light"
                      onClick={() => handleShowModalEdit(user)}
                    >
                      <i className="bi bi-pencil-fill"></i>
                    </Button>{" "}
                    {user.chucVu === "Admin" ? (
                      <></>
                    ) : (
                      <Button
                        variant="light"
                        onClick={() => handleDelteUser(user.maCB)}
                      >
                        <i className="bi bi-archive-fill"></i>
                      </Button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
      ) : (
        <div className="row justify-content-center my-5">
          <Spinner animation="border" role="status">
            <span className="visually-hidden">Loading...</span>
          </Spinner>
        </div>
      )}
    </div>
  );
};

const mapStateToProp = (state) => {
  return {
    userData: state.userData,
    listUser: state.listUser,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    setListUser: (listUser) => {
      dispatch({ type: "SET_LIST_USER", payload: listUser });
    },
  };
};

export default connect(mapStateToProp, mapDispatchToProps)(User);

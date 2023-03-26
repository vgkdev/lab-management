import React, { useEffect, useState } from "react";
import { Table, Button, Modal, Form, Col, Row } from "react-bootstrap";
import { getAllUser } from "../api/userAPI";

const User = () => {
  const [user, setUser] = useState([]);
  const [show, setShow] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  useEffect(() => {
    const fetchDate = async () => {
      try {
        const listUser = await getAllUser();

        if (!listUser) {
          console.log("not found");
        } else {
          setUser(listUser.data.user);
          console.log(listUser.data.user);
        }
      } catch (e) {
        console.log("error get all user: ", e);
      }
    };

    setTimeout(() => {
      fetchDate();
    }, 1500);
  }, []);

  const handleSort = (columnName) => {
    const sortedUser = user.sort((a, b) =>
      a[columnName] > b[columnName] ? 1 : b[columnName] > a[columnName] ? -1 : 0
    );
    setUser([...sortedUser]);
  };

  const handleCreateNewUser = () => {};

  return (
    <div className="container-fluid">
      <Modal size="lg" show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Thêm cán bộ</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Row className="mb-3">
              <Form.Group as={Col} controlId="formGridEmail">
                <Form.Label>Email</Form.Label>
                <Form.Control type="email" placeholder="Enter email" />
              </Form.Group>

              <Form.Group as={Col} controlId="formGridPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control type="password" placeholder="Password" />
              </Form.Group>
            </Row>

            <Form.Group className="mb-3" controlId="formGridAddress1">
              <Form.Label>Họ tên</Form.Label>
              <Form.Control placeholder="Họ tên" />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formGridAddress2">
              <Form.Label>Địa chỉ</Form.Label>
              <Form.Control placeholder="Địa chỉ" />
            </Form.Group>

            <Row className="mb-3">
              <Form.Group md={2} as={Col} controlId="formGridCity">
                <Form.Label>Mã cán bộ</Form.Label>
                <Form.Control placeholder="Mã cán bộ" />
              </Form.Group>

              <Form.Group md={2} as={Col} controlId="formGridState">
                <Form.Label>Đơn vị</Form.Label>
                <Form.Select defaultValue="CNTT">
                  <option>CNTT</option>
                  <option>TTNT</option>
                </Form.Select>
              </Form.Group>

              <Form.Group as={Col} controlId="formGridState">
                <Form.Label>Chức vụ</Form.Label>
                <Form.Control placeholder="Chức vụ" />
              </Form.Group>

              <Form.Group as={Col} controlId="formGridZip">
                <Form.Label>Số điện thoại</Form.Label>
                <Form.Control placeholder="Số điện thoại" />
              </Form.Group>
            </Row>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleClose}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>

      <div className="row bg-white p-4 fs-4 fw-semibold">Quản lý cán bộ</div>

      <div className="row bg-white mt-4 mx-3 p-4">
        <div className="row my-3 justify-content-end">
          <div className="col-2">
            <Button variant="primary" onClick={handleShow}>
              Thêm cán bộ
            </Button>
          </div>
        </div>
        <Table striped bordered hover>
          <thead>
            <tr>
              {/* <th
                style={{ cursor: "pointer" }}
                onClick={() => handleSort("id")}
              >
                ID
              </th> */}
              <th
                style={{ cursor: "pointer" }}
                onClick={() => handleSort("maCB")}
              >
                Mã CB
              </th>
              <th
                style={{ cursor: "pointer" }}
                onClick={() => handleSort("hoTen")}
              >
                Tên CB
              </th>
              <th
                style={{ cursor: "pointer" }}
                onClick={() => handleSort("email")}
              >
                Email
              </th>
              <th
                style={{ cursor: "pointer" }}
                onClick={() => handleSort("donVi")}
              >
                Đơn vị
              </th>
              <th
                style={{ cursor: "pointer" }}
                onClick={() => handleSort("SDT")}
              >
                SĐT
              </th>
              <th
                style={{ cursor: "pointer" }}
                onClick={() => handleSort("diaChi")}
              >
                Địa chỉ
              </th>
              <th
                style={{ cursor: "pointer" }}
                onClick={() => handleSort("chucVu")}
              >
                Chức vụ
              </th>
              <th>Quản lý</th>
            </tr>
          </thead>

          <tbody>
            {user.map((user, index) => (
              <tr key={index}>
                {/* <td>{user.id}</td> */}
                <td>{user.maCB}</td>
                <td>{user.hoTen}</td>
                <td>{user.email}</td>
                <td>{user.maDV}</td>
                <td>{user.SDT}</td>
                <td>{user.diaChi}</td>
                <td>{user.chucVu}</td>
                <td>
                  <Button variant="warning">Sửa</Button>{" "}
                  <Button variant="danger">Xóa</Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
    </div>
  );
};

export default User;

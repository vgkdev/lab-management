import Container from "react-bootstrap/Container";
import { Nav } from "react-bootstrap";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import { NavLink } from "react-router-dom";
import { connect } from "react-redux";

function NavBar(props) {
  return (
    <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
      <Container>
        <Navbar.Brand className="fs-2" as={NavLink} end to={"/"}>
          HCMUS
        </Navbar.Brand>

        <Navbar.Toggle aria-controls="responsive-navbar-nav" />

        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link as={NavLink} end to={"/"}>
              Trang chủ
            </Nav.Link>

            <NavDropdown
              title="Quản lý"
              menuVariant="dark"
              id="basic-nav-dropdown"
            >
              <NavDropdown.Item as={NavLink} to={"/user"}>
                Cán Bộ
              </NavDropdown.Item>
              <NavDropdown.Item as={NavLink} to={"/faculty"}>
                Đơn vị
              </NavDropdown.Item>
              <NavDropdown.Item as={NavLink} to={"/course"}>
                Học phần
              </NavDropdown.Item>
              <NavDropdown.Item as={NavLink} to={"/year"}>
                Năm học
              </NavDropdown.Item>
              <NavDropdown.Item as={NavLink} to={"/semester"}>
                Học kỳ
              </NavDropdown.Item>
              <NavDropdown.Item as={NavLink} to={"/software"}>
                Phàn mềm
              </NavDropdown.Item>
              <NavDropdown.Item as={NavLink} to={"/room"}>
                Phòng
              </NavDropdown.Item>
              <NavDropdown.Item as={NavLink} to={"/incident"}>
                Sự cố
              </NavDropdown.Item>
              <NavDropdown.Item as={NavLink} to={"/classroom"}>
                Lớp học phần
              </NavDropdown.Item>
              <NavDropdown.Item as={NavLink} to={"/group"}>
                Nhóm thực hành
              </NavDropdown.Item>
              <NavDropdown.Item as={NavLink} to={"/schedule"}>
                Xem lịch thực hành
              </NavDropdown.Item>
            </NavDropdown>
          </Nav>
          <Nav>
            <Nav.Link as={NavLink} to={"/"} onClick={props.userLogout}>
              Đăng xuất
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

const mapStateToProp = (state) => {
  return {
    userData: state.user.userData,
    token: state.user.token,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    userLogout: () => {
      dispatch({ type: "USER_LOGOUT" });
    },
  };
};

export default connect(mapStateToProp, mapDispatchToProps)(NavBar);

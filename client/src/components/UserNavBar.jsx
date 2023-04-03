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

            <Nav>
              <Nav.Link as={NavLink} end to={"/schedule"}>
                Xem lịch thực hành
              </Nav.Link>

              <Nav.Link as={NavLink} end to={"/report"}>
                Báo cáo sự cố
              </Nav.Link>

              <Nav.Link as={NavLink} end to={"/group-register"}>
                Đăng kí nhóm
              </Nav.Link>

              <Nav.Link as={NavLink} end to={"/your-group"}>
                Nhóm của bạn
              </Nav.Link>
            </Nav>
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

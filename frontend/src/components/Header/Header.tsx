import React from "react";
import { useSelector, useDispatch } from "react-redux";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import { selectCurrentUser } from "../../features/auth/authSlice";
import { logoutUser } from "../../features/auth/authSlice";
import { useNavigate } from "react-router-dom";

function Header() {
  const user = useSelector(selectCurrentUser);
  const dispatch = useDispatch<any>();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      dispatch(logoutUser());
      navigate("/");
    } catch (error) {
      console.error("Logout failed", error);
    }
  };

  return (
    <Navbar expand="lg" fixed="top" bg="primary" data-bs-theme="dark">
      <Container>
        <Navbar.Brand href="/">Travelers</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="/user">Users</Nav.Link>
            {user && <Nav.Link href="/post">New Post +</Nav.Link>}
          </Nav>
          {!user ?
            <Nav>
              <Nav.Link href="/login">Login</Nav.Link>
            </Nav>
            :
            <Nav>
              <NavDropdown title="Profile" id="basic-nav-dropdown">
                <NavDropdown.Item href={`/user/${user.id}`}>Settings</NavDropdown.Item>
                <NavDropdown.Item href="/countries/:id">
                My Countries
                </NavDropdown.Item>
                <NavDropdown.Item href={`/user/posts/${user.id}`}>My Posts</NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item onClick={handleLogout}>
                Logout
                </NavDropdown.Item>
              </NavDropdown>
            </Nav>}
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Header;
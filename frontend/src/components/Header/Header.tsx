import React from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";

function Header(props: any) {
  return (
    <Navbar expand="lg" fixed="top" bg="primary" data-bs-theme="dark">
      <Container>
        <Navbar.Brand href="/">Travelers</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="/">Home</Nav.Link>
            <Nav.Link href="#link">Link</Nav.Link>
          </Nav>
          <Nav>
            <NavDropdown title="Profile" id="basic-nav-dropdown">
              <NavDropdown.Item href="/settings/:id">Settings</NavDropdown.Item>
              <NavDropdown.Item href="/countries/:id">
                My Countries
              </NavDropdown.Item>
              <NavDropdown.Item href="/posts/:id">My Posts</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="api/user/logout">
                Logout
              </NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Header;
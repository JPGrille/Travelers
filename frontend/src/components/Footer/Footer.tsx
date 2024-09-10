import React from "react";
import { Container, Row, Col, ListGroup } from "react-bootstrap";
import { FaFacebookF, FaTwitter, FaLinkedinIn, FaInstagram } from "react-icons/fa";

function Footer() {
  return (
    <footer className="bg-primary text-white py-4">
      <Container>
        <Row className="text-center">
          {/* Social Icons */}
          <Col md={12} className="mb-3">
            <ListGroup horizontal className="justify-content-center">
              <ListGroup.Item className="bg-primary border-0 px-2">
                <a href="#" className="text-white fs-3 hover-icon"><FaFacebookF /></a>
              </ListGroup.Item>
              <ListGroup.Item className="bg-primary border-0 px-2">
                <a href="#" className="text-white fs-3 hover-icon"><FaTwitter /></a>
              </ListGroup.Item>
              <ListGroup.Item className="bg-primary border-0 px-2">
                <a href="#" className="text-white fs-3 hover-icon"><FaLinkedinIn /></a>
              </ListGroup.Item>
              <ListGroup.Item className="bg-primary border-0 px-2">
                <a href="#" className="text-white fs-3 hover-icon"><FaInstagram /></a>
              </ListGroup.Item>
            </ListGroup>
          </Col>

          {/* Menu Links */}
          <Col md={12} className="mb-3">
            <ListGroup horizontal className="justify-content-center">
              <ListGroup.Item className="bg-primary border-0 px-3">
                <a href="/about" className="text-white text-decoration-none hover-link">About</a>
              </ListGroup.Item>
              <ListGroup.Item className="bg-primary border-0 px-3">
                <a href="/team" className="text-white text-decoration-none hover-link">Team</a>
              </ListGroup.Item>
            </ListGroup>
          </Col>

          {/* Copyright */}
          <Col md={12}>
            <p className="mb-0">© 2024 Juan Pedro Grille.</p>
          </Col>
        </Row>
      </Container>
    </footer>
  );
}

export default Footer;

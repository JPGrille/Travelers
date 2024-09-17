import React from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import "./NotFound.css";

const NotFound = () => {
  return (
    <Container className="text-center not-found-page" fluid>
      <Row className="d-flex justify-content-center align-items-center vh-100">
        <Col xs={12} md={6}>
          <h1 className="display-1">404</h1>
          <h2 className="mb-4">Oops! Page Not Found</h2>
          <p className="mb-4">
            The page you’re looking for doesn’t exist. It might have been moved or deleted.
          </p>
          <Link to="/">
            <Button variant="primary" size="lg">Go Home</Button>
          </Link>
        </Col>
      </Row>
    </Container>
  );
};

export default NotFound;

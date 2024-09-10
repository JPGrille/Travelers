import React from "react";
import { Container, Row, Col, Card } from "react-bootstrap";

function About() {
  return (
    <Container className="my-5">
      <Row className="text-center">
        <Col md={12} className="mb-4">
          <h1>About Us</h1>
          <p className="lead">
            Our mission is to provide high-quality solutions and services that exceed customer expectations. We are dedicated to innovation, excellence, and integrity in everything we do.
          </p>
        </Col>
        <Col md={12}>
          <Card className="text-center">
            <Card.Body>
              <Card.Title>Our Mission</Card.Title>
              <Card.Text>
                We aim to make a positive impact in the industry by delivering outstanding products and services. Our team works tirelessly to ensure that we remain at the forefront of technology and customer satisfaction.
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

export default About;

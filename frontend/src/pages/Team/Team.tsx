import React from "react";
import { Container, Row, Col, Card } from "react-bootstrap";
import { FaLinkedin, FaTwitter } from "react-icons/fa";

function Team() {
  const teamMembers = [
    {
      name: "Juan Pedro Grille",
      role: "Co-Founder",
      imgSrc: "/images/profile-picture-placeholder.jpg",
      linkedin: "https://www.linkedin.com/in/juanpedrogrille",
      twitter: "https://twitter.com/juanpedrogrille",
    },
    {
      name: "Jane Doe",
      role: "Co-Founder",
      imgSrc: "/images/profile-picture-placeholder.jpg",
      linkedin: "https://www.linkedin.com/in/janedoe",
      twitter: "https://twitter.com/janedoe",
    },
    // Add more team members here
  ];

  return (
    <Container className="my-5">
      <Row>
        <Col md={12} className="text-center mb-4">
          <h1>Meet Our Team</h1>
        </Col>
        {teamMembers.map((member, index) => (
          <Col md={6} key={index} className="mb-4">
            <Card className="text-center">
              <Card.Img variant="top" src={member.imgSrc} alt={member.name} />
              <Card.Body>
                <Card.Title>{member.name}</Card.Title>
                <Card.Subtitle className="mb-2 text-muted">{member.role}</Card.Subtitle>
                <Card.Text>
                  <a href={member.linkedin} className="text-primary me-2" target="_blank" rel="noopener noreferrer">
                    <FaLinkedin />
                  </a>
                  <a href={member.twitter} className="text-info" target="_blank" rel="noopener noreferrer">
                    <FaTwitter />
                  </a>
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
}

export default Team;

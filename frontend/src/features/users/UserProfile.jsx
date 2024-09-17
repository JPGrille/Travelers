import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { Container, Row, Col, Card, ListGroup, Image } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { selectPostsByUser } from "../posts/postsSlice";
import { selectUserById } from "./usersSlice";
import "./UserProfile.css";
import VisitedCountries from "../countries/VisitedCountries";

const UserProfile = () => {
  const { userId } = useParams();
  const dispatch = useDispatch();

  // Fetch user data, posts, and visited countries
  const user = useSelector((state) => selectUserById(state, Number(userId)));
  const posts = useSelector((state) => selectPostsByUser(state, Number(userId)));

  if (!user) return <div>Loading...</div>;

  return (
    <Container className="user-profile-page mt-4">
      <Row className="align-items-center">
        <Col xs={12} md={4} className="text-center">
          <Image
            src={"https://via.placeholder.com/200"}
            roundedCircle
            className="profile-picture mb-3"
            alt={user.id.toString()}
          />
          <h2>{user.name}</h2>
        </Col>

        <Col xs={12} md={8}>
          <VisitedCountries />
        </Col>
      </Row>
      <Row>
        <Col>
          <Card className="mb-4">
            <Card.Header>User Posts</Card.Header>
            <Card.Body>
              {posts && posts.length > 0 ? (
                <ListGroup variant="flush">
                  {posts.map((post) => (
                    <ListGroup.Item key={post.id} action href={`/post/${post.id}`}>{post.title}</ListGroup.Item>
                  ))}
                </ListGroup>
              ) : (
                <p>No posts available.</p>
              )}
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default UserProfile;

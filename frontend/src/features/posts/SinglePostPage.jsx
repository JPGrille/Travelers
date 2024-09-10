import React from "react";
import { useSelector } from "react-redux";
import { selectPostById } from "./postsSlice";
import PostAuthor from "./PostAuthor";
import TimeAgo from "./TimeAgo";
import ReactionButtons from "./ReactionButtons";
import { useParams, Link } from "react-router-dom";
import { Container, Card, Button, Alert } from "react-bootstrap";

const SinglePostPage = () => {
  const { postId } = useParams();
  const post = useSelector((state) => selectPostById(state, Number(postId)));

  if (!post) {
    return (
      <Container className="mt-4">
        <Alert variant="danger">Post not found!</Alert>
      </Container>
    );
  }

  return (
    <Container className="mt-4">
      <Card className="shadow-sm">
        {post.img && (
          <Card.Img
            variant="top"
            src={post.img}
            alt="Post Image"
            className="card-img-top img-fluid"
            style={{ objectFit: "contain", maxHeight: "500px", width: "100%" }}
          />
        )}
        <Card.Body>
          <Card.Title>{post.title}</Card.Title>
          <Card.Text>{post.summary}</Card.Text>
          <div className="d-flex justify-content-between align-items-center mb-3">
            <Link to={`/post/edit/${post.id}`}>
              <Button variant="outline-secondary">Edit Post</Button>
            </Link>
            <PostAuthor userId={post.created_by} />
            <TimeAgo timestamp={post.date} />
          </div>
          <ReactionButtons post={post} />
        </Card.Body>
      </Card>
    </Container>
  );
};

export default SinglePostPage;

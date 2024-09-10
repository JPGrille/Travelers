import React from "react";
import { useSelector } from "react-redux";
import { selectPostIds, getPostsStatus, getPostsError } from "./postsSlice";
import PostsExcerpt from "./PostsExcerpt";
import { Container, Row, Col, Spinner, Alert } from "react-bootstrap";

const PostsList = () => {
  const orderedPostIds = useSelector(selectPostIds);
  const postStatus = useSelector(getPostsStatus);
  const error = useSelector(getPostsError);

  let content;

  if (postStatus === "loading") {
    content = (
      <div className="d-flex justify-content-center">
        <Spinner animation="border" variant="primary" />
      </div>
    );
  } else if (postStatus === "succeeded") {
    content = (
      <Row xs={1} sm={2} md={3} lg={4} className="g-4">
        {orderedPostIds.map((postId) => (
          <Col key={postId}>
            <PostsExcerpt postId={postId} />
          </Col>
        ))}
      </Row>
    );
  } else if (postStatus === "failed") {
    content = <Alert variant="danger">{error}</Alert>;
  }

  return (
    <Container className="mt-4">
      {content}
    </Container>
  );
};

export default PostsList;

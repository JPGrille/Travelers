import React from "react";
import PostAuthor from "./PostAuthor";
import TimeAgo from "./TimeAgo";
import ReactionButtons from "./ReactionButtons";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectPostById } from "./postsSlice";
import { Card, Button } from "react-bootstrap";

const PostsExcerpt = ({ postId }) => {
  const post = useSelector((state) => selectPostById(state, postId));

  return (
    <Card className="mb-4 shadow-sm">
      <Card.Img
        variant="top"
        src={post.img || "https://via.placeholder.com/150"}
        alt="Post image"
        className="card-img-top"
      />
      <Card.Body>
        <Card.Title>{post.title}</Card.Title>
        <Card.Text>{post.summary.substring(0, 75)}...</Card.Text>
        <div className="d-flex justify-content-between align-items-center mb-3">
          <Link to={`post/${post.id}`}>
            <Button variant="outline-primary">View Post</Button>
          </Link>
          <PostAuthor userId={post.created_by} />
          <TimeAgo timestamp={post.date} />
        </div>
        <ReactionButtons post={post} />
      </Card.Body>
    </Card>
  );
};

export default PostsExcerpt;

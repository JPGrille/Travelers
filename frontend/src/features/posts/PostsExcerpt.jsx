import React from "react";
import PostAuthor from "./PostAuthor";
import TimeAgo from "./TimeAgo";
import ReactionButtons from "./ReactionButtons";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectPostById } from "./postsSlice";

const PostsExcerpt = ({ postId }) => {
  const post = useSelector(state => selectPostById(state, postId));

  return (
    <article className="post-card">
      <h2 className="post-title">{post.title}</h2>
      <div className="post-img"><img src={post.img} className="card-img-top" alt=" " /></div>
      <p className="excerpt">{post.summary.substring(0, 75)}...</p>
      <p className="postCredit">
        <Link to={`post/${post.id}`}>View Post</Link>
        <PostAuthor userId={post.created_by} />
        <TimeAgo timestamp={post.date} />
      </p>
      <ReactionButtons post={post} />
    </article>
  );
};

export default PostsExcerpt;
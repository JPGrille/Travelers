import React, { useEffect, useId } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchPosts, selectAllPosts, getPostsStatus, getPostsError } from "./postsSlice";
import PostsExcerpt from "./PostsExcerpt";

const PostsList = () => {
  const dispatch = useDispatch();
  const posts = useSelector(selectAllPosts);
  const postsStatus = useSelector(getPostsStatus);
  const error = useSelector(getPostsError);

  useEffect(() => {
    if (postsStatus === "idle") {
      dispatch(fetchPosts());
    }
  }, [postsStatus, dispatch]);

  let content;
  if (postsStatus === "loading") {
    content = <p>Loading...</p>;
  } else if (postsStatus === "succeeded") {
    content = posts.map((post, index) => <PostsExcerpt key={index} post={post} />);
  } else if (postsStatus === "failed") {
    content = <p>{error}</p>;
  }

  return (
    <section className="posts-container">
      {content}
    </section>
  );
};

export default PostsList;
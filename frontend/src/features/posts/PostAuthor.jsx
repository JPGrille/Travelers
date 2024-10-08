import React from "react";
import { useSelector } from "react-redux";
import { selectUserById } from "../users/usersSlice";

const PostAuthor = ({ userId }) => {
  const author = useSelector((state) => selectUserById(state, Number(userId)));

  return <span>by {author ? author.name : "Unknown author"}</span>;
};
export default PostAuthor;
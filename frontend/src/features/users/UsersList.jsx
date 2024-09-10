import React from "react";
import { useSelector } from "react-redux";
import { selectAllUsers } from "./usersSlice";
import ListGroup from "react-bootstrap/ListGroup";

const UsersList = () => {
  const users = useSelector(selectAllUsers);

  const renderedUsers = users.map(user => (
    <ListGroup.Item key={user.id} action href={`/user/${user.id}`}>
      {user.name}
    </ListGroup.Item>
  ));

  return (
    <section>
      <h2>Users</h2>
      <ListGroup>{renderedUsers}</ListGroup>
    </section>
  );
};

export default UsersList;
import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { selectUserById } from "../users/usersSlice";
import { selectPostsByUser } from "../posts/postsSlice";
import { useParams } from "react-router-dom";
import { Form, Container, Row, Col, Button, Card, ListGroup } from "react-bootstrap";

const UserPage = () => {
  const { userId } = useParams();
  const user = useSelector(state => selectUserById(state, Number(userId)));
  const dispatch = useDispatch();

  const postsForUser = useSelector(state => selectPostsByUser(state, Number(userId)));

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    profilePicture: null
  });

  useEffect(() => {
    if (user) {
      setFormData({
        name: user.name,
        email: user.email,
        password: "",
        profilePicture: null
      });
    }
  }, [user]);

  // Handle input changes
  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: files ? files[0] : value
    }));
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    const updatedData = new FormData();

    // Append form data
    updatedData.append("name", formData.name);
    updatedData.append("email", formData.email);
    if (formData.password) updatedData.append("password", formData.password); // Only append password if it's provided
    if (formData.profilePicture) updatedData.append("profilePicture", formData.profilePicture);

    try {
      // Make a request to the backend to update the user
      //const response = await axios.put(`/api/user/${user.id}`, updatedData, { withCredentials: true });
      //dispatch(updateUser(response.data.user)); // Dispatch the Redux action to update the user in the store
      alert("Profile updated successfully");
    } catch (error) {
      console.error("Error updating profile", error);
      alert("Failed to update profile");
    }
  };

  return (
    <Container>
      <Row className="justify-content-md-center">
        <Col md={6}>
          <h2>Profile</h2>
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="formName" className="mb-3">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
              />
            </Form.Group>

            <Form.Group controlId="formEmail" className="mb-3">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
              />
            </Form.Group>

            <Form.Group controlId="formPassword" className="mb-3">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                name="password"
                placeholder="Leave blank to keep unchanged"
                onChange={handleChange}
              />
            </Form.Group>

            <Form.Group controlId="formProfilePicture" className="mb-3">
              <Form.Label>Profile Picture</Form.Label>
              <Form.Control
                type="file"
                name="profilePicture"
                onChange={handleChange}
              />
            </Form.Group>

            <Button variant="primary" type="submit">
              Update Profile
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default UserPage;
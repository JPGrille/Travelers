import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { selectUserById, updateUser } from "../users/usersSlice";
import { selectPostsByUser } from "../posts/postsSlice";
import { useParams } from "react-router-dom";
import { Form, Container, Row, Col, Button, Modal } from "react-bootstrap"; // Added Modal

const UserPage = () => {
  const { userId } = useParams();
  const user = useSelector((state) => selectUserById(state, Number(userId)));
  const dispatch = useDispatch();

  // const postsForUser = useSelector(state => selectPostsByUser(state, Number(userId)));

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    profilePicture: null,
  });
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // States for Modal
  const [showModal, setShowModal] = useState(false);
  const [modalMessage, setModalMessage] = useState("");
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    if (user) {
      setFormData({
        name: user.name,
        email: user.email,
        password: "",
        profilePicture: null,
      });
      setName(user.name);
      setEmail(user.email);
      setPassword("");
    }
  }, [user]);

  // Handle input changes
  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: files ? files[0] : value,
    }));
  };

  // Handlers for form inputs
  const onNameChanged = (e) => setName(e.target.value);
  const onEmailChanged = (e) => setEmail(e.target.value);
  const onPasswrodChanged = (e) => setPassword(e.target.value);

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    // const updatedData = new FormData();
    // updatedData.append("name", name);
    // updatedData.append("email", email);
    // if (password) updatedData.append("password", password);
    // if (profilePicture) updatedData.append("profilePicture", formData.profilePicture);

    try {
      // const response = await axios.put(`/api/user/${user.id}, updatedData, { withCredentials: true });
      dispatch(updateUser({ userId, name, email, password: password || null }))
        .unwrap()
        .then(() => {
          setModalMessage("Profile updated successfully");
          setIsError(false);
          setShowModal(true);
          setPassword("");
        });
    } catch (error) {
      console.error("Error updating profile", error);
      setModalMessage("Failed to update profile");
      setIsError(true);
      setShowModal(true);
    }
  };

  const handleCloseModal = () => setShowModal(false);

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
                value={name}
                onChange={onNameChanged}
              />
            </Form.Group>

            <Form.Group controlId="formEmail" className="mb-3">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                name="email"
                value={email}
                onChange={onEmailChanged}
              />
            </Form.Group>

            <Form.Group controlId="formPassword" className="mb-3">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                name="password"
                placeholder="Leave blank to keep unchanged"
                onChange={onPasswrodChanged}
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

      {/* Modal for success/failure messages */}
      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>{isError ? "Error" : "Success"}</Modal.Title>
        </Modal.Header>
        <Modal.Body>{modalMessage}</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default UserPage;

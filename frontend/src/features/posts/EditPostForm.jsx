import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import { Form, Button, Container, Row, Col, Alert, Modal } from "react-bootstrap";
import { selectPostById, updatePost, deletePost } from "./postsSlice";
import { selectCurrentUser } from "../../features/auth/authSlice";

const EditPostForm = () => {
  const { postId } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const post = useSelector((state) => selectPostById(state, Number(postId)));
  const user = useSelector(selectCurrentUser);

  // State for managing form inputs and modals
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [url, setUrl] = useState("");
  //const [image, setImage] = useState(null);
  const [updateRequestStatus, setUpdateRequestStatus] = useState("idle");
  const [showModal, setShowModal] = useState(false);
  const [modalMessage, setModalMessage] = useState("");
  const [modalVariant, setModalVariant] = useState("success");

  // Set initial values for form fields if post is loaded
  useEffect(() => {
    if (post && user) {
      setTitle(post.title);
      setContent(post.summary);
      setUrl(post.img);
    }
  }, [post, user]);

  // Handlers for form inputs
  const onTitleChanged = (e) => setTitle(e.target.value);
  const onContentChanged = (e) => setContent(e.target.value);
  const onUrlChanged = (e) => setUrl(e.target.value);
  //const onImageChanged = (e) => setImage(e.target.files[0]);

  // Determine if form can be submitted
  const canSave = [title, content].every(Boolean) && updateRequestStatus === "idle";

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const onSavePostClicked = () => {
    if (canSave) {
      try {
        setUpdateRequestStatus("pending");

        /* TODO: Handle image upload
        const formData = new FormData();
        formData.append("title", title);
        formData.append("body", content);
        if (image) formData.append("image", image);
        dispatch(updatePost({ id: post.id, formData })).unwrap();
        */
        
        dispatch(updatePost({ id: post.id, title, summary: content, img: url || null})).unwrap();

        setModalMessage("Post updated successfully!");
        setModalVariant("success");
        setShowModal(true);
      } catch (err) {
        console.error("Failed to update the post: ", err);
        setModalMessage("Failed to update the post. Please try again.");
        setModalVariant("danger");
        setShowModal(true);
      } finally {
        setUpdateRequestStatus("idle");
      }
    }
  };

  const onDeletePostClicked = () => {
    try {
      setUpdateRequestStatus("pending");
      dispatch(deletePost({ id: post.id })).unwrap();

      navigate("/");
    } catch (err) {
      console.error("Failed to delete the post: ", err);
      setModalMessage("Failed to delete the post. Please try again.");
      setModalVariant("danger");
      setShowModal(true);
    } finally {
      setUpdateRequestStatus("idle");
    }
  };

  // Ensure only the owner can edit/delete the post
  if (user?.id !== post.created_by) {
    return (
      <Container className="mt-4">
        <Alert variant="danger">You are not authorized to edit this post.</Alert>
      </Container>
    );
  }

  return (
    <Container className="mt-4">
      <h2>Edit Post</h2>
      <Form>
        {/* Post Title */}
        <Form.Group className="mb-3" controlId="postTitle">
          <Form.Label>Post Title</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter title"
            value={title}
            onChange={onTitleChanged}
          />
        </Form.Group>

        {/* Post Content */}
        <Form.Group className="mb-3" controlId="postContent">
          <Form.Label>Content</Form.Label>
          <Form.Control
            as="textarea"
            rows={5}
            value={content}
            onChange={onContentChanged}
          />
        </Form.Group>

        {/* Image Upload */}
        <Form.Group className="mb-3" controlId="postImage">
          <Form.Label>Upload Image</Form.Label>
          {/*<Form.Control type="file" onChange={onImageChanged} /> TODO: Add image upload logic to AWS S3 or another cloud solution */}
          <Form.Control
            type="text"
            placeholder="Enter image url"
            value={url}
            onChange={onUrlChanged}
          />
        </Form.Group>

        {/* Action Buttons */}
        <Row className="mt-4">
          <Col>
            <Button
              variant="primary"
              type="button"
              onClick={onSavePostClicked}
              disabled={!canSave}
            >
              Save Post
            </Button>{" "}
            <Button variant="danger" type="button" onClick={onDeletePostClicked}>
              Delete Post
            </Button>
          </Col>
        </Row>
      </Form>

      {/* Modal for Success/Error Messages */}
      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>{modalVariant === "success" ? "Success" : "Error"}</Modal.Title>
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

export default EditPostForm;

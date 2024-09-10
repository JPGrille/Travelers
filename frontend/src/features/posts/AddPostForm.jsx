import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Form, Button, Container, Modal } from "react-bootstrap";
import { addNewPost } from "./postsSlice";
import { selectCurrentUser } from "../../features/auth/authSlice";
import { useNavigate } from "react-router-dom";

const AddPostForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Form state management
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [url, setUrl] = useState("");
  const [addRequestStatus, setAddRequestStatus] = useState("idle");
  //const [image, setImage] = useState(null);

  // Modal state management
  const [showModal, setShowModal] = useState(false);
  const [modalMessage, setModalMessage] = useState("");
  const [isError, setIsError] = useState(false);

  const user = useSelector(selectCurrentUser);

  const onTitleChanged = (e) => setTitle(e.target.value);
  const onContentChanged = (e) => setContent(e.target.value);
  const onUrlChanged = (e) => setUrl(e.target.value);
  //const onImageChanged = (e) => setImage(e.target.files[0]);

  let canSave = [title, content,  user && user.id].every(Boolean) && addRequestStatus === "idle";

  const onSavePostClicked = () => {
    if (canSave) {
      try {
        setAddRequestStatus("pending");

        /* TODO: Handle image upload
        const formData = new FormData();
        formData.append("title", title);
        formData.append("body", content);
        formData.append("image", image);
        dispatch(addNewPost(formData)).unwrap();
        */

        dispatch(addNewPost({ authorId: user.id, title, content, img: url || null })).unwrap();

        setTitle("");
        setContent("");
        setUrl("");

        setModalMessage("Post saved successfully!");
        setIsError(false);
        setShowModal(true);
      } catch (err) {
        console.log("Failed to save the post", err);

        setModalMessage("Failed to save the post. Please try again.");
        setIsError(true);
        setShowModal(true);
      } finally {
        setAddRequestStatus("idle");
      }
    }
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  return (
    <Container className="mt-4">
      <h2>Add a New Post</h2>
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

        {/* Save Button */}
        <Button
          variant="primary"
          type="button"
          onClick={onSavePostClicked}
          disabled={!canSave}
        >
          Save Post
        </Button>
      </Form>

      {/* Success/Error Modal */}
      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>{isError ? "Error" : "Success"}</Modal.Title>
        </Modal.Header>
        <Modal.Body>{modalMessage}</Modal.Body>
        <Modal.Footer>
          <Button variant={isError ? "danger" : "success"} onClick={handleCloseModal}>
            {isError ? "Try Again" : "OK"}
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};
export default AddPostForm;
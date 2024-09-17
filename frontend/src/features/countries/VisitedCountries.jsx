import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Container, Row, Form, Button, Modal } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { addNewCountry, fetchCountries, selectAllCountries } from "./countriesSlice";
import WorldMap from "./WorldMap";

function VisitedCountries(props) {
  const { userId } = useParams();
  const dispatch = useDispatch();
  const [countryName, setCountryName] = useState("");

  // Modal state management
  const [showModal, setShowModal] = useState(false);
  const [modalMessage, setModalMessage] = useState("");
  const [modalVariant, setModalVariant] = useState("success");

  // Close modal function
  const handleCloseModal = () => setShowModal(false);

  // Fetch visited Countries
  useEffect(() => {
    dispatch(fetchCountries(userId)).unwrap();
  }, [userId]);

  const visitedCountries = useSelector(selectAllCountries);

  useEffect(() => {
    if (visitedCountries.length > 0) {
      visitedCountries.forEach((row) => {
        setVisitedCountry(row["country_code"]);
      });
    }
  }, [visitedCountries]);

  function setVisitedCountry(countryCode) {
    const element = document.getElementById(countryCode);
    if (element) {
      element.style.fill = "#0D6EFD";
    }
  }

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      // Dispatch action to add a new country
      const result = await dispatch(addNewCountry({ userId, input: countryName })).unwrap();
      setVisitedCountry(result.countryCode);
      setCountryName("");
      // Show success message
      setModalMessage("Country added successfully!");
      setModalVariant("success");
      setShowModal(true);
    } catch (error) {
      // Show error message
      setModalMessage("Failed to add country. Please try again.");
      setModalVariant("danger");
      setShowModal(true);
    }
  }

  const onCountryChanged = (e) => setCountryName(e.target.value);

  return (
    <Container>
      {props.showForm &&
        <Row>
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="formName" className="mb-3">
              <Form.Control
                type="text"
                placeholder="Enter country name"
                name="countryName"
                value={countryName}
                onChange={onCountryChanged}
              />
            </Form.Group>

            <Button variant="primary" type="submit">
            Add New
            </Button>
          </Form>
        </Row>
      }
      <Row>
        <WorldMap />
      </Row>

      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>{modalVariant === "success" ? "Success" : "Error"}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p className={modalVariant === "success" ? "text-success" : "text-danger"}>
            {modalMessage}
          </p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
}

export default VisitedCountries;

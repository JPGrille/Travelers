import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Container, Row } from "react-bootstrap";
import WorldMap from "./WorldMap";
import { Form, Button } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { addNewCountry, fetchCountries, selectAllCountries } from "./countriesSlice";

function VisitedCountries() {
  const { userId } = useParams();
  const dispatch = useDispatch();
  const [countryName, setCountryName] = useState("");

  // Fetch visited Countries
  useEffect(() => {
    dispatch(fetchCountries(userId)).unwrap();
  }, []);
  const visitedCountries = useSelector(selectAllCountries);

  useEffect(() => {
    if (visitedCountries.length > 0) {
      visitedCountries.forEach((row) => {
        const element = document.getElementById(row["country_code"]);
        if (element) {
          element.style.fill = "#0D6EFD";
        }
      });
    }
  }, [visitedCountries]);

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      dispatch(addNewCountry({ userId, input: countryName })).unwrap();
    } catch (error) {
      console.log(error);
    }
  }

  const onCountryChanged = (e) => setCountryName(e.target.value);

  return (
    <Container>
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
      <Row>
        <WorldMap />
      </Row>
    </Container>
  );
}

export default VisitedCountries;

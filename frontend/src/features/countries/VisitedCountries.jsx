import React, { useEffect, useState } from "react";
import { Container, Row } from "react-bootstrap";
import WorldMap from "./WorldMap";
import axios from "axios";
import { Form, Button } from "react-bootstrap";

function VisitedCountries() {
  const [countries, setCountries] = useState([]);
  const [countryName, setCountryName] = useState("");

  useEffect(() => {
    fetchVisitedCountries();
  }, []);

  async function fetchVisitedCountries() {
    try {
      const result = await axios.get("http://localhost:4000/api/countries/3");
      console.log(result);

      if (result && result.data) {
        setCountries(result.data);
      }
    } catch (error) {
      console.error("Error fetching countries:", error);
    }
  }

  useEffect(() => {
    if (countries.length > 0) {
      countries.forEach((row) => {
        const element = document.getElementById(row["country_code"]);
        if (element) {
          element.style.fill = "#0D6EFD";
        }
      });
    }
  }, [countries]);

  async function handleSubmit() {
    try {
      //const result = await axios.get("http://localhost:4000/api/countries/newCountry");
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

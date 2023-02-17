import React from "react";
import { Col, Form } from "react-bootstrap";

export default function SearchBar() {
  return (
    <>

      <Form.Group>
        <Form.Control className="search" type="text" placeholder="Search" name="search" />
      </Form.Group>
    </>
  );
}

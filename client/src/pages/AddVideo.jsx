import React from "react";
import SideBar from "../components/SideBar";
import { Col, Container, Form, Row, Button } from "react-bootstrap";
import Navbars from "../components/Navbars";

export default function AddVideo() {
  return (
    <>
      <Navbars />
      <Container className=" position-absolute top-50 start-50 translate-middle">
        <Form className="d-flex gap-4 flex-column">
          <h1 className="text-white fw-bold">Add Video</h1>
          <Form.Group className="d-flex gap-5">
            <Form.Control className="w-75" type="text" placeholder="Title" />
            <Form.Control className="w-25" type="file" placeholder="Attach Thumbnail" />
          </Form.Group>
          <Form.Group>
            <Form.Control as="textarea" rows={5} placeholder="Description" />
          </Form.Group>
          <Form.Group>
            <Form.Control className="w-25" type="file" placeholder="Attach Thumbnail" />
          </Form.Group>
          <Button className="btn-bg py-2 fw-semibold fs-4">Add</Button>
        </Form>
      </Container>
    </>
  );
}

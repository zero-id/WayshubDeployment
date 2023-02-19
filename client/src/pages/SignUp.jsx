import React, { useState } from "react";
import { Container, Row, Col, Button, Form } from "react-bootstrap";
import WaysHub from "../assets/images/WayshubAuth.png";
import "bootstrap/dist/css/bootstrap.min.css";
import { useNavigate } from "react-router";
import { API } from "../config/api";

export default function SignUp() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    email: "",
    password: "",
    channelName: "",
    description: "",
  });

  const { email, password, channelName, description } = form;

  const handleChance = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();

      const response = await API.post("/register", form);

      console.log("register success : ", response);
      alert("succsesfully sign-up!");
      setForm({
        email: "",
        password: "",
        channelName: "",
        description: "",
      });
    } catch (error) {
      alert("Failed Sign-Up");
    }
  };
  return (
    <Container className="position-absolute top-50 start-50 translate-middle">
      <Row className="p-5">
        <Col className="d-flex flex-column" sm="6">
          <img className="p-0 m-0 w-100" src={WaysHub} alt="WayHub" />
          <p className="text-white fs-2 p-0 m-0 pb-4">Join now, share your creations with another people and enjoy other creations</p>
          <Button
            onClick={(e) => {
              navigate("/sign-in");
            }}
            className="w-25 btn-bg"
          >
            Sign In
          </Button>
        </Col>
        <Col className="align-items-center d-flex">
          <Form onSubmit={handleSubmit} className="w-75 p-5 m-auto bg-form rounded-4 d-flex flex-column gap-3">
            <Form.Label className="text-white fs-1 fw-bold p-0 m-0">Sign Up</Form.Label>
            <Form.Control name="email" onChange={handleChance} value={email} type="email" placeholder="email" />
            <Form.Control name="password" onChange={handleChance} value={password} type="password" placeholder="password" />
            <Form.Control name="channelName" onChange={handleChance} value={channelName} type="text" placeholder="Nama Channel" />
            <Form.Control name="description" onChange={handleChance} value={description} as="textarea" rows={4} placeholder="Description Channel" />
            <Button type="submit" className="mt-2 w-100 btn-bg py-2">
              Sign Up
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
}

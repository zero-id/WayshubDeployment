import React, { useContext, useState } from "react";
import { Container, Row, Col, Button, Form } from "react-bootstrap";
import WaysHub from "../assets/images/WayshubAuth.png";
import "bootstrap/dist/css/bootstrap.min.css";
import { useNavigate } from "react-router";
import { API, setAuthToken } from "../config/api";
import { UserContext } from "../context/UserContext";

export default function SignIn() {
  const navigate = useNavigate();

  const [state, dispatch] = useContext(UserContext);

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const { email, password } = form;

  const handleChance = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();

      const response = await API.post("/login", form);

      console.log("Success Sign In:", response);

      dispatch({
        type: "LOGIN_SUCCESS",
        payload: response.data.data,
      });

      setAuthToken(localStorage.token);
      alert("succsesfully sign-in!");
      navigate("/");
    } catch (error) {
      alert("Failed Sign In!");
    }
  };
  return (
    <Container className="position-absolute top-50 start-50 translate-middle">
      <Row className="p-5">
        <Col className="d-flex flex-column" sm="6">
          <img className="p-0 m-0 w-100" src={WaysHub} alt="WayHub" />
          <p className="text-white fs-2 p-0 m-0 pb-4">Join now, share your creations with another people and enjoy other creations</p>
          <Button
            onClick={() => {
              navigate("/sign-up");
            }}
            className="w-25 btn-bg"
          >
            Sign Up
          </Button>
        </Col>
        <Col className="align-items-center d-flex">
          <Form onSubmit={handleSubmit} className="w-75 p-5 m-auto bg-form rounded-4 d-flex flex-column gap-3">
            <Form.Label className="text-white fs-1 fw-bold p-0 m-0">Sign In</Form.Label>
            <Form.Control name="email" onChange={handleChance} type="email" placeholder="email" />
            <Form.Control name="password" onChange={handleChance} type="password" placeholder="password" />
            <Button type="submit" className="mt-2 w-100 btn-bg py-2">
              Sign In
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
}

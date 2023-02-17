import React from "react";
import Navbars from "../components/Navbars";
import { Container, Button } from "react-bootstrap";
import Cover from "../assets/images/Cover.png";
import Fp from "../assets/images/fp.jpg";
import Line from "../assets/images/Line.png";
import Card from "react-bootstrap/Card";

export default function ContentCreator() {
  return (
    <>
      <Navbars />
      <Container className="margin-top-content" fluid>
        <img width="100%" src={Cover} alt="" />
        <Container className="mt-4">
          <div className="d-flex justify-content-between align-items-center mb-3">
            <div className="d-flex gap-3 align-items-center">
              <img width={100} src={Fp} alt="" />
              <div className="d-flex  flex-column">
                <p className="text-white p-0 m-0">Zero</p>
                <p className="text-white p-0 m-0">Zero</p>
              </div>
            </div>
            <div>
              <Button className="btn-bg">Subscribe</Button>
            </div>
          </div>
          <img width="100%" src={Line} alt="" />
          <div className="d-flex warp justify-content-center">
            <div className="d-flex flex-column mb-3 p-2" style={{ width: "320px", backgroundColor: "#0b0b0b" }}>
              <Card.Img className="width-video-my-channel" variant="top" src="holder.js/100px180" />
              <Card.Body>
                <Card.Title>Card Title</Card.Title>
                <Card.Text>Some quick example text to build on the card title and make up the bulk of the card's content.</Card.Text>
              </Card.Body>
            </div>
            <div className="d-flex flex-column mb-3 p-2" style={{ width: "320px", backgroundColor: "#0b0b0b" }}>
              <Card.Img className="width-video-my-channel" variant="top" src="holder.js/100px180" />
              <Card.Body>
                <Card.Title>Card Title</Card.Title>
                <Card.Text>Some quick example text to build on the card title and make up the bulk of the card's content.</Card.Text>
              </Card.Body>
            </div>
            <div className="d-flex flex-column mb-3 p-2" style={{ width: "320px", backgroundColor: "#0b0b0b" }}>
              <Card.Img className="width-video-my-channel" variant="top" src="holder.js/100px180" />
              <Card.Body>
                <Card.Title>Card Title</Card.Title>
                <Card.Text>Some quick example text to build on the card title and make up the bulk of the card's content.</Card.Text>
              </Card.Body>
            </div>
            <div className="d-flex flex-column mb-3 p-2" style={{ width: "330px", backgroundColor: "#0b0b0b" }}>
              <Card.Img className="width-video-my-channel" variant="top" src="holder.js/100px180" />
              <Card.Body>
                <Card.Title>Card Title</Card.Title>
                <Card.Text>Some quick example text to build on the card title and make up the bulk of the card's content.</Card.Text>
              </Card.Body>
            </div>
            <div className="d-flex flex-column mb-3 p-2" style={{ width: "330px", backgroundColor: "#0b0b0b" }}>
              <Card.Img className="width-video-my-channel" variant="top" src="holder.js/100px180" />
              <Card.Body>
                <Card.Title>Card Title</Card.Title>
                <Card.Text>Some quick example text to build on the card title and make up the bulk of the card's content.</Card.Text>
              </Card.Body>
            </div>
          </div>
        </Container>
      </Container>
    </>
  );
}

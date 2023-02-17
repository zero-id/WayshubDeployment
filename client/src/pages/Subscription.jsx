import React from "react";
import SideBar from "../components/SideBar";
import Navbars from "../components/Navbars";
import { Container, Col } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import { GrView } from "react-icons/gr";
import View from "../assets/images/view.png";
import Dur from "../assets/images/dur.png";

export default function Subscription() {
  return (
    <>
      <Navbars />
      <Container fluid className="margin-top-content d-flex warp justify-content-center">
        <div className="d-flex flex-column mb-2 p-2 rounded" style={{ width: "360px", backgroundColor: "#0b0b0b" }}>
          <Card.Body className="d-flex flex-column gap-2">
            <a href="/video-detail" className="text-decoration-none">
              <Card.Img className="width-video rounded mb-2" variant="top" src="holder.js/100px180" />
              <Card.Title className="text-white">Card Title</Card.Title>
            </a>
            <a href="/video-detail" className="text-decoration-none color-name-channel">
              <Card.Text className="m-0 p-0">Some quick example.</Card.Text>
              <div className="d-flex gap-5">
                <div className="d-flex gap-2">
                  <div>
                    <img width={15} src={View} alt="" />
                  </div>
                  <span>198k</span>
                </div>
                <div className="d-flex gap-2">
                  <div>
                    <img width={15} src={Dur} alt="" />
                  </div>
                  <span>19 Sep 2011</span>
                </div>
              </div>
            </a>
          </Card.Body>
        </div>
        <div className="d-flex flex-column mb-3 p-2" style={{ width: "360px", backgroundColor: "#0b0b0b" }}>
          <Card.Img className="width-video" variant="top" src="holder.js/100px180" />
          <Card.Body>
            <Card.Title>Card Title</Card.Title>
            <Card.Text>Some quick example text to build on the card title and make up the bulk of the card's content.</Card.Text>
          </Card.Body>
        </div>
        <div className="d-flex flex-column mb-3 p-2" style={{ width: "360px", backgroundColor: "#0b0b0b" }}>
          <Card.Img className="width-video" variant="top" src="holder.js/100px180" />
          <Card.Body>
            <Card.Title>Card Title</Card.Title>
            <Card.Text>Some quick example text to build on the card title and make up the bulk of the card's content.</Card.Text>
          </Card.Body>
        </div>
        <div className="d-flex flex-column mb-3 p-2" style={{ width: "360px", backgroundColor: "#0b0b0b" }}>
          <Card.Img className="width-video" variant="top" src="holder.js/100px180" />
          <Card.Body>
            <Card.Title>Card Title</Card.Title>
            <Card.Text>Some quick example text to build on the card title and make up the bulk of the card's content.</Card.Text>
          </Card.Body>
        </div>
        <div className="d-flex flex-column mb-3 p-2" style={{ width: "360px", backgroundColor: "#0b0b0b" }}>
          <Card.Img className="width-video" variant="top" src="holder.js/100px180" />
          <Card.Body>
            <Card.Title>Card Title</Card.Title>
            <Card.Text>Some quick example text to build on the card title and make up the bulk of the card's content.</Card.Text>
          </Card.Body>
        </div>
      </Container>
    </>
  );
}

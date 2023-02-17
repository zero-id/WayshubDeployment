import React from "react";
import { Container, Col, Card, Row } from "react-bootstrap";
import Detail from "../assets/images/Detail.png";
import Navbars from "../components/Navbars";
import View from "../assets/images/view.png";
import Dur from "../assets/images/dur.png";

export default function DetailVideo() {
  return (
    <>
      <Navbars />
      <Container className="p-0 margin-top-content">
        <Row className="d-flex flex-warp m-0 p-0">
          <Col sm="9" className="p-0 pe-5 m-0">
            <Card className="border-0 bg-body d-flex flex-column gap-2">
              <img className="p-0  m-0" width="100%" src={Detail} alt="" />
              <Card.Title className="bg-body text-white p-0 m-0">Lorem</Card.Title>
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
            </Card>
          </Col>
          <Col sm="3" className="d-flex flex-column justify-content-center align-items-center p-0 m-0">
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
            <div className="d-flex flex-column" style={{ width: "330px", backgroundColor: "#0b0b0b" }}>
              <Card.Img className="width-video-my-channel " variant="top" src="holder.js/100px180" />
              <Card.Body className="">
                <Card.Title className="">Card Title</Card.Title>
                <Card.Text className="">Some quick example text to build on the card title and make up the bulk of the card's content.</Card.Text>
              </Card.Body>
            </div>
            <div className="d-flex flex-column" style={{ width: "330px", backgroundColor: "#0b0b0b" }}>
              <Card.Img className="width-video-my-channel " variant="top" src="holder.js/100px180" />
              <Card.Body className="">
                <Card.Title className="">Card Title</Card.Title>
                <Card.Text className="">Some quick example text to build on the card title and make up the bulk of the card's content.</Card.Text>
              </Card.Body>
            </div>
            <div className="d-flex flex-column" style={{ width: "330px", backgroundColor: "#0b0b0b" }}>
              <Card.Img className="width-video-my-channel " variant="top" src="holder.js/100px180" />
              <Card.Body className="">
                <Card.Title className="">Card Title</Card.Title>
                <Card.Text className="">Some quick example text to build on the card title and make up the bulk of the card's content.</Card.Text>
              </Card.Body>
            </div>
          </Col>
        </Row>
      </Container>
    </>
  );
}

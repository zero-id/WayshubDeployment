import React from "react";
import Icon from "../assets/images/Icon.png";
import Home from "../assets/images/Home.png";
import Video from "../assets/images/video.png";
import { Col } from "react-bootstrap";

export default function SideBar() {
  return (
    <Col className="bg-side-bar height-side-bar ps-5 pt-5 d-flex flex-column gap-5" sm="2">
      <img className="w-75" src={Icon} alt="" />
      <div className="d-flex flex-column gap-4">
        <div className="d-flex align-items-center gap-3">
          <img src={Home} alt="" />
          <span className="color">Home</span>
        </div>
        <div className="d-flex align-items-center gap-3">
          <img src={Video} alt="" />
          <span className="text-white">Subscription</span>
        </div>
      </div>
      <span className="color fs-4 fw-bold">Chanel</span>
    </Col>
  );
}

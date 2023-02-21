import React, { useContext, useState } from "react";
import Button from "react-bootstrap/Button";
import Offcanvas from "react-bootstrap/Offcanvas";
import { Col, Dropdown, Form } from "react-bootstrap";
import toggle from "../assets/images/toggle.jpg";
import Icon from "../assets/images/Icon.png";
import Home from "../assets/images/Home-White.png";
import Video from "../assets/images/video.png";
import AddVideo from "../assets/images/AddVideo.png";
import DropDown from "./DropDown";
import { useNavigate, Link } from "react-router-dom";
import { UserContext } from "../context/UserContext";
import { useQuery } from "react-query";
import { API } from "../config/api";
import Fp from "../assets/images/fp.jpg";

function Navbars(props) {
  const navigate = useNavigate();
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const { data: getChannels } = useQuery("channelsCache", async () => {
    const response = await API.get(`/channels`);
    return response.data.data;
  });

  console.log(getChannels)

  // Mengambil id channel yang login
  const [state] = useContext(UserContext);

  const handleChannelClick = (channelId) => {
    if (state?.user.id === channelId) {
      navigate("/my-channel");
    } else {
      navigate(`/content-creator/${channelId}`);
    }
  };

  const handleSearch = (event) => {
    props.setSearch(event.target.value);
  };

  return (
    <div className="d-flex align-items-center fixed-top py-3 bg justify-content-between">
      <div className="">
        <Button className="bg mx-3 border-0" onClick={handleShow}>
          <img width={25} src={toggle} alt="" />
        </Button>
        <img onClick={() => navigate("/")} width={150} src={Icon} alt="" />
      </div>
      <Offcanvas className="bg" style={{ width: "300px" }} show={show} onHide={handleClose}>
        <Offcanvas.Header className="bg justify-content-start gap-3 p-0 ps-3 mt-3">
          <Button className="bg border-0" onClick={handleClose}>
            <img width={25} src={toggle} alt="" />
          </Button>
          <Link to={"/"}>
            <img onClick={handleClose} width={150} src={Icon} alt="" />
          </Link>
        </Offcanvas.Header>
        <Offcanvas.Body className="bg">
          <div className="ps-3 pt-5 d-flex flex-column gap-5">
            <div className="d-flex flex-column gap-4">
              <a href="/" className="d-flex align-items-center gap-3 text-decoration-none">
                <img src={Home} alt="" />
                <span className="text-white">Home</span>
              </a>
              <a href="/subscription" className="d-flex align-items-center gap-3 text-decoration-none">
                <img src={Video} alt="" />
                <span className="text-white">Subscription</span>
              </a>
            </div>
            <span className="color fs-4 fw-bold">Channel</span>
            <div className="d-flex flex-column gap-3">
              {getChannels?.map((value) => {
                return (
                  <div key={value.id} className="d-flex align-items-center gap-3">
                    <img onClick={() => handleChannelClick(value?.id)} style={{ width: "50px", height: "50px", objectFit: "cover" }} src={value.photo ? value.photo : Fp} alt="" />
                    <span className="text-white fw-bold fs-6">{value.channelName}</span>
                  </div>
                );
              })}
            </div>
          </div>
        </Offcanvas.Body>
      </Offcanvas>
      <div className=" w-50 d-flex justify-content-center">
        <Form.Control value={props.search} onChange={handleSearch} className="w-50" type="text" placeholder="Search" name="search" />
      </div>
      <div className="d-flex gap-4 align-items-center me-3 pe-3">
        <a href="/add-video" className="d-flex align-items-center gap-4 text-decoration-none">
          <div width="30px">
            <img width="30px" src={AddVideo} alt="" />
          </div>
          <span className="color">
            <p className="text-white p-0 m-0" href="color">
              Add Video
            </p>
          </span>
        </a>
        <DropDown />
      </div>
    </div>
  );
}

export default Navbars;

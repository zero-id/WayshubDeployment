import React, { useContext } from "react";
import Navbars from "../components/Navbars";
import { Container, Button } from "react-bootstrap";
import Cover from "../assets/images/Cover.png";
import Fp from "../assets/images/fp.jpg";
import Line from "../assets/images/Line.png";
import Card from "react-bootstrap/Card";
import { useNavigate } from "react-router";
import { UserContext } from "../context/UserContext";
import { useQuery } from "react-query";
import { API } from "../config/api";

export default function MyChannelDescription() {
  const navigate = useNavigate();
  const [state] = useContext(UserContext);
  const { data: getChannel } = useQuery("channelCache", async () => {
    const response = await API.get(`/channel/${state.user.id}`);
    return response.data.data;
  });
  return (
    <>
      <Navbars />
      <Container className="margin-top-content" fluid>
        <img width="100%" style={{ height: "300px", objectFit: "cover" }} src={getChannel?.cover ? getChannel?.cover : Cover} alt="" />
        <Container className="mt-4">
          <div className="d-flex justify-content-between align-items-center mb-3">
            <div className="d-flex gap-3 align-items-center">
              <img style={{ width: "100px", height: "100px", objectFit: "cover" }} width={100} src={getChannel?.photo ? getChannel?.photo : Fp} alt="" />
              <div className="d-flex  flex-column">
                <p className="text-white p-0 m-0 fw-bold fs-1">{getChannel?.channelName}</p>
                <p className="text-white p-0 m-0 ">{getChannel?.subscriber} Subscriber</p>
              </div>
            </div>
            <div>
              <Button
                onClick={() => {
                  navigate("/edit-channel");
                }}
                className="btn-bg"
              >
                Edit Channel
              </Button>
            </div>
          </div>
          <div className="">
            <span
              style={{ cursor: "pointer" }}
              onClick={() => {
                navigate("/my-channel");
              }}
              className="text-white pe-5 fw-bold fs-5"
            >
              Video
            </span>
            <span
              style={{ cursor: "pointer" }}
              onClick={() => {
                navigate("/description-channel");
              }}
              className="color fw-bold fs-5"
            >
              Description Channel
            </span>
          </div>
          <img width="100%" src={Line} alt="" />
          <div className="d-flex warp">
            <p align="justify" className="text-white">
              {getChannel?.description}
            </p>
          </div>
        </Container>
      </Container>
    </>
  );
}

import React, { useContext } from "react";
import Navbars from "../components/Navbars";
import { Container, Button } from "react-bootstrap";
import Cover from "../assets/images/Cover.png";
import Fp from "../assets/images/fp.jpg";
import Line from "../assets/images/Line.png";
import Card from "react-bootstrap/Card";
import View from "../assets/images/view.png";
import Dur from "../assets/images/dur.png";
import { useQuery } from "react-query";
import { API } from "../config/api";
import { UserContext } from "../context/UserContext";
import { Link, useNavigate } from "react-router-dom";

export default function MyChannel() {
  const navigate = useNavigate();
  // Get Channel By Id
  const [state] = useContext(UserContext);
  const { data: getChannel } = useQuery("channelCache", async () => {
    const response = await API.get(`/channel/${state.user.id}`);
    return response.data.data;
  });

  // Function untuk meng-update view counter
  const handleViewCounter = async (videoId) => {
    try {
      await API.patch(`/UpdateViews/${videoId}`);
    } catch (err) {
      alert("Error");
      console.log(err);
    }
  };

  return (
    <>
      <Navbars />
      <Container className="margin-top-content" fluid>
        <img width="100%" style={{ height: "300px", objectFit: "cover" }} src={getChannel?.cover != "http://localhost:8080/uploads/" ? getChannel?.cover : Cover} alt="" />
        <Container className="mt-4">
          <div className="d-flex justify-content-between align-items-center mb-3">
            <div className="d-flex gap-3 align-items-center">
              <img style={{ width: "100px", height: "100px", objectFit: "cover" }} width={100} src={getChannel?.photo != "http://localhost:8080/uploads/" ? getChannel?.photo : Fp} alt="" />
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
              className="color pe-5 fw-bold fs-5"
            >
              Video
            </span>
            <span
              style={{ cursor: "pointer" }}
              onClick={() => {
                navigate("/description-channel");
              }}
              className="text-white fw-bold fs-5"
            >
              Description Channel
            </span>
          </div>
          <img width="100%" src={Line} alt="" />
          <div className="d-flex warp justify-content-start">
            {getChannel?.video.map((value) => {
              return (
                <div key={value.id} className="d-flex flex-column mb-2 p-2 rounded" style={{ width: "320px", backgroundColor: "#0b0b0b" }}>
                  <Card.Body className="d-flex flex-column gap-2">
                    <Link onClick={() => handleViewCounter(value?.id)} to={`/video-detail/${value.id}`} className="text-decoration-none">
                      <Card.Img className="width-video-my-channel rounded mb-2" variant="top" src={value.thumbnail} />
                      <Card.Title className="text-white">{value?.title}</Card.Title>
                    </Link>
                    <Link onClick={() => handleViewCounter(value?.id)} to={`/video-detail/${value.id}`} className="text-decoration-none color-name-channel">
                      <Card.Text className="m-0 p-0">{value?.channel.channelName}</Card.Text>
                      <div className="d-flex gap-5">
                        <div className="d-flex gap-2">
                          <div>
                            <img width={15} src={View} alt="" />
                          </div>
                          <span>{value?.viewCount}</span>
                        </div>
                        <div className="d-flex gap-2">
                          <div>
                            <img width={15} src={Dur} alt="" />
                          </div>
                          <span>{value?.formatTime}</span>
                        </div>
                      </div>
                    </Link>
                  </Card.Body>
                </div>
              );
            })}
          </div>
        </Container>
      </Container>
    </>
  );
}

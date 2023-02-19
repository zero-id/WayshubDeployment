import React, { useContext } from "react";
import SideBar from "../components/SideBar";
import Navbars from "../components/Navbars";
import { Container, Col } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import { GrView } from "react-icons/gr";
import View from "../assets/images/view.png";
import Dur from "../assets/images/dur.png";
import { useQuery } from "react-query";
import { API } from "../config/api";
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from "../context/UserContext";

export default function Subscription(props) {
  // Mengambil semua video dari setiap channel
  const { data: getAllVideos } = useQuery("videosCache", async () => {
    const response = await API.get("/videos");
    return response.data.data;
  });

  // Get Channel By Id
  const { data: getChannel } = useQuery("channelCache", async () => {
    const response = await API.get(`/channel/${state.user.id}`);
    return response.data.data;
  });

  const navigate = useNavigate();

  // Untuk mengambil id channel login
  const [state] = useContext(UserContext);

  // Kondisi ketika meng-klik channel sendiri dan channel orang lain
  const handleClick = (channelId) => {
    if (state?.user.id === channelId) {
      navigate("/my-channel");
    } else {
      navigate(`/content-creator/${channelId}`);
    }
  };

  // Function untuk meng-update view counter
  const handleViewCounter = async (videoId) => {
    try {
      await API.patch(`/UpdateViews/${videoId}`);
    } catch (err) {
      alert("Error");
      console.log(err);
    }
  };

  console.log("ini sub", getChannel);
  console.log("ini All", getAllVideos);

  return (
    <>
      <Navbars />
      <Container fluid className="margin-top-content d-flex warp justify-content-start">
        {getAllVideos?.map((value, index) => {
          if (value.channel.id === getChannel?.subscription[index]?.other_id) {
            return (
              <div key={index} className="d-flex flex-column mb-2 p-2 rounded" style={{ width: "360px", backgroundColor: "#0b0b0b" }}>
                <Card.Body className="d-flex flex-column gap-2">
                  <Link onClick={() => handleViewCounter(value?.id)} to={`/video-detail/${value.id}`} className="text-decoration-none">
                    <Card.Img className="width-video rounded mb-2" variant="top" src={value?.thumbnail} />
                    <Card.Title className="text-white">{value?.title}</Card.Title>
                  </Link>
                  {/* {value.map()} */}
                  <div style={{ cursor: "pointer" }} onClick={() => handleClick(value?.channel.id)} className="text-decoration-none color-name-channel">
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
                  </div>
                </Card.Body>
              </div>
            );
          } else {
            return;
          }
        })}
      </Container>
    </>
  );
}

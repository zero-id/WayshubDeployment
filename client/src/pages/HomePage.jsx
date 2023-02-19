import React, { useContext, useState } from "react";
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

export default function HomePage() {
  // Search Fitur
  const [search, setSearch] = useState("");
  const [data, setData] = useState();

  // Mengambil semua video dari setiap channel
  const { data: getAllVideos } = useQuery("videosCache", async () => {
    const response = await API.get("/videos");
    setData(response.data.data);
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

  const filteredData = data?.filter((value) => {
    return value?.title?.toLowerCase().includes(search?.toLowerCase());
  });

  return (
    <>
      <Navbars setSearch={setSearch} search={search} />
      <Container fluid className="margin-top-content d-flex warp justify-content-start">
        {filteredData?.map((value) => {
          return (
            <div key={value.id} className="d-flex flex-column mb-2 p-2 rounded" style={{ width: "360px", backgroundColor: "#0b0b0b" }}>
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
        })}
      </Container>
    </>
  );
}

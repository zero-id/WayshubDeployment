import React, { useContext } from "react";
import Navbars from "../components/Navbars";
import { Container, Button } from "react-bootstrap";
import Cover from "../assets/images/Cover.png";
import Fp from "../assets/images/fp.jpg";
import Line from "../assets/images/Line.png";
import Card from "react-bootstrap/Card";
import { useParams } from "react-router";
import { useMutation, useQuery } from "react-query";
import { API } from "../config/api";
import { UserContext } from "../context/UserContext";
import { Link } from "react-router-dom";
import View from "../assets/images/view.png";
import Dur from "../assets/images/dur.png";

export default function ContentCreator(props) {
  // Untuk mengambil id user yang login
  const [state] = useContext(UserContext);

  // Mengambil database channel berdasarkan id
  const { id } = useParams();
  const { data: getChannelById, refetch: channelRefetch } = useQuery("channelContentByIdCache", async () => {
    const response = await API.get(`/channel/${id}`);
    return response.data.data;
  });

  // Mengambil data subscription user yang login
  const { data: channelLogin, refetch: loginRefetch } = useQuery("channelLoginCache", async () => {
    const response = await API.get(`/channel/${state?.user.id}`);
    return response.data.data.subscription;
  });

  console.log(channelLogin)

  let channel = [];

  channelLogin?.filter((subs) => {
    if (subs.other_id == id) {
      channel.push(subs);
    }
    console.log(subs)
  });

  const [channelId] = channel;

  // Post handle untuk mengirim data ke database
  const handleSubs = useMutation(async (e) => {
    try {
      e.preventDefault();

      const response = await API.post(`/subscribe/${id}`);
      const plusSub = await API.patch(`/plusSubs/${id}`);
      if (response.status == 200 && plusSub.status == 200) {
        channelRefetch();
        loginRefetch();
        props.refetch();
      }
    } catch (err) {
      alert("FAILED");
      console.log(err.data);
    }
  });

  const handleUnsub = useMutation(async (e) => {
    try {
      e.preventDefault();

      const response = await API.delete(`/subscribe`);
      const plusSub = await API.patch(`/minusSubs/${id}`);
      if (response.status == 200 && plusSub.status == 200) {
        channelRefetch();
        loginRefetch();
        props.refetch();
      }
    } catch (err) {
      alert("FAILED");
      console.log(err);
    }
  });

  return (
    <>
      <Navbars />
      <Container className="margin-top-content" fluid>
        <img width="100%" style={{ height: "300px", objectFit: "cover" }} src={getChannelById?.cover  ? getChannelById?.cover : Cover} alt="" />
        <Container className="mt-4">
          <div className="d-flex justify-content-between align-items-center mb-3">
            <div className="d-flex gap-3 align-items-center">
              <img style={{ width: "100px", height: "100px", objectFit: "cover" }} width={100} src={getChannelById?.photo  ? getChannelById?.photo : Fp} alt="" />
              <div className="d-flex  flex-column">
                <p className="text-white p-0 m-0 fw-bold fs-1">{getChannelById?.channelName}</p>
                <p className="text-white p-0 m-0 ">{getChannelById?.subscriber} Subscriber</p>
              </div>
            </div>
            <div>
              <Link>
                {channelId?.other_id ? (
                  <Button
                    className="btn-bg"
                    onClick={(e) => handleUnsub.mutate(e)}
                  >
                    unsubscribe
                  </Button>
                ) : (
                  <Button className="bg-light border-0 text-dark" onClick={(e) => handleSubs.mutate(e)}>Subscribe</Button>
                )}
              </Link>
            </div>
          </div>
          <img width="100%" src={Line} alt="" />
          <div className="d-flex warp justify-content-center">
            {getChannelById?.video.map((value) => {
              return (
                <div key={value.id} className="d-flex flex-column mb-2 p-2 rounded" style={{ width: "320px", backgroundColor: "#0b0b0b" }}>
                  <Card.Body className="d-flex flex-column gap-2">
                    <Link to={`/video-detail/${value.id}`} className="text-decoration-none">
                      <Card.Img className="width-video-my-channel rounded mb-2" variant="top" src={value.thumbnail} />
                      <Card.Title className="text-white">{value?.title}</Card.Title>
                    </Link>
                    <Link to={`/video-detail/${value.id}`} className="text-decoration-none color-name-channel">
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

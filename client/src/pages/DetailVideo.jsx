import React, { useContext, useState } from "react";
import { Container, Col, Card, Row, Form, Button } from "react-bootstrap";
import Detail from "../assets/images/Detail.png";
import Navbars from "../components/Navbars";
import View from "../assets/images/view.png";
import Dur from "../assets/images/dur.png";
import { useNavigate, useParams } from "react-router";
import { API } from "../config/api";
import { useMutation, useQuery } from "react-query";
import { Link } from "react-router-dom";
import Fp from "../assets/images/fp.jpg";
import { UserContext } from "../context/UserContext";

export default function DetailVideo(props) {
  // const navigate = useNavigate();
  const { id } = useParams();
  const navigate = useNavigate();

  // Mengambil data komentar
  const { data: getAllComments, refetch: refetchComment } = useQuery("getAllComments", async () => {
    const response = await API.get(`/comments`);
    return response.data.data;
  });

  let allComments = [];
  getAllComments?.filter((com) => {
    if (com?.video_id == id) {
      allComments.push(com);
    }
  });

  // Mengambil id channel yang login
  const [state] = useContext(UserContext);

  // Mengambil data login
  const { data: getLoginChannel } = useQuery("getLoginChannelIdCache", async () => {
    const response = await API.get(`/channel/${state?.user.id}`);
    return response.data.data;
  });

  // Fetch Videos By Id
  const { data: getVideoById } = useQuery("detailVideoIdCache", async () => {
    const response = await API.get(`/video/${id}`);
    return response.data.data;
  });

  // Mengambil semua video
  const { data: getAllVideos } = useQuery("getAllVideoIdCache", async () => {
    const response = await API.get(`/videos`);
    return response.data.data;
  });

  // Kondisi saat meng-klik channel
  const handleClick = (channelId) => {
    if (state?.user.id === channelId) {
      navigate("/my-channel");
    } else {
      navigate(`/content-creator/${channelId}`);
    }
  };

  // Handle komentar
  const [comment, setComment] = useState({
    comment: "",
  });

  const handleChange = (e) => {
    setComment({
      ...comment,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = useMutation(async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append("comment", comment.comment);
      const response = await API.post(`/comment/${getVideoById?.id}`, formData);
      if (response.status == 200) {
        alert("Comment Added", "You comment can be seen by anyone else", "success");
      }
      if (response.status == 200) {
        refetchComment();
      }
    } catch (err) {
      console.log(err);
      alert("Comment Failed");
    }
  });

  const handleChannelClick = (channelId) => {
    if (state?.user.id === channelId) {
      navigate("/my-channel");
    } else {
      navigate(`/content-creator/${channelId}`);
    }
  };

  return (
    <>
      <Navbars />
      <Container className="p-0 margin-top-content">
        <Row className="d-flex flex-warp m-0 p-0">
          <Col sm="9" className="p-0 pe-5 m-0">
            <Card className="border-0 bg-body d-flex flex-column gap-2">
              <video controls>
                <source src={getVideoById?.video} type="video/mp4" />
              </video>
              <Card.Title className="bg-body text-white p-0 m-0">{getVideoById?.title}</Card.Title>
              <div className="d-flex gap-5">
                <div className="d-flex gap-2">
                  <div>
                    <img width={15} src={View} alt="" />
                  </div>
                  <span className="color-name-channel">{getVideoById?.viewCount}</span>
                </div>
                <div className="d-flex gap-2">
                  <div>
                    <img width={15} src={Dur} alt="" />
                  </div>
                  <span className="color-name-channel">{getVideoById?.formatTime}</span>
                </div>
              </div>
            </Card>
            <hr style={{ backgroundColor: "white", height: "4px" }} />
            <div>
              <div className="d-flex justify-content-between">
                <div className="d-flex align-items-center gap-3">
                  <div style={{ width: "100px", height: "100px" }}>
                    <img style={{ cursor: "pointer", objectFit: "cover", width: "100px", height: "100px" }} onClick={() => handleClick(getVideoById?.channel.id)} src={getVideoById?.channel.photo ? getVideoById?.channel.photo : Fp} alt="" />
                  </div>
                  <div>
                    <p className="text-white p-0 m-0 fw-bold fs-4">{getVideoById?.channel.channelName}</p>
                    <p className="text-white p-0 m-0 ">{getVideoById?.channel.subscriber} Subscriber</p>
                  </div>
                </div>
                <div className="d-flex align-items-center">
                  {/* <Link>
                    {channelId?.other_id ? (
                      <Button className="btn-bg" onClick={(e) => handleUnsub.mutate(e)}>
                        unsubscribe
                      </Button>
                    ) : (
                      <Button className="bg-light border-0 text-dark" onClick={(e) => handleSubs.mutate(e)}>
                        Subscribe
                      </Button>
                    )}
                  </Link> */}
                </div>
              </div>
              <div className="my-5">
                <p className="text-white">{getVideoById?.description}</p>
              </div>
            </div>
            <hr style={{ backgroundColor: "white", height: "4px" }} />
            <div>
              <Form onSubmit={(e) => handleSubmit.mutate(e)} className="d-flex gap-4">
                <div style={{ width: "50px" }}>
                  <img width="100%" src={getLoginChannel?.photo} alt="" />
                </div>
                <Form.Control onChange={handleChange} name="comment" type="text" rows={4} placeholder="Comment" />
                <Button type="submit" className="btn-bg">
                  Send
                </Button>
              </Form>
            </div>
            <hr style={{ backgroundColor: "white", height: "4px" }} />
            <div className="comments-container d-flex flex-column gap-4">
              {allComments?.map((comment) => (
                <div className="d-flex gap-1 mb-2">
                  <div className="d-flex align-items-center gap">
                    {comment?.channel.photo ? (
                      <img
                        src={comment?.channel.photo}
                        alt="profile"
                        style={{
                          width: "50px",
                          height: "50px",
                          marginRight: "10px",
                          objectFit: "cover",
                        }}
                      />
                    ) : (
                      <img
                        src={Fp}
                        alt="profile"
                        style={{
                          width: "50px",
                          height: "50px",
                          marginRight: "10px",
                        }}
                      />
                    )}
                  </div>
                  <div className="comments-value">
                    <p className="pomo fw-bold text-white">{comment?.channel.channelName}</p>
                    <p className="pomo text-white">{comment?.comment}</p>
                  </div>
                </div>
              ))}
            </div>
          </Col>
          <Col sm="3" className="d-flex flex-column align-items-center p-0 m-0">
            {getAllVideos?.map((value) => {
              return (
                <div key={value.id} className="d-flex flex-column mb-2 p-2 rounded pt-0" style={{ width: "360px", backgroundColor: "#0b0b0b" }}>
                  <Card.Body className="d-flex flex-column gap-2">
                    <Link to={`/video-detail/${value.id} `} className="text-decoration-none">
                      <Card.Img className="width-video rounded mb-2" variant="top" src={value.thumbnail} />
                      <Card.Title className="text-white">{value.title}</Card.Title>
                    </Link>
                    <div className="text-decoration-none color-name-channel">
                      <Card.Text className="m-0 p-0">{value.channel.channelName}</Card.Text>
                      <div onClick={() => handleChannelClick(value?.id)} className="d-flex gap-5">
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
          </Col>
        </Row>
      </Container>
    </>
  );
}

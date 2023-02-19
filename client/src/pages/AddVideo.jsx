import React, { useState } from "react";
import SideBar from "../components/SideBar";
import { Col, Container, Form, Row, Button } from "react-bootstrap";
import Navbars from "../components/Navbars";
import { useNavigate } from "react-router";
import { useMutation } from "react-query";
import { API } from "../config/api";

export default function AddVideo() {
  const navigate = useNavigate();

  // Config API
  const [form, setForm] = useState({
    title: "",
    thumbnail: "",
    description: "",
    video: "",
  });

  const handleChange = (e) => {
    if (e.target.name === "thumbnail") {
      setForm({
        ...form,
        [e.target.name]: e.target.files[0],
      });
    } else if (e.target.name === "video") {
      setForm({
        ...form,
        [e.target.name]: e.target.files[0],
      });
    } else {
      setForm({
        ...form,
        [e.target.name]: e.target.value,
      });
    }
  };

  const handleSubmit = useMutation(async (e) => {
    try {
      e.preventDefault();

      const formData = new FormData();

      formData.append("title", form.title);
      formData.append("thumbnail", form.thumbnail);
      formData.append("description", form.description);
      formData.append("video", form.video);

      if (form.title != "" && form.thumbnail != "" && form.description != "" && form.video != "") {
        const response = await API.post("/video", formData);
        console.log(response);
        navigate("/my-channel");
      } else {
        alert("Isi Semua Data!");
      }
    } catch (err) {
      console.log(err.response.data);
      alert("Upload failed");
    }
  });
  return (
    <>
      <Navbars />
      <Container className=" position-absolute top-50 start-50 translate-middle">
        <Form onSubmit={(e) => handleSubmit.mutate(e)} className="d-flex gap-4 flex-column">
          <h1 className="text-white fw-bold">Add Video</h1>
          <Form.Group className="d-flex gap-5">
            <Form.Control name="title" onChange={handleChange} className="w-75" type="text" placeholder="Title" />
            <Form.Control name="thumbnail" onChange={handleChange} className="w-25" type="file" placeholder="Attach Thumbnail" />
          </Form.Group>
          <Form.Group>
            <Form.Control name="description" onChange={handleChange} as="textarea" rows={5} placeholder="Description" />
          </Form.Group>
          <Form.Group>
            <Form.Control name="video" onChange={handleChange} className="w-25" type="file" placeholder="Add Video" />
          </Form.Group>
          <Button type="submit" className="btn-bg py-2 fw-semibold fs-4">Add</Button>
        </Form>
      </Container>
    </>
  );
}

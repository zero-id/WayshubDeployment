import React, { useContext, useState } from "react";
import SideBar from "../components/SideBar";
import { Col, Container, Form, Row, Button } from "react-bootstrap";
import Navbars from "../components/Navbars";
import { UserContext } from "../context/UserContext";
import { useNavigate } from "react-router";
import { useMutation } from "react-query";
import { API } from "../config/api";

export default function EditChannel() {
  const navigate = useNavigate();

  // Mengambil Id dari state
  const [state] = useContext(UserContext);

  // function untuk meng-handle perubahan dalam form
  const [form, setForm] = useState({
    channelName: "",
    description: "",
    cover: "",
    photo: "",
  });

  const handleChange = (e) => {
    if (e.target.name === "cover") {
      setForm({
        ...form,
        [e.target.name]: e.target.files[0],
      });
    } else if (e.target.name === "photo") {
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

  // function untuk meng-update channel
  const handleUpdate = useMutation(async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();

      formData.append("channelName", form.channelName);
      formData.append("description", form.description);
      formData.append("cover", form.cover);
      formData.append("photo", form.photo);

      const response = await API.patch(`/channel/${state?.user.id}`, formData);
      if (response.status == 200) {
        alert("Succes!");
      }
      navigate("/my-channel");
    } catch (err) {
      alert("Update Failed");
      console.log(err);
    }
  });

  return (
    <>
      <Navbars />
      <Container className=" position-absolute top-50 start-50 translate-middle">
        <Form onSubmit={(e) => handleUpdate.mutate(e)} className="d-flex gap-4 flex-column">
          <h1 className="text-white fw-bold">Edit Channel</h1>
          <Form.Group className="d-flex gap-5">
            <Form.Control name="channelName" onChange={handleChange} className="w-75" type="text" placeholder="Name Channel" />
            <Form.Control name="cover" onChange={handleChange} className="w-25" type="file" placeholder="cover" />
          </Form.Group>
          <Form.Group>
            <Form.Control name="description" onChange={handleChange} as="textarea" rows={5} placeholder="Description" />
          </Form.Group>
          <Form.Group>
            <Form.Control name="photo" onChange={handleChange} lassName="w-25" type="file" placeholder="photo" />
          </Form.Group>
          <Button type="submit" className="btn-bg py-2 fw-semibold fs-4">
            Save
          </Button>
        </Form>
      </Container>
    </>
  );
}

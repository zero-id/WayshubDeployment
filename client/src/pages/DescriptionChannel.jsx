import React from "react";
import Navbars from "../components/Navbars";
import { Container, Button } from "react-bootstrap";
import Cover from "../assets/images/Cover.png";
import Fp from "../assets/images/fp.jpg";
import Line from "../assets/images/Line.png";
import Card from "react-bootstrap/Card";

export default function MyChannelDescription() {
  return (
    <>
      <Navbars />
      <Container className="margin-top-content" fluid>
        <img width="100%" src={Cover} alt="" />
        <Container className="mt-4">
          <div className="d-flex justify-content-between align-items-center mb-3">
            <div className="d-flex gap-3 align-items-center">
              <img width={100} src={Fp} alt="" />
              <div className="d-flex  flex-column">
                <p className="text-white p-0 m-0">Zero</p>
                <p className="text-white p-0 m-0">Zero</p>
              </div>
            </div>
            <div>
              <Button className="btn-bg">Edit Channel</Button>
            </div>
          </div>
          <div className="">
            <span className="text-white pe-5 fw-bold fs-5">Video</span>
            <span className="color fw-bold fs-5">Description Channel</span>
          </div>
          <img width="100%" src={Line} alt="" />
          <div className="d-flex warp justify-content-center">
            <p align="justify" className="text-white">
              Lorem ipsum dolor, sit amet consectetur adipisicing elit. Commodi natus, expedita odio, praesentium vitae alias at inventore illum fugiat id ducimus placeat? Dolores doloremque commodi neque aspernatur vel magni ad expedita
              sunt eum incidunt ea libero, odio officiis in velit nostrum, dolore minus ipsa voluptates error? Dolorem velit adipisci voluptas cumque accusamus. Explicabo rerum corrupti non numquam aliquid unde quas nam nihil quaerat
              nostrum, illo impedit sint, est quae excepturi dolore! Quasi corporis, hic earum optio quas quia enim repudiandae officia molestias ad accusamus amet corrupti sapiente vitae sunt itaque nobis blanditiis in iure provident
              cupiditate veritatis repellendus consequatur cum. Sunt soluta, unde maiores nihil molestias, velit, esse enim dolores quibusdam exercitationem a neque? Delectus quas deleniti incidunt! Tempora, sed. Fugit, distinctio repellat
              quaerat adipisci expedita ipsum accusantium vitae quisquam saepe aperiam quis magnam impedit quo. A quis tempore veritatis impedit velit eaque iure laborum, error nemo, neque adipisci explicabo incidunt? Maxime, ipsa eius
              rerum corporis dolore repellendus sunt iure ex at esse veritatis sint quisquam eum dolores, praesentium pariatur mollitia inventore cupiditate aspernatur, beatae tempore fugit deleniti. Quisquam sapiente perspiciatis quibusdam
              quo consequatur eligendi nam dolorem, quas officiis vitae nihil ipsum possimus illo reprehenderit veritatis ullam dolorum sit omnis.
            </p>
          </div>
        </Container>
      </Container>
    </>
  );
}

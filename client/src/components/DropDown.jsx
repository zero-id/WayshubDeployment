import Dropdown from "react-bootstrap/Dropdown";
import React from "react";
import Fp from "../assets/images/fp.jpg";
import MyChannel from "../assets/images/My Chanel.png";
import Logout from "../assets/images/Logout.png";

function DropDown() {
  return (
    <Dropdown>
      <Dropdown.Toggle className="bg border-0" id="dropdown-basic">
        <img src={Fp} alt="" width={35} />
      </Dropdown.Toggle>

      <Dropdown.Menu className="bg-drop-down">
        <Dropdown.Item className="drop-down mb-3" href="/my-channel">
          <img src={MyChannel} alt="" />
        </Dropdown.Item>
        <Dropdown.Item className="drop-down" href="/sign-up">
          <img src={Logout} alt="" />
        </Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  );
}

export default DropDown;

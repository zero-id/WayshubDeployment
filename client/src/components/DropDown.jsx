import Dropdown from "react-bootstrap/Dropdown";
import React, { useContext } from "react";
import Fp from "../assets/images/fp.jpg";
import MyChannel from "../assets/images/My Chanel.png";
import Logout from "../assets/images/Logout.png";
import { UserContext } from "../context/UserContext";
import { useNavigate } from "react-router";

function DropDown() {
  const navigate = useNavigate();
  const [state, dispatch] = useContext(UserContext);
  const logout = () => {
    console.log(state);
    dispatch({
      type: "LOGOUT",
    });
    navigate("/sign-up");
  };
  return (
    <Dropdown>
      <Dropdown.Toggle className="bg border-0" id="dropdown-basic">
        <img src={Fp} alt="" width={35} />
      </Dropdown.Toggle>

      <Dropdown.Menu className="bg-drop-down">
        <Dropdown.Item className="drop-down mb-3" href="/my-channel">
          <img src={MyChannel} alt="" />
        </Dropdown.Item>
        <Dropdown.Item onClick={logout} className="drop-down" href="/sign-up">
          <img src={Logout} alt="" />
        </Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  );
}

export default DropDown;

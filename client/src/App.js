import "./App.css";
// import SignIn from "./pages/SignIn";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import "bootstrap/dist/css/bootstrap.min.css";
import WaysHub from "./assets/images/WayshubAuth.png";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import HomePage from "./pages/HomePage.jsx";
import "./css/global.css";
import AddVideo from "./pages/AddVideo";
import Navbars from "./components/Navbars";
import SearchBar from "./components/SearchBar";
import MyChannel from "./pages/MyChannel";
import MyChannelDescription from "./pages/DescriptionChannel";
import ContentCreator from "./pages/ContentCreator";
import Subscription from "./pages/Subscription";
import DetailVideo from "./pages/DetailVideo";
import { Routes, Route } from "react-router-dom";
import EditChannel from "./pages/EditChannel";

function App() {
  return (
    <Routes>
      <Route path="/sign-up" element={<SignUp />} />
      <Route path="/sign-in" element={<SignIn />} />
      <Route path="/home" element={<HomePage />} />
      <Route path="/add-video" element={<AddVideo />} />
      <Route path="/subscription" element={<Subscription />} />
      <Route path="/content-creator" element={<ContentCreator />} />
      <Route path="/my-channel" element={<MyChannel />} />
      <Route path="/edit-channel" element={<EditChannel />} />
      <Route path="/description-channel" element={<MyChannelDescription />} />
      <Route path="/video-detail" element={<DetailVideo />} />
    </Routes>
  );
}

export default App;

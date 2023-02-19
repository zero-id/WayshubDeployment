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
import { Routes, Route, useNavigate } from "react-router-dom";
import EditChannel from "./pages/EditChannel";
import PrivateRoute from "./components/PrivatRoot";
import { API, setAuthToken } from "./config/api";
import { UserContext } from "./context/UserContext";
import { useContext, useEffect, useState } from "react";
import { useQuery } from "react-query";

function App() {
  const [state, dispatch] = useContext(UserContext);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();



  //  Mengambil data subscription
  const { data: subscription, refetch: subsRefetch } = useQuery("subscriptionChannelId", async () => {
    const response = await API.get(`/channel/${state?.user.id}`);
    return response.data.data.subscription;
  });

  useEffect(() => {
    // Redirect Auth but just when isLoading is false
    if (!isLoading) {
      if (state.isLogin === false) {
        navigate("/sign-up");
      }
    }
  }, [isLoading]);

  useEffect(() => {
    if (localStorage.token) {
      setAuthToken(localStorage.token);
      checkUser();
    } else {
      setIsLoading(false);
    }
  }, [state]);

  const checkUser = async () => {
    try {
      const response = await API.get("/check-auth");
      // console.log("check user success : ", response);
      // Get user data
      let payload = response.data.data;
      // Get token from local storage
      payload.token = localStorage.token;
      // Send data to useContext
      dispatch({
        type: "USER_SUCCESS",
        payload,
      });
      setIsLoading(false);
    } catch (error) {
      // console.log("check user failed : ", error);
      dispatch({
        type: "AUTH_ERROR",
      });
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (localStorage.token) {
      checkUser();
    }
  }, []);

  return (
    <>
      {isLoading ? null : (
        <Routes>
          <Route path="/sign-up" element={<SignUp />} />
          <Route path="/sign-in" element={<SignIn />} />
          <Route element={<PrivateRoute />}>
            <Route path="/" element={<HomePage subs={subscription} refetch={subsRefetch}/>} />
            <Route path="/add-video" element={<AddVideo subs={subscription} refetch={subsRefetch} />} />
            <Route path="/subscription" element={<Subscription subs={subscription} refetch={subsRefetch} />} />
            <Route path="/content-creator/:id" element={<ContentCreator subs={subscription} refetch={subsRefetch} />} />
            <Route path="/my-channel" element={<MyChannel subs={subscription} refetch={subsRefetch} />} />
            <Route path="/edit-channel" element={<EditChannel subs={subscription} refetch={subsRefetch} />} />
            <Route path="/description-channel" element={<MyChannelDescription subs={subscription} refetch={subsRefetch} />} />
            <Route path="/video-detail/:id" element={<DetailVideo subs={subscription} refetch={subsRefetch} />} />
          </Route>
        </Routes>
      )}
    </>
  );
}

export default App;

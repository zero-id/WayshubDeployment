import { useContext } from "react";
import { Navigate, Outlet, useNavigate } from "react-router-dom";
import { UserContext } from "../context/UserContext";

export default function PrivateRoute() {
  const [state] = useContext(UserContext);

  if (!state.isLogin) {
    return <Navigate to="/sign-up" />;
  }
  return <Outlet />;
}

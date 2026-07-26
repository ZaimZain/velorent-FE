import { Navigate } from "react-router-dom";
import config from "../services/config";

const ProtectedRoute = ({ children }: { children: React.ReactElement }) => {

  // Development bypass
  if (!config.authEnabled) {
    return children;
  }

  const username = localStorage.getItem("username");

  if (!username) {
    return <Navigate to="/" />;
  }

  return children;
};

export default ProtectedRoute;
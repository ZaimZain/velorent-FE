import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }: { children: JSX.Element }) => {
  const username = localStorage.getItem("username");

  if (!username) {
    // Redirect them to the login page if not authenticated
    return <Navigate to="/" />;
  }

  return children;
};

export default ProtectedRoute;

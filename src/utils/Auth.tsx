import { useNavigate } from "react-router-dom";
import axios from "axios";

export const logoutUser = async (navigate: Function) => {
  try {
    // Send logout request to backend to invalidate the session
    await axios.post("http://localhost:8080/api/auth/logout");

    // Clear localStorage to remove user info
    localStorage.clear();

    // Redirect to the login page
    navigate("/");
  } catch (err) {
    console.error("Error during logout:", err);
  }
};

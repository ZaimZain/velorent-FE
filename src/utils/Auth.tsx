import api from"../services/api";

export const logoutUser = async (navigate: Function) => {
  try {
    // Send logout request to backend to invalidate the session
    await api.post("/auth/logout");

    // Clear localStorage to remove user info
    localStorage.clear();

    // Redirect to the login page
    navigate("/");
  } catch (err) {
    console.error("Error during logout:", err);
  }
};

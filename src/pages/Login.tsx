import { useState,useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Container, Card, Form, Button, Row, Col, Alert } from "react-bootstrap";
import api from"../services/api";
import { logoutUser } from "../utils/Auth";
import VelorentLogo from "../components/VelorentLogo";


const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
//   const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
//   const [idleTimer, setIdleTimer] = useState<NodeJS.Timeout | null>(null);
const [idleTimer, setIdleTimer] = useState<ReturnType<typeof setTimeout> | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
//     setLoading(true);

    try {
      const response = await api.post("/auth/login", {
        username,
        password,
      });

      const { success, message, username: user, role } = response.data;

      if (success) {
        // Save user info to localStorage
        localStorage.setItem("username", user);
        localStorage.setItem("role", role);

        // Set up inactivity timer after successful login
        setupIdleTimer();

        // Redirect to Home
        navigate("/dashboard");
      } else {
        setError(message || "Login failed");
      }
    } catch (err: any) {
      setError(err.response?.data?.message || "Network error, please try again.");
    } finally {
//       setLoading(false);
    }
  };

  // Function to handle user activity (mouse move/keydown) and reset the timer
  const handleActivity = () => {
    if (idleTimer) clearTimeout(idleTimer); // Clear any previous timer
    setIdleTimer(setTimeout(logout, 60000)); // Set timeout for 1 minutes
  };

  // Function to log out the user and redirect to login page after session expires
  const logout = async () => {
    // Call the logoutUser function to handle the logout
    logoutUser(navigate);
  };

  // Set up event listeners for mouse and keyboard activity to reset the inactivity timer
  const setupIdleTimer = () => {
    window.addEventListener("mousemove", handleActivity);
    window.addEventListener("keydown", handleActivity);
  };

  useEffect(() => {
    setupIdleTimer(); // Set up event listeners when the component is mounted

    return () => {
      if (idleTimer) clearTimeout(idleTimer); // Clear any existing idle timer on cleanup
      window.removeEventListener("mousemove", handleActivity); // Remove event listeners
      window.removeEventListener("keydown", handleActivity);
    };
  }, [idleTimer]);

  return (
    <div style={{ backgroundColor: "#F1F5F9", minHeight: "100vh", display: "flex", alignItems: "center" }}>
      <Container>
        <Row className="justify-content-center">
          <Col md={6} lg={5}>
            <Card className="p-4 shadow rounded-4">
              <h2 style={{ color: "#0F172A", fontFamily: "Poppins", fontWeight: 600 }} className="text-center mb-4">
                <div className="text-center mb-4">
                  <VelorentLogo fontSize="3rem" />
                </div>
              </h2>

              {error && <Alert variant="danger">{error}</Alert>}

              <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3">
                  <Form.Label style={{ color: "#64748B", fontFamily: "Inter" }}>Username</Form.Label>
                  <Form.Control
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    style={{ borderColor: "#CBD5E1", borderRadius: "12px" }}
                    placeholder="Enter username"
                  />
                </Form.Group>

                <Form.Group className="mb-4">
                  <Form.Label style={{ color: "#64748B", fontFamily: "Inter" }}>Password</Form.Label>
                  <Form.Control
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    style={{ borderColor: "#CBD5E1", borderRadius: "12px" }}
                    placeholder="Enter password"
                  />
                </Form.Group>

                <Button
                  type="submit"
                  className="w-100"
                  style={{ backgroundColor: "#38BDF8", borderColor: "#38BDF8", fontWeight: "bold", borderRadius: "12px" }}
                >
                  Login
                </Button>

                <div className="text-center mt-3">
                  <a href="#" style={{ color: "#38BDF8", textDecoration: "none" }}>
                    Forgot password?
                  </a>
                </div>
              </Form>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Login;
import { useState,useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Container, Card, Form, Button, Alert, Spinner } from "react-bootstrap";
import axios from "axios";
import { logoutUser } from "../utils/Auth"

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [idleTimer, setIdleTimer] = useState<NodeJS.Timeout | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const response = await axios.post("http://localhost:8080/api/auth/login", {
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
        navigate("/home");
      } else {
        setError(message || "Login failed");
      }
    } catch (err: any) {
      setError(err.response?.data?.message || "Network error, please try again.");
    } finally {
      setLoading(false);
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
    <Container className="d-flex align-items-center justify-content-center" style={{ minHeight: "100vh" }}>
      <div className="w-100" style={{ maxWidth: "400px" }}>
        <Card className="shadow-sm">
          <Card.Body>
            <h2 className="text-center mb-4">VeloRent CMS Login</h2>
            {error && <Alert variant="danger">{error}</Alert>}
            <Form onSubmit={handleSubmit}>
              <Form.Group className="mb-3" controlId="username">
                <Form.Label>Username</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                />
              </Form.Group>

              <Form.Group className="mb-4" controlId="password">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Enter password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </Form.Group>

              <Button variant="primary" type="submit" className="w-100" disabled={loading}>
                {loading ? <Spinner animation="border" size="sm" /> : "Login"}
              </Button>
            </Form>
          </Card.Body>
        </Card>
      </div>
    </Container>
  );
};

export default Login;

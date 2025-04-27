import React from "react";
import { Navbar, Nav, Container, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const CustomNavbar = () => {
  const navigate = useNavigate();
  const username = localStorage.getItem("username");
  const role = localStorage.getItem("role");

  const handleLogout = () => {
    // Clear user session data from localStorage
    localStorage.removeItem("username");
    localStorage.removeItem("role");

    // Redirect to login page
    navigate("/");
  };

  return (
    <Navbar bg="dark" variant="dark" expand="lg">
      <Container>
        <Navbar.Brand href="/home">VeloRent CMS</Navbar.Brand>
        <Nav className="ml-auto">
          <Nav.Item className="mr-3">
            <span className="text-white">Welcome, {username}</span>
          </Nav.Item>
          <Nav.Item className="mr-3">
            <span className="text-white">Role: {role}</span>
          </Nav.Item>
          <Nav.Item>
            <Button variant="outline-light" onClick={handleLogout}>
              Logout
            </Button>
          </Nav.Item>
        </Nav>
      </Container>
    </Navbar>
  );
};

export default CustomNavbar;

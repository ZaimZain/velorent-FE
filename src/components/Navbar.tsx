import React from "react";
import { Navbar, Nav, Container, Button } from "react-bootstrap";
import { useNavigate, Link } from 'react-router-dom';
import { logoutUser } from "../utils/Auth"
import axios from "axios";

const CustomNavbar = () => {
  const navigate = useNavigate();
  const username = localStorage.getItem("username");
  const role = localStorage.getItem("role");

  const handleLogout = () => {
    // Call the logoutUser function to handle the logout
    logoutUser(navigate);
  };

  return (
      <Navbar bg="dark" variant="dark" expand="lg">
      <Container>
        <Navbar.Brand href="/home">VeloRent CMS</Navbar.Brand>
        <Nav className="ml-auto">
          <Nav.Item>
            <Link to="/dashboard" className="nav-link text-white">
              Dashboard
            </Link>
          </Nav.Item>
          <Nav.Item>
            <Link to="/profile" className="nav-link text-white">
              Profile
            </Link>
          </Nav.Item>
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

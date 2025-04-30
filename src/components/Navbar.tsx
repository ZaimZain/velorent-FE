import React, { useState } from "react";
import { Navbar, Nav, Container, Button, Dropdown, Image } from "react-bootstrap";
import { useNavigate, Link } from 'react-router-dom';
import { logoutUser } from "../utils/Auth";
import VelorentLogo from "../components/VelorentLogo";
// import { User } from "lucide-react"; // Optional icon

const CustomNavbar = () => {
  const navigate = useNavigate();
  const username = localStorage.getItem("username");
  const role = localStorage.getItem("role");

  const handleLogout = () => {
    // Call the logoutUser function to handle the logout
    logoutUser(navigate);
  };

  return (
    <Navbar
      expand="lg"
      className="bg-white shadow-sm rounded-xl px-4 py-2 mb-4"
      style={{
        backgroundColor: "#FFFFFF",
        boxShadow: "8px 8px 16px #CBD5E1, -8px -8px 16px #FFFFFF",
        borderRadius: "1rem",
      }}
    >
      <Container fluid className="d-flex justify-content-between align-items-center">

        {/* Left: Logo + User Dropdown */}
        <div className="d-flex align-items-center gap-3">
          <Navbar.Brand as={Link} to="/dashboard">
            <VelorentLogo fontSize="1.5rem" />
          </Navbar.Brand>
        </div>

        {/* Center: Navigation Links */}
        <Nav className="mx-auto d-flex gap-4">
          <Link to="/dashboard" className="nav-link text-[#0F172A] fw-semibold">
            Dashboard
          </Link>
          <Link to="/profile" className="nav-link text-[#0F172A] fw-semibold">
            Profile
          </Link>
        </Nav>

        {/* Right side - empty or future use */}
        <div>
          {/* User Icon + Dropdown */}
          {/* Right: User Icon + Dropdown */}
            <Dropdown align="end">
              <Dropdown.Toggle
                variant="light"
                id="dropdown-user"
                className="d-flex align-items-center gap-2 border-0 bg-transparent text-[#0F172A]"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-user-icon lucide-user"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
                <span className="fw-semibold">{username}</span>
              </Dropdown.Toggle>

              <Dropdown.Menu>
                <Dropdown.ItemText className="text-muted">Role: {role}</Dropdown.ItemText>
                <Dropdown.Divider />
                <Dropdown.Item onClick={handleLogout} className="text-danger fw-semibold">
                  Logout
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
        </div>
      </Container>
    </Navbar>
  );
};

export default CustomNavbar;

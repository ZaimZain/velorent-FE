import { Nav, Dropdown } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { logoutUser } from "../utils/Auth";
import VelorentLogo from "./VelorentLogo";
import { useUserDetails } from "../hooks/useUserDetails";

const NavSidebar = () => {
  const navigate = useNavigate();
  const { username, role } = useUserDetails();

  const handleLogout = () => {
    logoutUser(navigate);
  };

  return (
    <div
      className="d-flex flex-column justify-content-between p-3 bg-white shadow-sm"
      style={{ width: "250px", height: "100vh", position: "fixed", top: 0, left: 0 }}
    >
      {/* Top logo */}
      <div className="p-3">
        <div className="text-center mb-4">
          {/* Placeholder for photo */}
          <div
            className="bg-light border rounded mb-2 mx-auto"
            style={{ width: "100%", height: "80px" }}
          ></div>
          <VelorentLogo fontSize="1.5rem" />
        </div>


        <Nav className="flex-column gap-2">
          <Nav.Link as={Link} to="/dashboard" className="fw-semibold text-dark">
            <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e3e3e3"><path d="M520-600v-240h320v240H520ZM120-440v-400h320v400H120Zm400 320v-400h320v400H520Zm-400 0v-240h320v240H120Zm80-400h160v-240H200v240Zm400 320h160v-240H600v240Zm0-480h160v-80H600v80ZM200-200h160v-80H200v80Zm160-320Zm240-160Zm0 240ZM360-280Z"/></svg>
            Dashboard
          </Nav.Link>
          <Nav.Link as={Link} to="/car" className="fw-semibold text-dark">
            Car Fleet
          </Nav.Link>
          <Nav.Link as={Link} to="/rental" className="fw-semibold text-dark">
            Rental Status
          </Nav.Link>
          <Nav.Link as={Link} to="/customer" className="fw-semibold text-dark">
            Customers
          </Nav.Link>
          <Nav.Link as={Link} to="/calendar" className="fw-semibold text-dark">
            Calendar
          </Nav.Link>
          <Nav.Link as={Link} to="/notification" className="fw-semibold text-dark">
            Notifications
          </Nav.Link>
        </Nav>
      </div>

      <div>
        <Dropdown align="end">
          <Dropdown.Toggle
            variant="light"
            className="d-flex align-items-center gap-2 border-0 bg-transparent text-dark"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" stroke="currentColor" fill="none" strokeWidth="2" viewBox="0 0 24 24">
              <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/>
              <circle cx="12" cy="7" r="4"/>
            </svg>
            <span>{username}</span>
          </Dropdown.Toggle>

          <Dropdown.Menu>
            <Dropdown.ItemText className="text-muted">Role: {role}</Dropdown.ItemText>
            <Dropdown.Divider />
            <Dropdown.Item className="text-danger fw-semibold">

              View Marketplace
            </Dropdown.Item>
            <Dropdown.Divider />
            <Dropdown.Item onClick={handleLogout} className="text-danger fw-semibold">
              Logout
            </Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      </div>
    </div>
  );
};

export default NavSidebar;
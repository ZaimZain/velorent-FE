import { Nav, Dropdown } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { logoutUser } from "../utils/Auth";
import VelorentLogo from "./VelorentLogo";
import { useUserDetails } from "../hooks/useUserDetails";

const Sidebar = () => {
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
      <div>
        <div className="mb-4">
          <VelorentLogo fontSize="1.5rem" />
        </div>

        <Nav className="flex-column gap-2">
          <Nav.Link as={Link} to="/dashboard" className="fw-semibold text-dark">
            Dashboard
          </Nav.Link>

          <Nav.Item className="fw-semibold text-dark">Car</Nav.Item>
          <Nav className="flex-column ps-3">
            <Nav.Link as={Link} to="/cars">Manage Cars</Nav.Link>
            <Nav.Link as={Link} to="/cars/add">Add New Car</Nav.Link>
          </Nav>

          <Nav.Link as={Link} to="/profile" className="fw-semibold text-dark">
            Profile
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
            <Dropdown.Item onClick={handleLogout} className="text-danger fw-semibold">
              Logout
            </Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      </div>
    </div>
  );
};

export default Sidebar;

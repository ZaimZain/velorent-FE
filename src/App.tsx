import { Routes, Route } from "react-router-dom";
import ProtectedRoute from "./utils/ProtectedRoute";
import Login from "./pages/Login";
import DashboardPage from "./pages/Dashboard";
import CarFleetPage from "./pages/CarFleet";
import RentalStatusPage from "./pages/RentalStatus";
import CustomerPage from "./pages/Customer";
import CalendarPage from "./pages/Calendar";
import NotificationPage from "./pages/Notification";

export default function App () {
  return <>
    <div style={{ backgroundColor: "#F1F5F9", minHeight: "100vh", paddingTop: "2rem", paddingBottom: "2rem" }}>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/dashboard" element={
          <ProtectedRoute>
            <DashboardPage />
          </ProtectedRoute>
        } />
        <Route path="/car" element={
          <ProtectedRoute>
            <CarFleetPage />
          </ProtectedRoute>
        } />
        <Route path="/rental" element={
          <ProtectedRoute>
            <RentalStatusPage />
          </ProtectedRoute>
        } />
        <Route path="/customer" element={
          <ProtectedRoute>
            <CustomerPage />
          </ProtectedRoute>
        } />
        <Route path="/calendar" element={
          <ProtectedRoute>
            <CalendarPage />
          </ProtectedRoute>
        } />
        <Route path="/notification" element={
          <ProtectedRoute>
            <NotificationPage />
          </ProtectedRoute>
        } />
      </Routes>
    </div>
  </>
};


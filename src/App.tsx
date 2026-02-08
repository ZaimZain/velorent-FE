import { Routes, Route } from "react-router-dom";
import ProtectedRoute from "./utils/ProtectedRoute";
import Login from "./pages/Login";
import DashboardPage from "./pages/Dashboard";
import CarFleetPage from "./pages/CarFleetPage";
import RentalStatusPage from "./pages/RentalStatusPage";
import CustomerPage from "./pages/CustomerPage";
import CalendarPage from "./pages/CalendarPage";
import NotificationPage from "./pages/NotificationPage";

export default function App () {
  return <>
    <div className="min-h-screen bg-slate-100">
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


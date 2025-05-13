import React from "react";
import { Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import DashboardPage from "./pages/Dashboard";
import CarListPage from "./pages/Cars/CarListPage";
import AddCarPage from "./pages/Cars/AddCarPage";
import Profile from "./pages/Profile";
import ProtectedRoute from "./utils/ProtectedRoute";

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
        <Route path="/cars" element={
          <ProtectedRoute>
            <CarListPage />
          </ProtectedRoute>
        } />
        <Route path="/cars/add" element={
          <ProtectedRoute>
            <AddCarPage />
          </ProtectedRoute>
        } />
        <Route path="/profile" element={
          <ProtectedRoute>
            <Profile />
          </ProtectedRoute>
        } />
      </Routes>
    </div>
  </>
};


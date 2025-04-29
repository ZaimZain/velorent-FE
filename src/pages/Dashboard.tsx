import React from 'react';
import CustomNavbar from '../components/Navbar';

const Dashboard = () => {
  return (
    <div>
      <CustomNavbar />
      <div className="container mt-5">
        <h2>Dashboard</h2>
        <p>Here you can manage your dashboard items.</p>
      </div>
    </div>
  );
};

export default Dashboard;

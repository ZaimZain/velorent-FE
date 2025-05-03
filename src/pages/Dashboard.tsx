import React from 'react';
import CustomNavbar from '../components/Navbar';

export default function Dashboard () {
  return <>
    <div>
      <CustomNavbar />
      <div className="container mt-5">
        <h2>Welcome to VeloRent CMS Dashboard!</h2>
        <p>This is your dashboard where you can manage car rentals, users, etc.</p>
      </div>
    </div>
  </>
};


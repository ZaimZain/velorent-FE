import React from 'react';
import CustomNavbar from '../components/Navbar';
import PageCard from "../components/ui/PageCard";

export default function Dashboard () {
  return <>
    <CustomNavbar />
    <PageCard title="Add New Car">
        <div className="container mt-5">
            <h2>Welcome to VeloRent CMS Dashboard!</h2>
            <p>This is your dashboard where you can manage car rentals, users, etc.</p>
        </div>
    </PageCard>
  </>
};


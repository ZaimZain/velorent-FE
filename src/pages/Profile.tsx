import React from 'react';
import CustomNavbar from '../components/Navbar';

const Profile = () => {
  return <>
    <div>
      <CustomNavbar />
      <div className="container mt-5">
        <h2>Profile</h2>
        <p>This is your profile page. Here you can edit your information.</p>
      </div>
    </div>
  </>
};

export default Profile;

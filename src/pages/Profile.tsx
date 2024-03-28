import React from 'react';
import Navbar from '../components/nav/Navbar';


const Profile: React.FC = () => {
  return (
    <>
    <Navbar/>
    <div className="container mx-auto">
      <img src="" alt="Profile Avatar" className="avatar" />
      <h2 className="username">{}</h2>
    </div>
    </>
  );
}

export default Profile;

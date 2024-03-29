import React from 'react';
import Navbar from '../components/nav/Navbar';
import { useAuth } from '../hooks/useAuth';

const Profile: React.FC = () => {
  const { avatar, username, role } = useAuth();

  return (
    <>
      <Navbar />
      <div className="container mx-auto px-4 py-8 flex flex-col items-center">
        <img src={`http://localhost:3300/uploads/avatars/${avatar}`} alt="Profile Avatar" className="w-40 h-40 rounded-full mb-4" />
        <div className="bg-white shadow-lg rounded-lg overflow-hidden">
          <div className="px-6 py-4">
            <div className="font-bold text-xl mb-2">Profile Information</div>
            <table className="table-auto border-collapse border border-gray-100">
              <tbody>
                <tr className='border-b border-gray-100'>
                  <td className="font-semibold py-2 px-4 border-r border-gray-100">Username</td>
                  <td className="py-2 px-4">{username}</td>
                </tr>
                <tr className='border-b border-gray-100'>
                  <td className="font-semibold py-2 px-4 border-r border-gray-100">Role</td>
                  <td className="py-2 px-4">{role}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
}

export default Profile;

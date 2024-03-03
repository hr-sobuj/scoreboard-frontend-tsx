import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Logo from './../../assets/images/logo.png'
import { useDispatch } from 'react-redux';
import { logout } from '../../store/reducer/authReducer';
import { UserDataType } from '../../App';

const Navbar: React.FC = () => {

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleLogout: Function = () => {
    dispatch(logout());
    navigate('/login');
  }

  const userDataString = localStorage.getItem('userData');
  const [userData, setUserData] = useState<UserDataType | null>(null);

  useEffect(() => {
    setUserData(userDataString ? JSON.parse(userDataString) : null);
  }, [userDataString]);

  return (
    <nav className="bg-gray-800 p-4">
      <div className="container mx-auto flex justify-between items-center">
        <div className="flex items-center">
          <h1>
            <Link to='/'><img src={Logo} alt="Logo" role='img' className="h-8 mr-4" /></Link>
          </h1>
        </div>

        <div className="flex items-center">
          <Link to="/" className="text-white mr-4 hover:text-gray-300">
            Home
          </Link>

          {userData ? (
            <>
              <Link to="/dashboard" className="text-white mr-4 hover:text-gray-300">
                Dashboard
              </Link>
              <button onClick={() => handleLogout()} className="text-white mr-4 hover:text-gray-300">
                Logout
              </button>
            </>
          ) : (<Link to="/login" className="text-white mr-4 hover:text-gray-300">
            Login
          </Link>)}

        </div>
      </div>
    </nav>
  );
};

export default Navbar;

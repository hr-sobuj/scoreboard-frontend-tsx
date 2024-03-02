import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Logo from './../../assets/images/logo.png'
import { useDispatch } from 'react-redux';
import { logout } from '../../store/reducer/authReducer';

const Navbar: React.FC = () => {
  const dispatch=useDispatch();
  const navigate=useNavigate();
  const handleLogout:Function=()=>{
    dispatch(logout());
    navigate('/login');
  }

  return (
    <nav className="bg-gray-800 p-4">
      <div className="container mx-auto flex justify-between items-center">
        <div className="flex items-center">
          <h1>
            <Link to='/'><img src={Logo} alt="Logo" role='img' className="h-8 mr-4" /></Link>
          </h1>
        </div>

        <div className="flex items-center">
          <a href="#" className="text-white mr-4 hover:text-gray-300">
            Home
          </a>
          <a href="#" className="text-white mr-4 hover:text-gray-300">
            About
          </a>
          <a href="#" className="text-white mr-4 hover:text-gray-300">
            Contact
          </a>
          <button onClick={()=>handleLogout()} className="text-white mr-4 hover:text-gray-300">
            Logout
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

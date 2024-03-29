import { Disclosure, Menu, Transition } from '@headlessui/react';
import { Fragment } from 'react';
import { IoIosMenu } from "react-icons/io";
import { LiaTimesSolid } from "react-icons/lia";
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { logout } from '../../store/features/authSlice';

const Navbar: React.FC = () => {
  const dispatch = useDispatch();
  const currentUser = useAuth();

  const handleLogout: Function = () => {
    dispatch(logout());
  };

  return (
    <Disclosure as="nav" className="bg-gray-800">
      {({ open }) => (
        <>
          <div className="container mx-auto px-4">
            <div className="flex justify-between items-center h-16">
              <div className="flex items-center">
                <h1>
                  <Link to='/'>
                    <img src={"https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=500"} alt="Logo" role='img' className="h-8 mr-4" />
                  </Link>
                </h1>
                <div className="hidden sm:block sm:ml-6">
                  <div className="flex space-x-4">
                    <Link to="/" className="text-white hover:text-gray-300">
                      Home
                    </Link>
                    {currentUser.username ? (
                      <Link to="/dashboard" className="text-white hover:text-gray-300">
                        Dashboard
                      </Link>
                    ) : (
                      <>
                        <Link to="/login" className="text-white hover:text-gray-300">
                          Login
                        </Link>
                        <Link to="/registration" className="text-white hover:text-gray-300">
                          Registration
                        </Link>
                      </>
                    )}
                  </div>
                </div>
              </div>
              <div className="hidden sm:block">
                <div className="flex items-center">

                  {currentUser.username && (
                    <Menu as="div" className="ml-3 relative">
                      <div>
                        <Menu.Button className="relative flex rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                          <img
                            className="h-8 w-8 rounded-full"
                            src={`http://localhost:3300/uploads/avatars/${currentUser?.avatar}`}
                            alt="Avatar"
                          />
                        </Menu.Button>
                      </div>
                      <Transition
                        as={Fragment}
                        enter="transition ease-out duration-100"
                        enterFrom="transform opacity-0 scale-95"
                        enterTo="transform opacity-100 scale-100"
                        leave="transition ease-in duration-75"
                        leaveFrom="transform opacity-100 scale-100"
                        leaveTo="transform opacity-0 scale-95"
                      >
                        <Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                          <Menu.Item>
                            <Link to="/profile" className="block px-4 py-2 text-sm text-gray-700">
                              Profile
                            </Link>
                          </Menu.Item>
                          <Menu.Item>
                            <Link to="/setting" className="block px-4 py-2 text-sm text-gray-700">
                              Settings
                            </Link>
                          </Menu.Item>
                          <Menu.Item>
                            <button onClick={() => handleLogout()} className="block w-full px-4 py-2 text-sm text-left text-gray-700">
                              Sign out
                            </button>
                          </Menu.Item>
                        </Menu.Items>
                      </Transition>
                    </Menu>
                  )}
                </div>
              </div>
              <div className="-mr-2 flex sm:hidden">
                {/* Mobile menu button*/}
                <Disclosure.Button className="inline-flex items-center justify-center p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                  <span className="sr-only">Open main menu</span>
                  {open ? (
                    <LiaTimesSolid className="block h-6 w-6" aria-hidden="true" />
                  ) : (
                    <IoIosMenu className="block h-6 w-6" aria-hidden="true" />

                  )}
                </Disclosure.Button>
              </div>
            </div>
          </div>
          {/* Mobile menu */}
          <Disclosure.Panel className="sm:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1">
              <Link to="/" className="text-white block hover:text-gray-300">
                Home
              </Link>
              {currentUser.username ? (
                <>
                  <Link to="/dashboard" className="text-white block hover:text-gray-300">
                    Dashboard
                  </Link>
                  <button onClick={() => handleLogout()} className="text-white block hover:text-gray-300">
                    Logout
                  </button>
                </>
              ) : (
                <Link to="/login" className="text-white block hover:text-gray-300">
                  Login
                </Link>
              )}
            </div>
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  );
};

export default Navbar;

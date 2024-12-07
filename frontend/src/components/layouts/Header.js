import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Search from './Search';
import { useDispatch, useSelector } from 'react-redux';
import { DropdownButton, Dropdown, Image } from 'react-bootstrap';
import { FaShoppingCart } from 'react-icons/fa';  
import { logout } from '../../actions/userActions';

export default function Header() {
  const { isAuthenticated, user } = useSelector(state => state.authState);
  const { items: cartItems } = useSelector(state => state.cartState);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const logoutHandler = () => {
    dispatch(logout);
  };

  return (
    <nav className="bg-purple-400 shadow-md w-full mb-1 sticky top-0 z-50">
      <div className="max-w-screen-xl mx-auto flex items-center justify-between px-6 py-4">
        {/* Logo Section */}
        <div className="flex items-center space-x-4">
          <Link to="/" className="flex items-center">
            <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQJ7xmhO-xdsjTVmXhR977p1Hh6TWUclaMFdA&s" alt="J Logo" className="w-20 mix-blend-multiply" />
          </Link>
        </div>

        {/* Search Section */}
        <div className="hidden md:flex flex-grow justify-center mx-4">
          <Search />
        </div>

        {/* Auth and Cart Section */}
        <div className="flex items-center space-x-6">
          {isAuthenticated ? (
            <Dropdown className="relative">
              <Dropdown.Toggle
                variant="default"
                id="dropdown-basic"
                className="flex items-center space-x-2 bg-gray-100 py-2 px-4 rounded-lg text-gray-700 hover:bg-primary hover:text-blue-600 transition duration-300"
              >
                <figure className="avatar avatar-nav">
                  <Image
                    width="45px"
                    src={user.avatar ?? './images/default_avatar.png'}
                    className="rounded-full"
                  />
                </figure>
                <span>{user.name}</span>
              </Dropdown.Toggle>
              <Dropdown.Menu className="absolute right-0 mt-2 bg-white shadow-lg rounded-md w-48">
                {user.role === 'admin' && (
                  <Dropdown.Item
                    onClick={() => {
                      navigate('admin/dashboard');
                    }}
                    className="text-gray-700 hover:bg-primary "
                  >
                    Dashboard
                  </Dropdown.Item>
                )}
                <Dropdown.Item
                  onClick={() => {
                    navigate('/myprofile');
                  }}
                  className="text-gray-700 hover:bg-primary "
                >
                  Profile
                </Dropdown.Item>
                <Dropdown.Item
                  onClick={() => {
                    navigate('/orders');
                  }}
                  className="text-gray-700 hover:bg-primary "
                >
                  Orders
                </Dropdown.Item>
                <Dropdown.Item
                  onClick={logoutHandler}
                  className="text-red-500 hover:bg-red-100 hover:text-red-700"
                >
                  Logout
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          ) : (
            <Link
              to="/login"
              className="btn text-white bg-primary hover:bg-primary-dark py-2 px-4 rounded-lg transition duration-300"
            >
              Login
            </Link>
          )}

          {/* Cart Section with React Icons */}
          <Link
            to="/cart"
            className="relative text-gray-700 hover:text-primary transition duration-300"
          >
            <FaShoppingCart className="text-4xl" /> {/* Increased cart icon size */}
            <span className="absolute bottom-5 left-5 text-xs bg-red-500 text-white rounded-full px-2 py-1">
              {cartItems.length}
            </span>
          </Link>
        </div>
      </div>
    </nav>
  );
}

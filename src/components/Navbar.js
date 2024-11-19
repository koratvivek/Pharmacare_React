import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { logout } from '../api';
import { useNavigate } from 'react-router-dom';

function Navbar({ token, clearToken }) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logout(token);
      localStorage.removeItem('authToken');
      clearToken();
      navigate('/login');
      console.log('Logged out successfully');
    } catch (error) {
      console.error('Error during logout:', error);
    }
  };

  return (
    <nav className="bg-gradient-to-r from-green-700 to-green-600 p-4 shadow-lg">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/">
          <h1 className="text-4xl font-bold tracking-tight text-white">
            <span className="text-green-200">Pharma</span>
            <span className="text-white">care</span>
          </h1>
        </Link>

        <div className="flex items-center">
          <button
            className="lg:hidden flex justify-center items-center w-8 h-8 text-white"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>

          {isMobileMenuOpen && (
            <div className="absolute top-14 left-0 w-full right-0 bg-gradient-to-r from-green-700 to-green-600 flex flex-col justify-center items-center p-4 transition-transform transform duration-300 ease-in-out">
              {token ? (
                <>
                  <Link to="/search_doctors" className="text-white hover:text-gray-400 py-2">Find a Doctor</Link>
                  <Link to="/products" className="text-white hover:text-gray-400 py-2">Products</Link>
                  <Link to="/packages" className="text-white hover:text-gray-400 py-2">Health care Packages</Link>
                  <Link to="/cart" className="text-white hover:text-gray-400 py-2">Cart</Link>
                  <Link to="/profile" className="text-white hover:text-gray-400 py-2">Profile</Link>
                  <button onClick={handleLogout} className="text-white hover:text-gray-400 py-2">Logout</button>
                </>
              ) : (
                <>
                  <Link to="/signup" className="text-white hover:text-gray-400 py-2">Sign Up</Link>
                  <Link to="/login" className="text-white hover:text-gray-400 py-2">Login</Link>
                </>
              )}
            </div>
          )}

          <div className="hidden lg:flex justify-between items-center gap-7">
            {token ? (
              <>
                <Link to="/products" className="text-white hover:text-gray-400">Products</Link>
                <Link to="/packages" className="text-white hover:text-gray-400">Health care Packages</Link>
                <Link to="/search_doctors" className="text-white hover:text-gray-400">Find a Doctor</Link>
                <Link to="/cart" className="text-white hover:text-gray-400">Cart</Link>
                <Link to="/profile" className="text-white hover:text-gray-400">Profile</Link>
                <Link to="/contact" className="text-white hover:text-gray-400">Contact Us</Link>
                <button onClick={handleLogout} className="text-white hover:text-gray-400">Logout</button>
              </>
            ) : (
              <>
                <Link to="/signup" className="text-white hover:text-gray-400">Sign Up</Link>
                <Link to="/login" className="text-white hover:text-gray-400">Login</Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;

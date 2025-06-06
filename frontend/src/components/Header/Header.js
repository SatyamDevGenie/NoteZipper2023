import React, { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../actions/userActions";

const Header = ({ setSearch }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { userInfo } = useSelector((state) => state.userLogin);

  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const dropdownRef = useRef(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target)
      ) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const logoutHandler = () => {
    dispatch(logout());
    navigate("/");
    setDropdownOpen(false);
    setMobileMenuOpen(false);
  };

  return (
    <nav className="bg-blue-700 text-white fixed top-0 left-0 w-full shadow-md z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link
            to="/"
            className="text-2xl font-extrabold tracking-tight hover:text-blue-300 transition-colors duration-300"
            aria-label="NoteZipper Home"
          >
            NoteZipper
          </Link>

          {/* Desktop Search */}
          <div className="hidden sm:flex flex-grow max-w-md mx-6">
            <input
              type="search"
              placeholder="Search notes..."
              className="w-full px-4 py-2 rounded-md border border-gray-300 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400 transition"
              onChange={(e) => setSearch(e.target.value)}
              aria-label="Search notes"
            />
          </div>

          {/* Desktop Navigation */}
          <div className="hidden sm:flex items-center space-x-8 font-semibold">
            {userInfo && (
              <>
                <Link
                  to="/mynotes"
                  className="hover:text-blue-300 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-blue-400 rounded"
                >
                  My Notes
                </Link>

                {/* Profile Dropdown */}
                <div className="relative" ref={dropdownRef}>
                  <button
                    onClick={() => setDropdownOpen((prev) => !prev)}
                    className="flex items-center gap-1 hover:text-blue-300 focus:outline-none focus:ring-2 focus:ring-blue-400 rounded"
                    aria-haspopup="true"
                    aria-expanded={dropdownOpen}
                    aria-label="User menu"
                  >
                    <span>{userInfo.name}</span>
                    <svg
                      className={`w-5 h-5 transition-transform duration-300 ${
                        dropdownOpen ? "rotate-180" : "rotate-0"
                      }`}
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </button>

                  {dropdownOpen && (
                    <div
                      className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-2 ring-1 ring-black ring-opacity-5 focus:outline-none z-50"
                      role="menu"
                    >
                      <Link
                        to="/profile"
                        className="block px-4 py-2 text-gray-800 hover:bg-blue-100 hover:text-blue-700 font-medium"
                        role="menuitem"
                        onClick={() => setDropdownOpen(false)}
                      >
                        My Profile
                      </Link>
                      <hr className="border-gray-200 my-1" />
                      <button
                        onClick={logoutHandler}
                        className="block w-full text-left px-4 py-2 text-gray-800 hover:bg-blue-100 hover:text-blue-700 font-medium"
                        role="menuitem"
                      >
                        Logout
                      </button>
                    </div>
                  )}
                </div>
              </>
            )}
          </div>

          {/* Mobile Hamburger */}
          <button
            onClick={() => setMobileMenuOpen((prev) => !prev)}
            className="sm:hidden inline-flex items-center justify-center p-2 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
            aria-controls="mobile-menu"
            aria-expanded={mobileMenuOpen}
            aria-label="Toggle menu"
          >
            <svg
              className="h-6 w-6 text-white"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              {mobileMenuOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && userInfo && (
        <div
          id="mobile-menu"
          className="sm:hidden bg-blue-700 px-4 pt-4 pb-6 space-y-4 border-t border-blue-600"
        >
          <input
            type="search"
            placeholder="Search notes..."
            className="w-full px-4 py-2 rounded-md border border-gray-300 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400 transition"
            onChange={(e) => setSearch(e.target.value)}
            aria-label="Search notes"
          />

          <Link
            to="/mynotes"
            className="block text-white font-semibold hover:text-blue-300 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-blue-400 rounded"
            onClick={() => setMobileMenuOpen(false)}
          >
            My Notes
          </Link>

          <Link
            to="/profile"
            className="block text-white font-semibold hover:text-blue-300 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-blue-400 rounded"
            onClick={() => setMobileMenuOpen(false)}
          >
            My Profile
          </Link>

          <button
            onClick={logoutHandler}
            className="w-full text-left text-white font-semibold hover:text-blue-300 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-blue-400 rounded"
          >
            Logout
          </button>
        </div>
      )}
    </nav>
  );
};

export default Header;

import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../actions/userActions";

const Header = ({ setSearch }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { userInfo } = useSelector((state) => state.userLogin);

  const [dropdownOpen, setDropdownOpen] = useState(false);

  const logoutHandler = () => {
    dispatch(logout());
    navigate("/");
  };

  return (
    <nav className="bg-blue-600 text-white fixed top-0 left-0 w-full shadow-md z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          
          {/* Logo */}
          <Link to="/" className="text-2xl tracking-wide font-extrabold">
            NoteZipper
          </Link>

          {/* Search Bar */}
          <div className="hidden sm:block flex-grow max-w-md">
            <input
              type="text"
              placeholder="Search..."
              className="w-full px-4 py-2 text-gray-900 rounded-md border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:outline-none"
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          {/* Navigation */}
          <div className="flex items-center space-x-4">
            {userInfo ? (
              <>
                <Link
                  to="/mynotes"
                  className="hidden sm:inline-block text-white hover:text-gray-200 transition font-bold"
                >
                  My Notes
                </Link>

                {/* Profile Dropdown */}
                <div className="relative">
                  <button
                    onClick={() => setDropdownOpen(!dropdownOpen)}
                    className="flex items-center gap-2 text-white hover:text-gray-200 focus:outline-none  font-bold"
                  >
                    <span>{userInfo?.name}</span>
                    <svg
                      className="w-4 h-4 transition-transform transform"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </button>

                  {dropdownOpen && (
                    <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-2 z-50">
                      <Link
                        to="/profile"
                        className="block px-4 py-2 text-gray-800 hover:text-gray-800 font-semibold"
                      >
                        My Profile
                      </Link>
                      <hr className="border-gray-200" />
                      <button
                        onClick={logoutHandler}
                        className="block w-full text-left px-4 py-2 text-gray-800 hover:text-gray-800 font-semibold"
                      >
                        Logout
                      </button>
                    </div>
                  )}
                </div>
              </>
            ) : (
              <Link
                to="/login"
                className=" text-black font-bold px-4 py-2 rounded-md"
              >
                Experience Us
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Header;









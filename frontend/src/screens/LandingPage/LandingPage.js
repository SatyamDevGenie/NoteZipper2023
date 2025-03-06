import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./LandingPage.css";

const LandingPage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const userInfo = localStorage.getItem("userInfo");

    if (userInfo) {
      navigate("/mynotes");
    }
  }, [navigate]);

  return (
    <div className="main flex flex-col items-center justify-center h-screen bg-gray-100">
      <div className="container mx-auto px-4">
        <div className="intro-text text-center">
          <div>
            <h1 className="title text-3xl font-normal mb-4">
              Welcome to Note Zipper
            </h1>
            <p className="subtitle text-xl mb-8">
              One safe place for all your notes.
            </p>
          </div>
          <div className="buttonContainer flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4">
            <Link to="/login">
              <button className="landingbutton px-8 py-3 text-lg bg-blue-600 text-white rounded hover:bg-blue-700">
                Login
              </button>
            </Link>
            <Link to="/register">
              <button className="landingbutton text-black px-8 py-3 text-lg border border-blue-600 text-blue-600 rounded hover:bg-blue-600 hover:text-white">
                Register
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;

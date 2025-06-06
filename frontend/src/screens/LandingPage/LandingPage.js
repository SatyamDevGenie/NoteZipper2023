import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const LandingPage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const userInfo = localStorage.getItem("userInfo");
    if (userInfo) {
      navigate("/mynotes");
    }
  }, [navigate]);

  return (
    <motion.div
      className="relative flex flex-col items-center justify-center min-h-screen px-6 overflow-hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      {/* 🔵 Main Content */}
      <div className="w-full max-w-3xl text-center z-10">
        <motion.h1
          className="text-3xl sm:text-6xl font-semibold text-blue-700 mb-4"
          initial={{ y: -20 }}
          animate={{ y: 0 }}
          transition={{ delay: 0.2 }}
        >
        Keep your Notes Safe
        </motion.h1>

        <p className="text-lg sm:text-xl text-gray-600 mb-8">
          Secure your thoughts and access them anywhere, anytime.
        </p>

        <div className="flex flex-row sm:flex-row justify-center items-center gap-4">
          <Link to="/login" className="w-full sm:w-auto">
            <button className="w-full sm:w-auto px-12 py-3 bg-blue-600 text-white text-lg font-medium rounded-lg hover:bg-blue-700 shadow-md transition">
              Sign In
            </button>
          </Link>
          <Link to="/register" className="w-full sm:w-auto">
            <button className="w-full sm:w-auto px-12 py-3 border border-blue-600 text-blue-600 text-lg font-medium rounded-lg hover:bg-blue-600 hover:text-white shadow-md transition">
              Sign Up
            </button>
          </Link>
        </div>
      </div>
    </motion.div>
  );
};

export default LandingPage;

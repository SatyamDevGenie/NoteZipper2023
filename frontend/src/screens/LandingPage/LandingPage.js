import React, { useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { motion } from "framer-motion";

const LandingPage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const userInfo = localStorage.getItem("userInfo");
    if (userInfo) {
      navigate("/mynotes");
    }
  }, [navigate]);

  const features = [
    {
      title: "Secure & Private",
      desc: "Your notes are encrypted and stored safely. Only you can access them.",
    },
    {
      title: "Cloud Sync",
      desc: "Access your notes from any device, anytime – automatically synced.",
    },
    {
      title: "Lightning Fast",
      desc: "Built with performance in mind to keep your productivity flowing.",
    },
    {
      title: "Simple & Elegant",
      desc: "A clean, distraction-free writing space with zero clutter.",
    },
  ];

  return (
    <motion.div
      className="min-h-screen bg-gradient-to-br from-blue-100 to-white px-4 sm:px-6 lg:px-8 py-12 mt-16"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      {/* 🌟 Hero Section */}
      <div className="flex flex-col items-center text-center mb-16">
        <motion.h1
          className="text-3xl sm:text-5xl md:text-6xl font-bold text-blue-800 mb-4"
          initial={{ y: -40, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8 }}
        >
          Welcome to <span className="text-blue-600">NoteZipper</span>
        </motion.h1>

        <motion.p
          className="text-base sm:text-lg md:text-xl text-gray-700 mb-4 max-w-3xl"
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          Capture your ideas, organize your mind, and access your notes from anywhere.
        </motion.p>

        <motion.p
          className="text-blue-900 font-semibold text-lg sm:text-xl mt-2 mb-6"
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.6, type: "spring", stiffness: 100 }}
        >
          ✨ Simplify your notes. Supercharge your mind.
        </motion.p>

        {/* 🎯 CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
        >
          <Link to="/login">
            <button className="w-full sm:w-auto px-8 py-3 bg-blue-600 text-white text-base sm:text-lg font-medium rounded-full shadow-md hover:bg-blue-700 transition">
              Get Started
            </button>
          </Link>
        </motion.div>
      </div>

      {/* 🚀 Features Section */}
      <motion.div
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 text-center max-w-6xl mx-auto"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ delay: 0.4, duration: 1 }}
        viewport={{ once: true }}
      >
        {features.map((feature, index) => (
          <motion.div
            key={index}
            className="bg-white rounded-xl shadow-md p-6 hover:shadow-xl transition h-full flex flex-col justify-between"
            whileHover={{ scale: 1.03 }}
          >
            <h3 className="text-lg sm:text-xl font-semibold text-blue-700 mb-2">{feature.title}</h3>
            <p className="text-gray-600 text-sm sm:text-base">{feature.desc}</p>
          </motion.div>
        ))}
      </motion.div>

      {/* 🔽 Footer Slogan */}
      <motion.div
        className="mt-16 text-center text-gray-500 text-sm px-2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
      >
        © {new Date().getFullYear()} NoteZipper — Built with ❤️ to keep your thoughts secure.
      </motion.div>
    </motion.div>
  );
};

export default LandingPage;

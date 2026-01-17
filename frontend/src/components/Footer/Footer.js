import React from "react";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-8 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center">
          {/* Left Side: Branding */}
          <div className="mb-4 md:mb-0 text-center md:text-left">
            <h5 className="text-xl font-bold mb-2 bg-gradient-to-r from-blue-400 to-indigo-400 bg-clip-text text-transparent">
              NoteZipper
            </h5>
            <p className="text-gray-400 text-sm">
              Secure your thoughts, organize your mind.
            </p>
          </div>

          {/* Right Side: Copyright */}
          <div className="text-center md:text-right">
            <p className="text-gray-400 text-sm">
              &copy; {new Date().getFullYear()} NoteZipper — Created by{" "}
              <span className="font-semibold text-white">Satyam Sawant</span>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

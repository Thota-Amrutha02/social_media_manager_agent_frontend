import React from "react";
import { Menu, Bell, Settings, User } from "lucide-react";

const Header = ({ toggleSidebar }) => {
  return (
    <header className="border-b border-gray-300 bg-white/70 backdrop-blur-md sticky top-0 z-50">
      <div className="container mx-auto px-6 py-4 flex items-center justify-between">
        {/* Left Section */}
        <div className="flex items-center gap-4">
          {/* Hamburger Menu */}
          <button
            onClick={toggleSidebar}
            className="p-2 bg-white rounded-xl shadow hover:bg-gray-100 transition"
          >
            <Menu className="w-6 h-6 text-black" />
          </button>

          {/* Title */}
          <div>
            <h1 className="text-2xl font-bold bg-gradient-to-r from-purple-500 via-pink-500 to-yellow-500 bg-clip-text text-transparent">
              Social Media Manager
            </h1>
            <p className="text-sm text-gray-600">AI-Powered Content & Analytics</p>
          </div>
        </div>

        {/* Right Icons */}
        <div className="flex items-center gap-3">
          <button className="p-3 bg-white rounded-xl shadow hover:bg-gray-100 transition">
            <Bell className="w-5 h-5 text-black" />
          </button>
          <button className="p-3 bg-white rounded-xl shadow hover:bg-gray-100 transition">
            <Settings className="w-5 h-5 text-black" />
          </button>
          <button className="p-3 rounded-xl bg-gradient-to-r from-purple-500 via-pink-500 to-yellow-500 text-white shadow hover:opacity-90 transition">
            <User className="w-5 h-5" />
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
